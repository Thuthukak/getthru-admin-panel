<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'profile_picture',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

      /**
     * Get the profile picture URL attribute
     */
    public function getProfilePictureUrlAttribute(): ?string
    {
        return $this->profile_picture ? asset('storage/' . $this->profile_picture) : null;
    }

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        // Delete profile picture when user is deleted
        static::deleting(function ($user) {
            if ($user->profile_picture && \Storage::disk('public')->exists($user->profile_picture)) {
                \Storage::disk('public')->delete($user->profile_picture);
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
