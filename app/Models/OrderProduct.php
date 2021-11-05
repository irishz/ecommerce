<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderProduct extends Model
{
    use HasFactory;

    protected $table = 'order_product';

    protected $with = [
        'product'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
