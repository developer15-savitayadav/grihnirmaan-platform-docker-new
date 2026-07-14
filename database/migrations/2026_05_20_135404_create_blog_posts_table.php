<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('excerpt', 500);
            $table->longText('content');
            $table->string('featured_image_path')->nullable();
            $table->foreignId('author_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('category', 50)->index();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->unsignedInteger('read_time_minutes')->default(0);
            $table->unsignedBigInteger('view_count')->default(0);
            $table->string('meta_title')->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
