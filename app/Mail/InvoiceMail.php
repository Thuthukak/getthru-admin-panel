<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\CompanySetting;
use App\Models\Invoice;


class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $invoice;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function build()
    {
        $subject = $this->getEmailSubject();
        $companySettings = $this->getCompanySettings();
        
        // Generate PDF with company settings
        $pdf = $this->generateInvoicePDF($companySettings);
        
        return $this->subject($subject)
                   ->view('emails.invoice')
                   ->with([
                       'invoice' => $this->invoice,
                       'customerName' => $this->invoice->customer_name,
                       'isDeposit' => $this->invoice->invoice_type === 'deposit',
                       'companySettings' => $companySettings
                   ])
                   ->attachData($pdf->output(), $this->getPDFFileName(), [
                       'mime' => 'application/pdf',
                   ]);
    }

    private function getCompanySettings()
    {
        // Get all company settings as key-value array
        $settings = CompanySetting::all()->pluck('value', 'key')->toArray();
        return $settings;
    }

    private function getEmailSubject()
    {
        if ($this->invoice->invoice_type === 'deposit') {
            return 'Installation Deposit Invoice - ' . $this->invoice->invoice_number;
        }
        
        return 'Service Invoice - ' . $this->invoice->invoice_number;
    }

    private function getPDFFileName()
    {
        $type = $this->invoice->invoice_type === 'deposit' ? 'Deposit' : 'Service';
        return "Invoice_{$type}_{$this->invoice->invoice_number}.pdf";
    }

    private function generateInvoicePDF($companySettings)
    {
        return Pdf::loadView('pdf.invoice', [
            'invoice' => $this->invoice,
            'isDeposit' => $this->invoice->invoice_type === 'deposit',
            'companySettings' => $companySettings
        ]);
    }
}