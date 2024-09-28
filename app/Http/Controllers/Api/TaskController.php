<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $tasks = $user->tasks;

        return response()->json([
            'data' => $tasks
        ]);
    }
    public function show(Request $request, $id)
    {
        $task = Task::find($id);
        if ($task)
            return response()->json([
                'success' => true,
                'data' => $task
            ]);

        return response()->json([
            'success' => false,
            'message' => "task with id:$id does not exist"
        ], 404);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:8',
            'status' => 'required|boolean'
        ]);

        $validated['user_id'] = Auth::user()->id;

        $task = Task::create($validated);

        return response()->json([
            'data' => $task
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:8',
            'status' => 'required|boolean',
        ]);


        $task = Task::find($id);
        $success = false;
        if ($task)
            $success = $task->update($validated);

        return response()->json([
            'success' => $success,
            'message' => $success ? 'task has been updated successfully' : "task with id:$id does not exist"
        ], $task ? 200 : 404);
    }
    public function destroy(Request $request, $id)
    {
        $task = Task::find($id);
        if ($task)
            $task->delete();

        return response()->json([
            'success' => $task ? true : false,
            'message' => $task ? 'task deleted successfully' : "task with id:$id does not exists"
        ], $task ? 200 : 404);
    }
}
