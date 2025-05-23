<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::prefix('verification')->group(function () {
    Route::get('/', [VerificationController::class, 'index'])->name('verification');
    Route::post('/verify', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::get('/resend', [VerificationController::class, 'resend'])->name('verification.resend');
});