<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function user()
    {
        return Auth::user();
    }

    public function userAll()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->email),
            'is_admin' => 0,
        ]);

        return $user;
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('employee_code', 'password'))) {
            return response([
                'message' => 'EmployeeCode or Password Invalid!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('userToken')->plainTextToken;

        $cookie = cookie('jwt', $token, 60 * 24);  //1 day

        return response([
            'message' => 'Login Success',
            'user' => $user,
        ])->withCookie($cookie);
    }

    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Logout Success'
        ])->withCookie($cookie);
    }

    public function update(Request $request)
    {
        $user = User::find($request->id);

        $user->employee_code = $request->employee_code;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->department = $request->department;
        $user->is_admin = $request->is_admin;
        
        $user->save();

        return response()->json([
            'message' => 'Update profile successfully.'
        ]);
    }
}
