import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../services/language';

type ServiceCategory = 'software' | 'cloud' | 'security';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  readonly language = inject(LanguageService);
  menuAberto = false;
  servicosAbertos = false;
  categoriaAtiva: ServiceCategory = 'software';

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  alternarServicos(): void {
    this.servicosAbertos = !this.servicosAbertos;
  }

  selecionarCategoria(categoria: ServiceCategory): void {
    this.categoriaAtiva = categoria;
  }
}
