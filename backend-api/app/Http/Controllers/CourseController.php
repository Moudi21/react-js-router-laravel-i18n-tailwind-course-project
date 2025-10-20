<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{

    public function index(Request $request)
    {
        $query = Course::query();

        $user = auth()->user();

        // ✅ Role-based visibility
        if ($user && $user->role === 'admin') {
            // Apply filter only if requested
            if ($request->has('isActive')) {
                $query->where('isActive', filter_var($request->input('isActive'), FILTER_VALIDATE_BOOLEAN));
            }
            // else → get all courses
        } else {
            // Guests & non-admin users only see active courses
            $query->where('isActive', true);
        }

        // ✅ search
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        // ✅ Optional filters
        if ($request->filled('menu-category')) {
            $query->where('categoryName', $request->input('menu-category'));
        }

        // ✅ Optional filters
        if ($request->filled('category')) {
            $query->where('categoryName', $request->input('category'));
        }

        if ($request->filled('platform')) {
            $query->where('platform', $request->input('platform'));
        }

        // ✅ Price filter (Free = 0, Paid = 1)
        if ($request->filled('price')) {
            $priceType = $request->input('price');
            if ($priceType == "free") {
                $query->where('price', 0); // Free
            } elseif ($priceType == "paid") {
                $query->where('price', '>', 0); // Paid
            }
        }

        // ✅ Sorting
        if ($request->filled('sortBy')) {
            $sortBy = $request->input('sortBy');
            $sortOrder = $request->input('sortOrder', 'asc');
            if (in_array($sortBy, ['categoryName', 'platform', 'price'])) {
                $query->orderBy($sortBy, $sortOrder);
            }
        }

        // ✅ Pagination
        return response()->json($query->paginate(12));
    }



    // POST /api/courses
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'provider'    => 'required|string|max:255',
            'date'        => 'required|date',
            'users'       => 'nullable|integer|min:0',
            'rating'       => 'nullable|integer|min:0',
            'image'       => 'nullable|string|max:500',
            'link'        => 'nullable|string|max:500',
            'categoryName'  => 'required|string|max:255',
            'platform'    => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'disc'        => 'nullable|string|max:500',
            'isActive'    => 'boolean',
        ]);

        $course = Course::create($data);

        return response()->json($course, 201);
    }

    // GET /api/courses/{course}
    public function show(Course $course)
    {
        return response()->json($course);
    }

    // PUT /api/courses/{course}
    public function update(Request $request, Course $course)
    {
        
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'provider'    => 'required|string|max:255',
            'date'        => 'required|date',
            'users'       => 'nullable|integer|min:0',
            'rating'       => 'nullable|integer|min:0',
            'image'       => 'nullable|string|max:500',
            'link'        => 'nullable|string|max:500',
            'categoryName'  => 'required|string|max:255',
            'platform'    => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'disc'        => 'nullable|string|max:500',
            'isActive'    => 'boolean',
        ]);

        $course->update($data);
        return response()->json($course);
    }

    // DELETE /api/courses/{course}
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }
}
