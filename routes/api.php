<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderProductController;

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

//Product
Route::get('product/{category_id}', [ProductController::class, 'index']);



//Category
Route::get('/category' , [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function (){
    //User
    Route::get('user', [AuthController::class, 'user']);
    Route::get('user-all', [AuthController::class, 'userAll']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::put('user/update', [AuthController::class, 'update']);

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
    Route::put('order/status', [OrderController::class, 'updateStatus']);
    Route::post('/order', [OrderController::class, 'store']);

    //Order Product
    Route::get('/order-product/{order_id}', [OrderProductController::class, 'getOrderProducts']);
});
