<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\BlogPostView;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::query()
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'category' => $post->category,
                    'read_time_minutes' => $post->read_time_minutes,
                    'published_at' => $post->published_at
                        ? $post->published_at->format('d M Y')
                        : null,
                    'image' => $post->featured_image_path
                        ? asset('storage/' . ltrim($post->featured_image_path, '/'))
                        : 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900',
                ];
            });

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(Request $request, string $slug): Response
    {
        $post = BlogPost::with('author')
            ->where('slug', $slug)
            ->whereNotNull('published_at')
            ->firstOrFail();

        $this->trackView($request, $post);
        $previousPost = BlogPost::published()
            ->where('published_at', '<', $post->published_at)
            ->latest('published_at')
            ->first();

        $nextPost = BlogPost::published()
            ->where('published_at', '>', $post->published_at)
            ->oldest('published_at')
            ->first();
        $post->refresh();
        Log::info('Blog view tracked', [
            'post_id' => $post->id,
            'ip' => $request->ip(),
        ]);
        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'category' => $post->category,
                'tags' => is_array($post->tags)
                    ? $post->tags
                    : json_decode($post->tags ?? '[]', true),

                'read_time_minutes' => $post->read_time_minutes,
                'view_count' => $post->view_count,

                'published_at' => $post->published_at
                    ? $post->published_at->format('d M Y')
                    : null,

                'image' => $post->featured_image_path
                    ? asset('storage/' . ltrim($post->featured_image_path, '/'))
                    : 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',

                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                'author_name' => $post->author?->name ?? 'GrihNirmaan Team',
            ],

            'previousPost' => $previousPost ? [
                'title' => $previousPost->title,
                'slug' => $previousPost->slug,
                'image' => $previousPost->featured_image_path
                    ? asset('storage/' . ltrim($previousPost->featured_image_path, '/'))
                    : 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
            ] : null,

            'nextPost' => $nextPost ? [
                'title' => $nextPost->title,
                'slug' => $nextPost->slug,
                'image' => $nextPost->featured_image_path
                    ? asset('storage/' . ltrim($nextPost->featured_image_path, '/'))
                    : 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
            ] : null,
        ]);
    }
    // private function trackView(Request $request, BlogPost $post): void
    // {
    //     $sessionId = $request->session()->getId();
    //     $ipAddress = $request->ip();

    //     $alreadyViewed = BlogPostView::where('blog_post_id', $post->id)
    //         ->where(function ($query) use ($sessionId, $ipAddress) {
    //             $query->where('session_id', $sessionId)
    //                 ->orWhere('ip_address', $ipAddress);
    //         })
    //         ->where('created_at', '>=', now()->subHours(24))
    //         ->exists();

    //     if (! $alreadyViewed) {
    //         BlogPostView::create([
    //             'blog_post_id' => $post->id,
    //             'user_id' => auth()->id(),
    //             'ip_address' => $ipAddress,
    //             'user_agent' => $request->userAgent(),
    //             'session_id' => $sessionId,
    //         ]);

    //         $post->increment('view_count');
    //     }
    // }
    private function trackView(Request $request, BlogPost $post): void
    {
        $userId = auth()->id();
        $sessionId = $request->session()->getId();

        $alreadyViewed = BlogPostView::where('blog_post_id', $post->id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->where('created_at', '>=', now()->subHours(24))
            ->exists();

        if (! $alreadyViewed) {
            BlogPostView::create([
                'blog_post_id' => $post->id,
                'user_id' => $userId,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'session_id' => $sessionId,
            ]);

            $post->increment('view_count');
        }
    }
}
