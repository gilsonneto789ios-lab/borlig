import { Component } from '@angular/core';
import { SiteHeader } from '../../components/site-header/site-header';
import { TranslatePage } from '../../directives/translate-page';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SiteHeader, TranslatePage],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  mensagemEnviada = false;

  enviarFormulario(): void {
    this.mensagemEnviada = true;
  }
}
