<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Usuario;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;

    /**
     * Create a new message instance.
     */
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }
    public function build(){
        return $this->subject('Verifica tu cuenta')
                    ->text('emails.verify_plain')
                    ->with([
                        'nombre' => $this->usuario->nombre,
                        'token' => $this->usuario->token_verificacion,
                    ]);
    }
}
