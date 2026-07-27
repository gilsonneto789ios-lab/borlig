import { Component } from '@angular/core';
import { SiteHeader } from '../../components/site-header/site-header';
import { TranslatePage } from '../../directives/translate-page';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SiteHeader, TranslatePage],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
