<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Barber;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // Create 3 users
         $users = [
            ['name' => 'Kofi', 'email' => 'Kofi@example.com', 'password' => Hash::make('password')],
            ['name' => 'Jonas', 'email' => 'Jonas@example.com', 'password' => Hash::make('password')],
            ['name' => 'Mike', 'email' => 'mike@example.com', 'password' => Hash::make('password')],
        ];
    }
}
