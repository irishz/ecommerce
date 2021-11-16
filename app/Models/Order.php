<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use App\Models\OrderProduct;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
        'status'
    ];

    protected $with = ['user', 'order_product'];

    public function orderitems()
    {
        return $this->belongsToMany(Product::class)->withPivot('qty', 'total')->withTimestamps();
    }

    public function order_product()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
