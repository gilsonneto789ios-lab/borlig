import { Component } from '@angular/core';
import { SiteHeader } from '../../components/site-header/site-header';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SiteHeader],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
