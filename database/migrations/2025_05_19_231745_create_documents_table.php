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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_document_id')->constrained('type_documents')->onDelete('restrict');
            $table->string('titre');
            $table->string('version')->nullable();
            $table->text('description')->nullable();
            $table->string('fichier_path')->nullable();
            $table->longText('contenu')->nullable();
            $table->string('mime_type')->nullable();
            $table->boolean('est_obligatoire')->default(false);
            $table->string('frequence_renouv')->nullable(); // remplacé enum par string
            $table->json('attributs_valeurs')->nullable();
            $table->date('date_publication')->nullable();
            $table->date('date_expiration')->nullable();
            $table->string('statut')->default('brouillon'); // non nullable, valeur par défaut
            $table->foreignId('created_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->unsignedBigInteger('external_quiz_template_id')->nullable(); // à adapter selon son lien réel
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
