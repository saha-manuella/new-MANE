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
        Schema::create('autorisations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id');
            $table->unsignedBigInteger('role_id');
            $table->enum('niveau', ['lecture', 'modification', 'administration']);
            $table->timestamp('date_autorisation')->useCurrent();
            $table->timestamp('expire_le')->nullable();
            $table->unsignedBigInteger('accorde_par_user_id')->nullable();
            $table->json('historique_modifications')->nullable();
            $table->foreignId('document_id')->constrained('documents')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            $table->foreignId('accorde_par_user_id')->nullable()->constrained('users')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('autorisations');
    }
};
