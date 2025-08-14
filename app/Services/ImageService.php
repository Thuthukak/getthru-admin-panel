<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * Process and store profile picture
     */
    public function storeProfilePicture(UploadedFile $file, int $userId): string
    {
        $filename = $this->generateUniqueFilename($userId, $file->getClientOriginalExtension());
        $path = 'profile-pictures/' . $filename;

        // Create different sizes
        $sizes = [
            'thumbnail' => 150,
            'medium' => 300,
            'large' => 400,
        ];

        foreach ($sizes as $size => $dimension) {
            $processedImage = Image::make($file)
                ->fit($dimension, $dimension, function ($constraint) {
                    $constraint->upsize();
                })
                ->encode('jpg', 85);

            $sizePath = "profile-pictures/{$size}/" . $filename;
            Storage::disk('public')->put($sizePath, $processedImage->stream());
        }

        return $path;
    }

    /**
     * Delete profile picture and all its sizes
     */
    public function deleteProfilePicture(string $path): void
    {
        $filename = basename($path);
        $sizes = ['thumbnail', 'medium', 'large'];

        // Delete original
        Storage::disk('public')->delete($path);

        // Delete different sizes
        foreach ($sizes as $size) {
            Storage::disk('public')->delete("profile-pictures/{$size}/" . $filename);
        }
    }

    /**
     * Generate unique filename
     */
    private function generateUniqueFilename(int $userId, string $extension): string
    {
        return $userId . '_' . time() . '_' . Str::random(10) . '.jpg';
    }
}