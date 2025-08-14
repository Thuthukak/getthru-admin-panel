<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class BaseController extends Controller
{
    /**
     * Get base SEO data that's common across all pages
     */
    protected function getBaseSeoData()
    {
        return [
            'title' => 'Home | Creative Web Design, Branding & Digital Solutions',
            'description' => 'Penda Graphics is a South African creative agency offering professional web design, development, branding, and digital marketing services to help businesses grow online.',
            'keywords' => 'Penda Graphics, web design South Africa, website development, branding, graphic design, logo design, digital marketing, SEO, UI/UX, Laravel, Vue, e-commerce, identity design',
            'og_title' => 'Penda Graphics | Elevate Your Brand with Design & Digital Excellence',
            'og_description' => 'Penda Graphics is a South African creative agency offering professional web design, development, branding, and digital marketing services to help businesses grow online.',
            'og_image' => asset('assets/images/penda_logo2.png'),
            'og_type' => 'website',
            'og_site_name' => 'Penda Graphics',
            'og_url' => config('app.url'),
            'twitter_card' => 'summary_large_image',
            'canonical_url' => config('app.url'),
        ];
    }

    /**
     * Merge custom SEO data with base SEO data
     */
    protected function mergeSeoData(array $customData = [])
    {
        return array_merge($this->getBaseSeoData(), $customData);
    }

}
