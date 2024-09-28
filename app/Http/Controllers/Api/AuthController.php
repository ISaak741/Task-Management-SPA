<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validated))
            return response()->json([
                'success' => false,
                'message' => 'invalid credentials'
            ], 401);

        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'loged in successfuly',
            'token-api' => $token,
            'token-type' => 'Bearer'
        ], 200);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:users|min:8',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        Auth::login($user);
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'registered successfully',
            'token-api' => $token,
            'token-type' => 'Bearer',
        ], 201);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        Auth::forgetUser();

        return response()->json([
            'success' => true,
            'message' => 'good bye'
        ], 200);
    }
}
