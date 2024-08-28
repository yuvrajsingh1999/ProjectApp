<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SystemMenuList;
use App\Models\MenuList;
class ApiController extends Controller
{
    public function getSystemMenu()
    {
        $books = Book::all();
        return response()->json($books);
    }
    public function getMenus(Request $request)
    {
        $book = Book::create($request->all());
        return response()->json($book, 201);
    }
}
