<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Estimate #{{ $estimate->id }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.4;
            color: #333;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Header Section */
        .header-section {
            width: 100%;
            margin-bottom: 10px;
        }
        
        .header-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .header-table td {
            vertical-align: top;
            padding: 0;
        }
        
        .logo-cell {
            width: 50%;
            text-align: left;
        }
        
        .company-info-cell {
            width: 50%;
            text-align: right;
        }
        
        .company-logo img {
            max-width: 200px;
            height: auto;
        }
        
        .invoice-title {
            font-size: 28px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .company-address {
            font-size: 12px;
            color: #666;
            line-height: 1.3;
        }
        
        .divider {
            width: 100%;
            height: 1px;
            background-color: #000;
            margin: 15px 0;
        }
        
        /* Main Content Section */
        .main-content {
            width: 100%;
            margin-bottom: 20px;
        }
        
        .content-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .content-table td {
            vertical-align: top;
            padding: 0;
        }
        
        .bill-to-cell {
            width: 50%;
            padding-right: 20px;
        }
        
        .details-cell {
            width: 50%;
            text-align: right;
        }
        
        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        
        .customer-info {
            font-size: 13px;
            line-height: 1.4;
        }
        
        .detail-row {
            margin-bottom: 4px;
            line-height: 1.2;
            margin-bottom: 4px;
        }
        
        .detail-label {
            font-weight: bold;
            color: #000;
            display: inline-block;
            min-width: 130px;
        }
        
        .detail-value {
            color: #333;
            vertical-align: top;
            line-height: inherit;
        }
        
        .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-pending {
            background-color: #fff3cd;
            color: #856404;
        }
        
        .status-emailed {
            background-color: #d4edda;
            color: #155724;
        }
        
        .status-completed {
            background-color: #d1ecf1;
            color: #0c5460;
        }
        
        .status-cancelled {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        /* Services Table */
        .services-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
        }
        
        .services-table th {
            background-color:#2378cd;
            padding: 10px 8px;
            text-align: left;
            font-weight: bold;
            color: #ffffff;
            border: 1px solid #dee2e6;
            text-transform: uppercase;
            font-size: 11px;
        }
        
        .services-table td {
            padding: 8px;
            border: 1px solid #2378cd;
            vertical-align: middle;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-right {
            text-align: right;
        }
        
        /* Totals Section */
        .totals-section {
            width: 100%;
            margin-top: 15px;
        }
        
        .totals-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .totals-table td {
            padding: 0;
            vertical-align: top;
        }
        
        .totals-content {
            width: 300px;
            margin-left: auto;
        }
        
        .total-row {
            margin-bottom: 4px;
            font-size: 13px;
        }
        
        .total-row table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .total-row td {
            padding: 2px 0;
        }
        
        .final-total {
            font-size: 14px;
            font-weight: bold;
            border-top: 2px solid #000;
            padding-top: 6px;
            margin-top: 8px;
        }
        
        /* Notes Section */
        .notes-section {
            margin: 25px 0;
        }
        
        .notes-title {
            font-size: 13px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        
        .notes-content {
            background-color: #f8f9fa;
            padding: 12px;
            border-left: 4px solid #007bff;
            font-size: 12px;
            line-height: 1.4;
        }
        
        /* Payment and Validity Section */
        .bottom-section {
            margin-top: 25px;
        }
        
        .bottom-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .bottom-table td {
            vertical-align: top;
            padding: 0;
        }
        
        .payment-cell {
            width: 60%;
            padding-right: 20px;
        }
        
        .validity-cell {
            width: 40%;
        }
        
        .payment-info {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .payment-title {
            font-size: 13px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        
        .bank-section {
            margin-bottom: 12px;
        }
        
        .validity-notice {
            background-color: #e7f3ff;
            border: 1px solid #b8daff;
            padding: 12px;
            border-radius: 4px;
            text-align: center;
            font-size: 12px;
            color: #004085;
            font-weight: bold;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            font-size: 11px;
            color: #666;
            border-top: 1px solid #dee2e6;
            padding-top: 15px;
            margin-top: 25px;
        }
        
        @media print {
            body {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header-section">
            <table class="header-table">
                <tr>
                    <td class="logo-cell">
                        <div class="company-logo">
                            <!-- <p>relative path: {{ config('app.logo') }}</p>
                            <p>Full URL: {{ asset(config('app.logo')) }}</p>
                            <p>File exists: {{ file_exists(public_path(config('app.logo'))) ? 'Yes' : 'No' }}</p>
                            <p>Full file path: {{ public_path(config('app.logo')) }}</p> -->
                            <img src="{{ config('app.logo') }}" alt="{{ config('app.name') }}" />
                        </div>
                    </td>
                    <td class="company-info-cell">
                        <div class="invoice-title">Quotation</div>
                        <div class="company-address">
                            59 Katakoeroe Street<br>
                            Birch Acres<br>
                            Kempton park, Gauteng 1618<br>
                            South Africa<br>
                            Mobile: 0738114652<br>
                            www.pendagraphics.co.za
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="divider"></div>

        <!-- Main Content -->
        <div class="main-content">
            <table class="content-table">
                <tr>
                    <td class="bill-to-cell">
                        <div class="section-title">BILL TO:</div>
                        <div class="customer-info">
                            {{ $estimate->name }}<br>
                            {{ $estimate->email }}
                        </div>
                    </td>
                    <td class="details-cell">
                        <div class="detail-row">
                            <span class="detail-label">Invoice Number:</span>
                            <span class="detail-value">{{ $estimate->id }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Invoice Date:</span>
                            <span class="detail-value">{{ $estimate->created_at->format('F j, Y') }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Payment Due:</span>
                            <span class="detail-value">{{ $estimate->created_at->addDays(15)->format('F j, Y') }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Amount Due (ZAR):</span>
                            <span class="detail-value"><strong>R{{ number_format($estimate->total_amount, 2) }}</strong></span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Services Table -->
        <table class="services-table">
            <thead>
                <tr>
                    <th>Services</th>
                    <th class="text-center" style="width: 80px;">Quantity</th>
                    <th class="text-right" style="width: 100px;">Price</th>
                    <th class="text-right" style="width: 100px;">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($estimate->services as $service)
                <tr>
                    <td>{{ $service->service->name ?? 'Service Not Found' }}</td>
                    <td class="text-center">1</td>
                    <td class="text-right">R{{ number_format($service->price, 2) }}</td>
                    <td class="text-right">R{{ number_format($service->price, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Totals Section -->
        <div class="totals-section">
            <table class="totals-table">
                <tr>
                    <td style="width: 50%;"></td>
                    <td>
                        <div class="totals-content">
                            <div class="total-row">
                                <table>
                                    <tr>
                                        <td><strong>Total:</strong></td>
                                        <td class="text-right">R{{ number_format($estimate->total_amount, 2) }}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="total-row final-total">
                                <table>
                                    <tr>
                                        <td><strong>Amount Due (ZAR):</strong></td>
                                        <td class="text-right"><strong>R{{ number_format($estimate->total_amount, 2) }}</strong></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Notes Section -->
        @if($estimate->notes)
        <div class="notes-section">
            <div class="notes-title">Notes / Terms</div>
            <div class="notes-content">
                {{ $estimate->notes }}
            </div>
        </div>
        @endif

        <!-- Payment Information and Validity -->
        <div class="bottom-section">
            <table class="bottom-table">
                <tr>
                    <td class="payment-cell">
                        <div class="payment-info">
                            <div class="payment-title">Payable to:</div>
                            <div class="bank-section">
                                <strong>FNB</strong><br>
                                Name: Thuthuka Khoza<br>
                                Acc No. 62738227778<br>
                                Branch code 250655<br>
                                Recipient Ref. [Your name]
                            </div>
                            <div class="bank-section">
                                <strong>CAPITEC</strong><br>
                                Acc No. 2178850932<br>
                                Acc type: Savings<br>
                                Number: 0738114652
                            </div>
                        </div>
                    </td>
                    <td class="validity-cell">
                        <div class="validity-notice">
                            This Quotation is due within 15 days from the date of issue.
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for choosing {{ config('app.name') }}!</p>
        </div>
    </div>
</body>
</html>