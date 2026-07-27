import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home').then((component) => component.Home),
    title: 'Borlig',
  },
  {
    path: 'servicos/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail').then((component) => component.ServiceDetail),
    title: 'Serviços | Borlig',
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/about/about').then((component) => component.About),
    title: 'Sobre | Borlig',
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./pages/contact/contact').then((component) => component.Contact),
    title: 'Contato | Borlig',
  },
  {
    path: 'inicio',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
