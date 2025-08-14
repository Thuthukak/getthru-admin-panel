@component('mail::message')
# Thank You for Your Interest in Penda Graphics

Dear {{ $estimate->name }},

We've received your quotation request and are excited to work with you on your project!

## Your Quotation Summary

@component('mail::table')
| Service | Price |
|:--------|------:|
@foreach($services as $estimateService)
| {{ $estimateService->service->name }} | R{{ number_format($estimateService->price, 2) }} |
@endforeach
| **Total Estimate** | **R{{ number_format($estimate->total_amount, 2) }}** |
@endcomponent

Please note: The prices listed above are estimates based on the services you selected. Final pricing may vary after we discuss your specific requirements in detail.

## What's Next?

One of our project managers will contact you within 1 business day to discuss your project in more detail and provide you with a comprehensive quote.

@component('mail::button', ['url' => config('app.url')])
Visit Our Website
@endcomponent

If you have any questions in the meantime, please don't hesitate to contact us.

Thank you for choosing Penda Graphics for your design needs!

Regards,<br>
{{ config('app.name') }} Team
@endcomponent