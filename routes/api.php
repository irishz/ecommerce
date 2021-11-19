<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);




//Category
Route::get('/category' , [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function (){
    //Product
    Route::get('product/{category_id}', [ProductController::class, 'index']);
    Route::get('product-all', [ProductController::class, 'getallprod']);
    Route::delete('product/delete/{id}', [ProductController::class, 'destroy']);
    Route::put('product/update/{id}', [ProductController::class, 'update']);
    //ProductImage
    Route::post('image/upload/{id}/{name}', [ImageController::class, 'upload']);

    //User
    Route::get('user', [AuthController::class, 'user']);
    Route::get('user-all', [AuthController::class, 'userAll']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::put('user/update', [AuthController::class, 'update']);
    Route::put('user/reset-password', [AuthController::class, 'resetPassword']);
    Route::delete('user/delete/{id}', [AuthController::class, 'destroy']);

    //Cart
    Route::get('getcart', [CartController::class, 'getUserCart']);
    Route::post('addcart', [CartController::class, 'store']);
    Route::delete('cart/delete/{id}', [CartController::class, 'destroy']);
    Route::put('cart/qty-change', [CartController::class, 'update']);

    //Order
    Route::get('order-all', [OrderController::class, 'index']);
    Route::get('getsingleorder/{id}', [OrderController::class, 'getSingleOrder']);
    Route::get('getorder', [OrderController::class, 'getUserOrder']);
    Route::get('order-month/{start_date}/{end_date}', [OrderController::class, 'getOrderByMonth']);
    Route::get('order-month-vendor/{start_date}/{end_date}', [OrderController::class, 'getOrderByMonthToVendor']);
    Route::put('order/status', [OrderController::class, 'updateStatus']);
    Route::post('/order', [OrderController::class, 'store']);

    //Order Product
    Route::get('/order-product/{order_id}', [OrderProductController::class, 'getOrderProducts']);
    Route::put('/order-product/status', [OrderProductController::class, 'updateOrderProdStatus']);

    //Invoice
    Route::post('invoice', [InvoiceController::class, 'store']);
    
    //Vendor
    Route::get('vendors', [VendorController::class, 'index']);
    Route::post('vendor/create', [VendorController::class, 'create']);
    Route::put('vendor/update/{id}', [VendorController::class, 'store']);
    Route::delete('vendor/delete/{id}', [VendorController::class, 'destroy']);
});
