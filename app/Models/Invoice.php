<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
    ];

    protected $with = ['invitems'];

    public function invitems()
    {
        return $this->belongsToMany(Product::class)->withTimestamps();
    }
}
