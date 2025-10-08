<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class DashboardController extends Controller
{
    public function show()
    {

        $articles = Article::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard', [
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|url',
            'status' => 'required|in:draft,published,archived',
        ]);

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'featured_image' => $validated['featured_image'],
            'status' => $validated['status'],
            'user_id' => auth()->id(),
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Article created successfully!');
    }
}
