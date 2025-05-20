<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'destination',
        'contenu',
        'status',
        'read_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'read_at' => 'datetime',
    ];

    /**
     * Get the user that owns the notification.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the notification has been read.
     */
    public function isRead()
    {
        return $this->read_at !== null;
    }

    /**
     * Mark the notification as read.
     */
    public function markAsRead()
    {
        $this->read_at = now();
        $this->status = 'lue';
        $this->save();

        return $this;
    }

    /**
     * Mark the notification as sent.
     */
    public function markAsSent()
    {
        $this->status = 'envoyée';
        $this->save();

        return $this;
    }

    /**
     * Mark the notification as failed.
     */
    public function markAsFailed()
    {
        $this->status = 'échouée';
        $this->save();

        return $this;
    }

    /**
     * Get all unread notifications for a user.
     */
    public static function getUnreadForUser($userId)
    {
        return self::where('user_id', $userId)
            ->whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create and send an email notification.
     */
    public static function sendEmail($userId, $destination, $contenu)
    {
        $notification = self::create([
            'user_id' => $userId,
            'type' => 'email',
            'destination' => $destination,
            'contenu' => $contenu,
            'status' => 'en_attente'
        ]);

        // Ici, vous pourriez ajouter la logique pour envoyer réellement l'email
        // Par exemple, en utilisant le système de queues de Laravel

        return $notification;
    }

    /**
     * Create and send an SMS notification.
     */
    public static function sendSMS($userId, $destination, $contenu)
    {
        $notification = self::create([
            'user_id' => $userId,
            'type' => 'sms',
            'destination' => $destination,
            'contenu' => $contenu,
            'status' => 'en_attente'
        ]);

        // Ici, vous pourriez ajouter la logique pour envoyer réellement le SMS
        // Par exemple, en utilisant un service tiers comme Twilio

        return $notification;
    }

    /**
     * Create a system notification.
     */
    public static function createSystemNotification($userId, $contenu)
    {
        return self::create([
            'user_id' => $userId,
            'type' => 'système',
            'destination' => 'app',
            'contenu' => $contenu,
            'status' => 'envoyée'
        ]);
    }
}
