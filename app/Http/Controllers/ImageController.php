<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function upload(Request $request, $id, $name)
    {
        if ($request->hasFile('myImage')) {
            // dd($request->all());
            $imageName = $name. '.' .$request->file('myImage')->extension();
            $request->file('myImage')->storeAs('products/'.$id, $imageName);

            return response()->json([
                'message' => 'อัพเดทข้อมูลสินค้าสำเร็จ'
            ]);
        }
    }
}
