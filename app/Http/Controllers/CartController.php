<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function getUserCart(){
        $carts = Cart::where('user_id', Auth::user()->id)->get();

        return response()->json($carts);
    }

    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product_exist = Cart::where('user_id', Auth::user()->id)
                                ->where('product_id', $request->product_id)
                                ->first();

        if ($product_exist === null) {
            // dd('product add');
            $cart = Cart::create($request->all());
        } else {
            // dd('product exist');
            $carts = Cart::find($product_exist->id);
            
            $carts->qty = $carts->qty + 1;
            $carts->total = $carts->price * $carts->qty;
            
            $carts->save();
        }

        return response()->json(['message' => 'เพิ่มใส่รถเข็นสำเร็จ!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        $cart_items = $request->all();

        // dd($cart_items[0]['id']);
        foreach ($cart_items as $key => $item) {
            $cart = Cart::find($item['id']);
            
            $cart->qty = $item['qty'];
            $cart->total = $item['total'];
            
            $cart->save();
        }
            

        return response()->json([
            'message' => 'อัพเดทรายการในรถเข็นสำเร็จ.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart, $id)
    {
        $cart::find($id)->delete();

        // Cart::find($cart);

        return response()->json([
            'message' => "ลบรายการสำเร็จ"
        ]);
    }
}
