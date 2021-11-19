<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceProduct extends Model
{
    use HasFactory;

    protected $table = 'invoice_product';

    protected $with = [
        'product'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
