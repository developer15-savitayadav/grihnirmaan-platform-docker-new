<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_projects', function (Blueprint $table) {
           $table->id();

            $table->unsignedBigInteger('customer_user_id');
            $table->string('project_code', 20)->unique();

            $table->text('plot_address');

            $table->date('start_date');
            $table->date('expected_completion');

            $table->string('current_phase', 100)->nullable();

            $table->integer('overall_progress_percent')->default(0);

            $table->decimal('total_value', 12, 2)->default(0);
            $table->decimal('amount_paid', 12, 2)->default(0);

            $table->unsignedBigInteger('assigned_supervisor_id')->nullable();

            $table->timestamps();

            // Foreign Keys
            $table->foreign('customer_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('assigned_supervisor_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_projects');
    }
};
