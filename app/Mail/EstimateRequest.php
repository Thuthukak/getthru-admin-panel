<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Estimate;

class EstimateRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $estimate;

    /**
     * Create a new message instance.
     */
    public function __construct(Estimate $estimate)
    {
        $this->estimate = $estimate;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->markdown('emails.estimates.request')
                    ->subject('Your Penda Graphics Estimate Request')
                    ->with([
                        'estimate' => $this->estimate,
                        'services' => $this->estimate->services()->with('service')->get()
                    ]);
    }
}