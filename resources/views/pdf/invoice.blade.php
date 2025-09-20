?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }
        .header {
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .company-info {
            float: right;
            text-align: right;
            width: 45%;
        }
        .invoice-info {
            float: left;
            width: 45%;
        }
        .clear { clear: both; }
        .invoice-details {
            margin: 30px 0;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .invoice-table th,
        .invoice-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .invoice-table th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        .total-section {
            float: right;
            width: 300px;
            margin-top: 20px;
        }
        .total-row {
            border-top: 2px solid #007bff;
            font-weight: bold;
            font-size: 16px;
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #666;
        }
        .deposit-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            <h2>Your Company Name</h2>
            <p>123 Business Street<br>
            City, Province 1234<br>
            Phone: +27 11 123 4567<br>
            Email: billing@yourcompany.com</p>
        </div>
        
        <div class="invoice-info">
            <h1>{{ $isDeposit ? 'DEPOSIT INVOICE' : 'INVOICE' }}</h1>
            <p><strong>Invoice #:</strong> {{ $invoice->invoice_number }}</p>
            <p><strong>Date:</strong> {{ $invoice->billing_date->format('d F Y') }}</p>
            <p><strong>Due Date:</strong> {{ $invoice->due_date->format('d F Y') }}</p>
        </div>
        <div class="clear"></div>
    </div>

    <div class="invoice-details">
        <h3>Bill To:</h3>
        <p>
            <strong>{{ $invoice->customer_name }}</strong><br>
            {{ $invoice->customer_email }}<br>
            {{ $invoice->customer_phone }}<br>
            @if($invoice->customer_address)
                {{ $invoice->customer_address }}
            @endif
        </p>
    </div>

    @if($isDeposit)
        <div class="deposit-notice">
            <h4>Installation Deposit Invoice</h4>
            <p>This invoice is for your installation deposit. This amount secures your installation slot and will be credited towards your service setup.</p>
        </div>
    @endif

    <table class="invoice-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Service Type</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $invoice->description }}</td>
                <td>{{ $invoice->service_type }}</td>
                <td>R{{ number_format($invoice->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="total-section">
        <table style="width: 100%; border-collapse: collapse;">
            <tr class="total-row">
                <td style="text-align: right; padding: 10px; border-top: 2px solid #007bff;">
                    <strong>Total Amount Due: R{{ number_format($invoice->amount, 2) }}</strong>
                </td>
            </tr>
        </table>
    </div>
    <div class="clear"></div>

    @if($isDeposit)
        <div style="margin-top: 40px;">
            <h4>Payment Terms:</h4>
            <p>• Deposit payment is due within 7 days of invoice date</p>
            <p>• Installation will be scheduled upon receipt of deposit</p>
            <p>• Deposit is non-refundable once installation is completed</p>
        </div>
    @else
        <div style="margin-top: 40px;">
            <h4>Payment Terms:</h4>
            <p>• Payment is due within 30 days of invoice date</p>
            <p>• Late payments may incur additional charges</p>
            <p>• Service may be suspended for overdue accounts</p>
        </div>
    @endif

    <div style="margin-top: 40px;">
        <h4>Payment Methods:</h4>
        <p>
            <strong>Bank Transfer:</strong><br>
            Account Name: Your Company Name<br>
            Bank: Your Bank<br>
            Account Number: 123456789<br>
            Branch Code: 123456<br>
            Reference: {{ $invoice->invoice_number }}
        </p>
    </div>

    <div class="footer">
        <p>Thank you for your business! | Questions? Contact us at billing@yourcompany.com | {{ $invoice->invoice_number }}</p>
    </div>
</body>
</html>

<?php