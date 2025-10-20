<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Get authenticated user profile
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        try {
            $validated = $request->validate([
                'fullname' => 'sometimes|required|string|max:255',
                'username' => 'sometimes|required|string|max:255|unique:users,username,' . $user->id,
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            ]);

            $user->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $user->fresh()
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'current_password' => 'required',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = $request->user();

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect'
                ], 422);
            }

            $user->update([
                'password' => Hash::make($request->password)
            ]);

            // Revoke all tokens except current one for security
            $currentToken = $user->currentAccessToken();
            $user->tokens()
                ->where('id', '!=', $currentToken->id)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Password updated successfully'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Update user photo
     */
    public function updatePhoto(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
            ]);

            $user = $request->user();

            // Delete old photo if exists
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }

            // Store new photo
            $photoPath = $request->file('photo')->store('photos', 'public');
            
            // Update user record
            $user->update(['photo' => $photoPath]);

            return response()->json([
                'success' => true,
                'message' => 'Photo updated successfully',
                'data' => [
                    'photo_url' => Storage::url($photoPath),
                    'photo_path' => $photoPath
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload photo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user photo
     */
    public function deletePhoto(Request $request): JsonResponse
    {
        $user = $request->user();

        try {
            if ($user->photo) {
                // Delete file from storage
                Storage::disk('public')->delete($user->photo);
                
                // Update user record
                $user->update(['photo' => null]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Photo deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete photo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Admin: Get all users (protected by admin middleware)
     */
    public function index(): JsonResponse
    {
        $users = User::latest()->paginate(10);

        return response()->json([
            'success' => true,
            'data' => [
                'users' => $users
            ]
        ]);
    }

    /**
     * Admin: Update user role
     */
    public function updateRole(Request $request, User $user): JsonResponse
    {
        try {
            $request->validate([
                'role' => 'required|string|in:user,admin,moderator',
            ]);

            // Prevent self-role modification
            if ($user->id === $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You cannot change your own role'
                ], 422);
            }

            $user->update(['role' => $request->role]);

            return response()->json([
                'success' => true,
                'message' => 'User role updated successfully',
                'data' => [
                    'user' => $user
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }
}