import { Injectable, signal } from '@angular/core';

export type Language = 'pt' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Language>(this.initialLanguage());

  toggle(): void {
    const language: Language = this.current() === 'pt' ? 'en' : 'pt';
    this.current.set(language);
    if (typeof localStorage !== 'undefined') localStorage.setItem('borlig-language', language);
    if (typeof document !== 'undefined') document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }

  private initialLanguage(): Language {
    if (typeof localStorage === 'undefined') return 'pt';
    return localStorage.getItem('borlig-language') === 'en' ? 'en' : 'pt';
  }
}
