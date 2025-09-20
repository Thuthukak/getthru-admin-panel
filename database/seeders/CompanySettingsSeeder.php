<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CompanySetting;

class CompanySettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $settings = [
            // Company Information
            [
                'key' => 'company_name',
                'value' => 'Get Thru',
                'type' => 'text',
                'group' => 'company',
                'label' => 'Company Name',
                'description' => 'Your company name as it appears on invoices',
                'is_required' => true,
                'sort_order' => 1
            ],
            [
                'key' => 'company_address',
                'value' => "123 Business Street\nCity, Province 1234",
                'type' => 'textarea',
                'group' => 'company',
                'label' => 'Company Address',
                'description' => 'Full company address (use line breaks for multiple lines)',
                'is_required' => true,
                'sort_order' => 2
            ],
            [
                'key' => 'company_phone',
                'value' => '+27 11 123 4567',
                'type' => 'phone',
                'group' => 'company',
                'label' => 'Company Phone',
                'description' => 'Primary company phone number',
                'is_required' => true,
                'sort_order' => 3
            ],
            [
                'key' => 'company_email',
                'value' => 'sales@getthru.co.za',
                'type' => 'email',
                'group' => 'company',
                'label' => 'Company Email',
                'description' => 'Primary company email address',
                'is_required' => true,
                'sort_order' => 4
            ],
            [
                'key' => 'company_website',
                'value' => 'www.getthru.co.za',
                'type' => 'url',
                'group' => 'company',
                'label' => 'Company Website',
                'description' => 'Company website URL (optional)',
                'is_required' => false,
                'sort_order' => 5
            ],

            // Payment Information
            [
                'key' => 'bank_name',
                'value' => 'FNB',
                'type' => 'text',
                'group' => 'payment',
                'label' => 'Bank Name',
                'description' => 'Name of your bank',
                'is_required' => true,
                'sort_order' => 10
            ],
            [
                'key' => 'bank_account_name',
                'value' => 'Get Thru',
                'type' => 'text',
                'group' => 'payment',
                'label' => 'Account Name',
                'description' => 'Name on the bank account',
                'is_required' => true,
                'sort_order' => 11
            ],
            [
                'key' => 'bank_account_number',
                'value' => '123456789',
                'type' => 'text',
                'group' => 'payment',
                'label' => 'Account Number',
                'description' => 'Bank account number',
                'is_required' => true,
                'sort_order' => 12
            ],
            [
                'key' => 'bank_branch_code',
                'value' => '250655',
                'type' => 'text',
                'group' => 'payment',
                'label' => 'Branch Code',
                'description' => 'Bank branch code',
                'is_required' => true,
                'sort_order' => 13
            ],
            [
                'key' => 'bank_account_type',
                'value' => 'Cheque Account',
                'type' => 'text',
                'group' => 'payment',
                'label' => 'Account Type',
                'description' => 'Type of bank account (Cheque, Savings, etc.)',
                'is_required' => false,
                'sort_order' => 14
            ],

            // Invoice Settings
            [
                'key' => 'invoice_terms_deposit',
                'value' => "• Deposit payment is due within 7 days of invoice date\n• Installation will be scheduled upon receipt of deposit\n• Deposit is non-refundable once installation is completed",
                'type' => 'textarea',
                'group' => 'invoice',
                'label' => 'Deposit Invoice Terms',
                'description' => 'Terms and conditions for deposit invoices',
                'is_required' => true,
                'sort_order' => 20
            ],
            [
                'key' => 'invoice_terms_service',
                'value' => "• Payment is due within 30 days of invoice date\n• Late payments may incur additional charges\n• Service may be suspended for overdue accounts",
                'type' => 'textarea',
                'group' => 'invoice',
                'label' => 'Service Invoice Terms',
                'description' => 'Terms and conditions for service invoices',
                'is_required' => true,
                'sort_order' => 21
            ],
            [
                'key' => 'invoice_footer_text',
                'value' => 'Thank you for your business!',
                'type' => 'textarea',
                'group' => 'invoice',
                'label' => 'Invoice Footer Text',
                'description' => 'Text that appears at the bottom of invoices',
                'is_required' => false,
                'sort_order' => 22
            ],
        ];

        foreach ($settings as $setting) {
            CompanySetting::updateOrCreate(
                ['key' => $setting['key']], 
                $setting
            );
        }
    }
    
}
