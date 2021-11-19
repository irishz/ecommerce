<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class CreateVendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vendors = [
            [
                'name' => 'vendor001',
            ],
            [
                'name' => 'vendor002',
            ],
            [
                'name' => 'vendor003',
            ],
            [
                'name' => 'vendor004',
            ],
            [
                'name' => 'vendor005',
            ],
        ];

        foreach ($vendors as $key => $vendor) {
            Vendor::create($vendor);
        }
    }
}
