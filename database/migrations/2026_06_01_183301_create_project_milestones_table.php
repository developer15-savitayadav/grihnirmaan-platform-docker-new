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
        Schema::create('project_milestones', function (Blueprint $table) {
             $table->id();

            $table->unsignedBigInteger('customer_project_id');

            $table->string('milestone_name', 150);

            $table->date('expected_date');
            $table->date('completed_date')->nullable();

            $table->enum('status', [
                'pending',
                'in_progress',
                'completed',
                'approved'
            ])->default('pending');

            $table->decimal('payment_due', 12, 2)->default(0);

            $table->text('notes')->nullable();

            $table->timestamps();

            // Foreign Key
            $table->foreign('customer_project_id')
                ->references('id')
                ->on('customer_projects')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_milestones');
    }
};
