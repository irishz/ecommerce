<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = Order::all();

        return response()->json($orders);
    }

    public function getUserOrder(Request $request)
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();

        return response()->json($orders);
    }

    public function getSingleOrder(Request $request, $id)
    {
        $order = Order::where('id', $id)->first();

        return response()->json($order);
    }

    public function getOrderByMonth($from, $to)
    {
        $orders = Order::whereBetween('created_at', [$from, $to])->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request)
    {
        // dd($request->id);

        $orders = Order::whereIn('id', $request->id)->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Update order status successfully',
        ]);
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
        $carts = $request->all();
        // dd($carts[0]);
        $total = 0;
        foreach ($carts as $key => $cart) {
            $total += $cart['total'];
        }

        //Create order
        $user = Auth::user();
        $order = $user->orders()->create([
            'total' => $total,
            'status' => "Ordered"
        ]);
        
        //Create order items
        foreach ($carts as $key => $cart) {
            $order->orderitems()->attach($cart['product_id'],[
                'qty' => $cart['qty'],
                'total' => $cart['total']
            ]);
        }

        //Delete current cart
        $carts = Cart::where('user_id', Auth::user()->id)->delete();

        return response()->json([
            'message' => 'Create Ordered Successfully',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
