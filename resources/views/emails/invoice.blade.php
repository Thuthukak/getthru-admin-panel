?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $isDeposit ? 'Installation Deposit' : 'Service' }} Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .invoice-details {
            background: #fff;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
        }
        .amount {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            font-size: 14px;
            color: #6c757d;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $isDeposit ? 'Installation Deposit Invoice' : 'Service Invoice' }}</h1>
        <p>Invoice #{{ $invoice->invoice_number }}</p>
    </div>

    <p>Dear {{ $customerName }},</p>

    @if($isDeposit)
        <p>Thank you for choosing our services! This invoice is for your installation deposit.</p>
        <p>Please note that this deposit secures your installation slot and will be applied towards your service setup.</p>
    @else
        <p>Thank you for your continued business! Please find your service invoice attached.</p>
    @endif

    <div class="invoice-details">
        <h3>Invoice Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td><strong>Invoice Number:</strong></td>
                <td>{{ $invoice->invoice_number }}</td>
            </tr>
            <tr>
                <td><strong>Service:</strong></td>
                <td>{{ $invoice->description }}</td>
            </tr>
            <tr>
                <td><strong>Amount:</strong></td>
                <td class="amount">R{{ number_format($invoice->amount, 2) }}</td>
            </tr>
            <tr>
                <td><strong>Due Date:</strong></td>
                <td>{{ $invoice->due_date->format('d F Y') }}</td>
            </tr>
            @if($isDeposit)
            <tr>
                <td><strong>Payment Terms:</strong></td>
                <td>Due within 7 days</td>
            </tr>
            @endif
        </table>
    </div>

    @if($isDeposit)
        <p><strong>Important:</strong> Your installation deposit of R{{ number_format($invoice->amount, 2) }} is due by {{ $invoice->due_date->format('d F Y') }}. Once paid, we will schedule your installation.</p>
    @else
        <p>Your payment of R{{ number_format($invoice->amount, 2) }} is due by {{ $invoice->due_date->format('d F Y') }}.</p>
    @endif

    <p>Payment can be made via:</p>
    <ul>
        <li>Bank Transfer</li>
        <li>EFT</li>
        <li>Online Payment</li>
    </ul>

    <p>The complete invoice details are attached as a PDF to this email.</p>

    @if($isDeposit)
        <p>If you have any questions about your deposit or installation, please don't hesitate to contact us.</p>
    @else
        <p>If you have any questions about this invoice or your service, please don't hesitate to contact us.</p>
    @endif

    <div class="footer">
        <p>Best regards,<br>
        Your Service Team</p>
        
        <p>
            <strong>Contact Information:</strong><br>
            Email: billing@yourcompany.com<br>
            Phone: +27 11 123 4567
        </p>
        
        <p><em>This is an automated email. Please do not reply directly to this message.</em></p>
    </div>
</body>
</html>

<?php