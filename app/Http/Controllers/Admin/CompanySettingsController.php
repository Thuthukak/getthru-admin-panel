<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

class CompanySettingsController
{
    public function index()
    {
        $settings = CompanySetting::getAllGrouped();
        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $settings = $request->input('settings', []);
        
        foreach ($settings as $key => $value) {
            $setting = CompanySetting::where('key', $key)->first();
            
            if (!$setting) {
                continue;
            }

            // Validate required fields
            if ($setting->is_required && empty($value)) {
                return back()->withErrors([
                    $key => "The {$setting->label} field is required."
                ])->withInput();
            }

            // Validate email fields
            if ($setting->type === 'email' && !empty($value) && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                return back()->withErrors([
                    $key => "The {$setting->label} must be a valid email address."
                ])->withInput();
            }

            CompanySetting::set($key, $value);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Company settings updated successfully!');
    }
}
