<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class CreateProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'category_id' => 1,
                'product_code' => 'CP0001',
                'name' => 'testitem1',
                'description' => 'test item1 description',
                'price' => 35.00,
                'qty' => 100,
                'active' => 1,
            ],
            [
                'category_id' => 1,
                'product_code' => 'CP0002',
                'name' => 'testitem2',
                'description' => 'test item2 description',
                'price' => 100.00,
                'qty' => 50,
                'active' => 1,
            ],
            [
                'category_id' => 2,
                'product_code' => 'CP0003',
                'name' => 'testitem3',
                'description' => 'test item3 description',
                'price' => 150.00,
                'qty' => 20,
                'active' => 1,
            ],

        ];

        foreach ($products as $key => $prod) {
            Product::create($prod);
        }
    }
}
