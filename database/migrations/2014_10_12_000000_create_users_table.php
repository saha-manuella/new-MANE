<?php

use App\Enums\NotificationPreferenceEnum;
use App\Enums\OtpMethodEnum;
use App\Enums\TypeCompteEnum;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->string('code_client')->unique();
            $table->string('cle');
            $table->string('gestionnaire')->nullable();
            $table->enum('type_compte', TypeCompteEnum::values())->nullable();
            $table->boolean('otp_enabled')->default(true); // Activé par défaut car c'est la seule méthode d'authentification
            $table->enum('otp_method', OtpMethodEnum::values())->default(OtpMethodEnum::EMAIL->value);
            $table->text('otp_secret')->nullable();
            $table->timestamp('last_otp_sent')->nullable();
            $table->integer('failed_otp_attempts')->default(0);
            $table->json('otp_history')->nullable();
            $table->enum('notification_preference', NotificationPreferenceEnum::values())->default(NotificationPreferenceEnum::EMAIL->value);
            $table->integer('max_failed_otp_attempts')->default(5); // Nombre maximal de tentatives échouées avant verrouillage
            $table->timestamp('otp_locked_until')->nullable(); // Timestamp jusqu'à quand l'OTP est verrouillé
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
