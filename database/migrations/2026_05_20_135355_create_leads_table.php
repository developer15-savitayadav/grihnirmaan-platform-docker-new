<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->index();
            $table->string('email')->nullable();
            $table->string('source', 100);
            $table->string('service_interest')->nullable();
            $table->unsignedInteger('plot_size_sqft')->nullable();
            $table->decimal('estimated_budget', 12, 2)->nullable();
            $table->string('locality')->nullable();
            $table->enum('finish_level', ['budget', 'standard', 'premium'])->nullable();
            $table->json('raw_payload')->nullable();
            $table->enum('status', ['new', 'contacted', 'qualified', 'converted', 'lost'])
                ->default('new')
                ->index();
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamp('whatsapp_sent_at')->nullable();
            $table->string('pdf_quote_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
