<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request, $id, $name)
    {
        $int_id = (int)$id;

        if ($int_id < 1) {
            $files = Storage::allFiles('products');
            $folder_id = count($files) + 1;
            
            if ($request->hasFile('myImage')) {
                $imageName = $name. '.' .$request->file('myImage')->extension();
                $request->file('myImage')->storeAs('products/'.$folder_id, $imageName);
    
                return response()->json([
                    'message' => 'อัพโหลดรูปภาพสำเร็จ'
                ]);
            }
        } else {
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
}
