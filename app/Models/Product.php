<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $with = ['vendor'];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
