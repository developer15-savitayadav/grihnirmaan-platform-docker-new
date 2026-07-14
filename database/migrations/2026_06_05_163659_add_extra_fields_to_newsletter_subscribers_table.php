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
        Schema::table('newsletter_subscribers', function (Blueprint $table) {
            $table->boolean('is_active')
                ->default(true)
                ->after('email');

            $table->string('source')
                ->default('website')
                ->after('confirmed_at');

            $table->string('unsubscribe_token')
                ->nullable()
                ->after('source');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newsletter_subscribers', function (Blueprint $table) {
            $table->dropColumn([
                'is_active',
                'source',
                'unsubscribe_token',
            ]);
        });
    }
};
