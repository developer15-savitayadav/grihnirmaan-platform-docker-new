<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('locality');
            $table->unsignedInteger('plot_size_sqft');
            $table->unsignedInteger('built_up_area_sqft');
            $table->string('bhk', 10);
            $table->string('style', 50);
            $table->date('completion_date');
            $table->unsignedInteger('duration_months');
            $table->string('budget_range', 50);
            $table->text('customer_quote')->nullable();
            $table->text('challenges_solved')->nullable();
            $table->string('hero_image_path');
            $table->string('floor_plan_path')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->integer('display_order')->default(0)->index();
            $table->string('meta_title')->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
