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
        Schema::create('adhesions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('document_id')->constrained('documents')->onDelete('cascade');
            $table->date('date_adhesion')->nullable();
            $table->date('date_expiration')->nullable();
            $table->enum('statut', ['en_attente', 'acceptée', 'refusée', 'expirée'])->default('en_attente');
            $table->string('token_signature')->nullable();
            $table->string('external_quiz_validation_id')->nullable();
            $table->json('historique_statuts')->nullable();
            $table->foreignId('validated_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('commentaire')->nullable();
            $table->text('declaration_conflits_interets')->nullable();
            $table->string('direction')->nullable();
            $table->string('entreprise')->nullable();
            $table->string('fonction')->nullable();
            $table->text('description_titre')->nullable();
            $table->string('firme_courtage')->nullable();
            $table->boolean('accepte_code_ethique')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adhesions');
    }
};
