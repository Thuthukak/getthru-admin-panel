<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Client;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InvoiceController extends Controller
{
    /**
     * Display a listing of invoices with filtering and pagination
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Invoice::with(['client', 'items.service']);

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Client filter
        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Date range filter
        if ($request->filled('date_from')) {
            $query->where('invoice_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('invoice_date', '<=', $request->date_to);
        }

        // Search by invoice number or client name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('client', function ($clientQuery) use ($search) {
                      $clientQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Overdue filter
        if ($request->boolean('overdue_only')) {
            $query->overdue();
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        $allowedSorts = ['invoice_number', 'invoice_date', 'due_date', 'status', 'total', 'created_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $invoices = $query->paginate($perPage);

        return InvoiceResource::collection($invoices);
    }

    /**
     * Store a newly created invoice
     */
    public function store(StoreInvoiceRequest $request): JsonResponse
    {
        try {
            $invoice = Invoice::create($request->validated());

            // Add invoice items if provided
            if ($request->has('items') && is_array($request->items)) {
                foreach ($request->items as $index => $itemData) {
                    $invoice->items()->create([
                        'service_id' => $itemData['service_id'] ?? null,
                        'description' => $itemData['description'],
                        'quantity' => $itemData['quantity'] ?? 1,
                        'unit_price' => $itemData['unit_price'],
                        'sort_order' => $index,
                    ]);
                }
            }

            // Recalculate totals
            $invoice->calculateTotals();
            $invoice->save();

            return response()->json([
                'message' => 'Invoice created successfully',
                'invoice' => new InvoiceResource($invoice->load(['client', 'items.service']))
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified invoice
     */
    public function show(Invoice $invoice): JsonResponse
    {
        $invoice->load(['client', 'items.service']);
        
        return response()->json([
            'invoice' => new InvoiceResource($invoice)
        ]);
    }

    /**
     * Update the specified invoice
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice): JsonResponse
    {
        try {
            // Prevent updating paid invoices
            if ($invoice->status === 'paid' && !$request->boolean('force_update')) {
                return response()->json([
                    'message' => 'Cannot update paid invoice'
                ], 422);
            }

            // Update invoice basic info
            $invoice->update($request->validated());

            // Update items if provided
            if ($request->has('items') && is_array($request->items)) {
                // Delete existing items
                $invoice->items()->delete();
                
                // Add new items
                foreach ($request->items as $index => $itemData) {
                    $invoice->items()->create([
                        'service_id' => $itemData['service_id'] ?? null,
                        'description' => $itemData['description'],
                        'quantity' => $itemData['quantity'] ?? 1,
                        'unit_price' => $itemData['unit_price'],
                        'sort_order' => $index,
                    ]);
                }
            }

            // Recalculate totals
            $invoice->calculateTotals();
            $invoice->save();

            return response()->json([
                'message' => 'Invoice updated successfully',
                'invoice' => new InvoiceResource($invoice->load(['client', 'items.service']))
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified invoice
     */
    public function destroy(Invoice $invoice): JsonResponse
    {
        try {
            // Prevent deleting paid invoices
            if ($invoice->status === 'paid') {
                return response()->json([
                    'message' => 'Cannot delete paid invoice'
                ], 422);
            }

            $invoice->delete();

            return response()->json([
                'message' => 'Invoice deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark invoice as sent
     */
    public function markAsSent(Invoice $invoice): JsonResponse
    {
        try {
            if ($invoice->status === 'paid') {
                return response()->json([
                    'message' => 'Invoice is already paid'
                ], 422);
            }

            $invoice->markAsSent();

            return response()->json([
                'message' => 'Invoice marked as sent',
                'invoice' => new InvoiceResource($invoice->load(['client', 'items.service']))
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating invoice status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Record payment for invoice
     */
    public function recordPayment(Request $request, Invoice $invoice): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01|max:' . $invoice->balance,
            'payment_method' => 'nullable|string|max:255',
            'payment_notes' => 'nullable|string',
        ]);

        try {
            $invoice->markAsPaid(
                $request->amount,
                $request->payment_method,
                $request->payment_notes
            );

            return response()->json([
                'message' => 'Payment recorded successfully',
                'invoice' => new InvoiceResource($invoice->load(['client', 'items.service']))
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error recording payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Duplicate an existing invoice
     */
    public function duplicate(Invoice $invoice): JsonResponse
    {
        try {
            $newInvoice = $invoice->replicate();
            $newInvoice->invoice_number = null; // Will be auto-generated
            $newInvoice->status = 'draft';
            $newInvoice->sent_at = null;
            $newInvoice->paid_date = null;
            $newInvoice->paid_amount = 0;
            $newInvoice->balance = $newInvoice->total;
            $newInvoice->invoice_date = now()->toDateString();
            $newInvoice->due_date = now()->addDays(30)->toDateString();
            $newInvoice->save();

            // Duplicate items
            foreach ($invoice->items as $item) {
                $newInvoice->items()->create([
                    'service_id' => $item->service_id,
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'sort_order' => $item->sort_order,
                ]);
            }

            return response()->json([
                'message' => 'Invoice duplicated successfully',
                'invoice' => new InvoiceResource($newInvoice->load(['client', 'items.service']))
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error duplicating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get invoice statistics
     */
    public function statistics(Request $request): JsonResponse
    {
        $query = Invoice::query();

        // Date range filter for statistics
        if ($request->filled('date_from')) {
            $query->where('invoice_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('invoice_date', '<=', $request->date_to);
        }

        $stats = [
            'total_invoices' => (clone $query)->count(),
            'draft_invoices' => (clone $query)->where('status', 'draft')->count(),
            'sent_invoices' => (clone $query)->where('status', 'sent')->count(),
            'paid_invoices' => (clone $query)->where('status', 'paid')->count(),
            'overdue_invoices' => (clone $query)->overdue()->count(),
            'total_revenue' => (clone $query)->where('status', 'paid')->sum('total'),
            'pending_revenue' => (clone $query)->whereIn('status', ['sent', 'overdue'])->sum('balance'),
            'average_invoice_value' => (clone $query)->avg('total'),
        ];

        // Recent invoices
        $recentInvoices = (clone $query)
            ->with(['client'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'statistics' => $stats,
            'recent_invoices' => InvoiceResource::collection($recentInvoices)
        ]);
    }

    /**
     * Get clients for invoice creation
     */
    public function getClients(Request $request): JsonResponse
    {
        $clients = Client::select('id', 'name', 'email')
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('email', 'like', '%' . $request->search . '%');
            })
            ->orderBy('name')
            ->get();

        return response()->json($clients);
    }
}