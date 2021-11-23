<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'vendor_id',
        'product_code',
        'name',
        'description',
        'price',
        'qty',
        'active' 
    ];

    protected $with = ['vendor'];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
