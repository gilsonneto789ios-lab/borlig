import { Component } from '@angular/core';
import { SiteHeader } from '../../components/site-header/site-header';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SiteHeader],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  mensagemEnviada = false;

  enviarFormulario(): void {
    this.mensagemEnviada = true;
  }
}
