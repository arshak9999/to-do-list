<?php

namespace App\Http\Controllers;

use App\Models\ToDoLists;
use Illuminate\Http\Request;

use Inertia\Inertia;
class ToDoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ToDoList/Index');
    }

    public function getToDoLists()
    {
        // ToDo: here we can use pagination
        $toDoLists = ToDoLists::get();
        return response()->json($toDoLists);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Todo: we can add validations validation

        $data = $request->only(['title', 'text', 'status']);

        $toDoListItem = new ToDoLists();
        $toDoListItem->fill($data);

        if ($toDoListItem->save()) {
            return response()->json(['status' => 'success', 'data' => $toDoListItem]);
        }

        throw new \Exception('Something went wrong');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $toDoListItem = ToDoLists::find($id);

        if($toDoListItem) {
            $data = $request->only(['title', 'text', 'status']);
            $toDoListItem->fill($data);

            if ($toDoListItem->save()) {
                return response()->json(['status' => 'success', 'data' => $toDoListItem]);
            }

        }

        throw new \Exception('Something went wrong');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $toDoListItem = ToDoLists::find($id);

        if ($toDoListItem->delete()) {
            return response()->json(['status' => 'success']);
        }

        throw new \Exception('Something went wrong');
    }
}
