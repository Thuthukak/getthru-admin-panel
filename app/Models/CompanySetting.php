<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class CompanySetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'label',
        'description',
        'is_required',
        'sort_order'
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'sort_order' => 'integer'
    ];

    // Get setting value by key
    public static function get($key, $default = null)
    {
        return Cache::remember("company_setting_{$key}", 3600, function() use ($key, $default) {
            $setting = static::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }

    // Set setting value
    public static function set($key, $value)
    {
        $setting = static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
        
        Cache::forget("company_setting_{$key}");
        return $setting;
    }

    // Get all settings grouped
    public static function getAllGrouped()
    {
        return Cache::remember('company_settings_grouped', 3600, function() {
            return static::orderBy('sort_order')->get()->groupBy('group');
        });
    }

    // Clear all settings cache
    public static function clearCache()
    {
        Cache::forget('company_settings_grouped');
        $keys = static::pluck('key');
        foreach ($keys as $key) {
            Cache::forget("company_setting_{$key}");
        }
    }

    // Boot method to clear cache on model events
    protected static function boot()
    {
        parent::boot();
        
        static::saved(function ($model) {
            static::clearCache();
        });
        
        static::deleted(function ($model) {
            static::clearCache();
        });
    }
}