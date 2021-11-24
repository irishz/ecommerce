<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($category_id)
    {
        $product = Product::where('category_id', $category_id)
            ->where('active', 1)
            ->get();

        return response()->json($product);
    }

    public function getallprod(){
        $product = Product::all();

        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        Product::create([
            'category_id' => $request->category_id,
            'vendor_id' => $request->vendor_id,
            'product_code' => $request->product_code,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'unit' => $request->unit,
            'qty' => $request->qty,
            'active' => $request->active,
        ]);

        return response()->json([
            'message' => 'เพิ่มสินค้าสำเร็จ'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        $product->category_id = $request->category_id;
        $product->vendor_id = $request->vendor_id;
        $product->product_code = $request->product_code;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->unit = $request->unit;
        $product->qty = $request->qty;
        $product->active = $request->active;
        
        $product->save();
        
        return response()->json([
            'message' => 'อัพเดทข้อมูลสินค้าสำเร็จ!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, $id)
    {
        Product::find($id)->delete();

        return response()->json([
            'message' => 'ลบสินค้าสำเร็จ!'
        ]);
    }
}
