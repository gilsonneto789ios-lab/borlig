import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  menuAberto = false;
  mensagemEnviada = false;

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  enviarFormulario(): void {
    this.mensagemEnviada = true;
  }
}
