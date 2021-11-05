<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\CreateUserSeeder;
use Database\Seeders\CreateProductSeeder;
use Database\Seeders\CreateCategorySeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(CreateCategorySeeder::class);
        $this->call(CreateProductSeeder::class);
        $this->call(CreateUserSeeder::class);
    }
}
