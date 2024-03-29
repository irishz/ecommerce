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
        if (User::where('employee_code', '=', $request->employeeCode)->exists()) {
            return response([
                'message' => 'รหัสพนักงานนี้มีในระบบอยู่แล้ว'
            ]);
        } else {
            // dd($request);
            // $user = new User;

            // $user->employee_code = $request->employeeCode;
            // $user->first_name = $request->firstName;
            // $user->last_name = $request->lastName;
            // $user->department = $request->department;
            // $user->password = Hash::make($request->password);
            // $user->is_admin = $request->isAdmin;

            // $user->save();
            $user = User::create([
                'employee_code' => $request->employeeCode,
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'department' => $request->department,
                'password' => Hash::make($request->password),
                'is_admin' => $request->isAdmin, //isAdmin default = 0
            ]);

            return response([
                'message' => 'สร้างผู้ใช้สำเร็จ',
                // 'user' => $user,
            ]);
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('employee_code', 'password'))) {
            return response([
                'message' => 'รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง!'
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
            'message' => 'ออกจากระบบสำเร็จ'
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
            'message' => 'อัพเดทข้อมูลส่วนตัวสำเร็จ.'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $user = User::find($request->id);


        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'เปลี่ยนรหัสผ่านสำเร็จ'
        ]);
    }

    public function destroy($id)
    {
        User::find($id)->delete();

        return response()->json([
            'message' => 'ลบผู้ใช้สำเร็จ'
        ]);
    }
}
