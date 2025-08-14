<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Logo Design',
                'description' => 'Professional custom logo design with unlimited revisions',
                'base_price' => 300.00,
                'is_active' => true
            ],
            [
                'name' => 'Business Card Design',
                'description' => 'Custom business card design including digital files',
                'base_price' => 150.00,
                'is_active' => true
            ],
            [
                'name' => 'Brochure Design',
                'description' => 'Professional brochure design with up to 3 revisions',
                'base_price' => 250.00,
                'is_active' => true
            ],
            [
                'name' => 'Web Design',
                'description' => 'Custom responsive website design, not including development',
                'base_price' => 800.00,
                'is_active' => true
            ],
            [
                'name' => 'Social Media Graphics',
                'description' => 'Set of social media graphics for various platforms',
                'base_price' => 200.00,
                'is_active' => true
            ],
            [
                'name' => 'Banner/Billboard Design',
                'description' => 'Large format design for physical or digital banners',
                'base_price' => 350.00,
                'is_active' => true
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    
    }
}
