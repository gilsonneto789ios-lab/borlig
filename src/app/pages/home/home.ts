import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SiteHeader } from '../../components/site-header/site-header';
import { TranslatePage } from '../../directives/translate-page';

interface NetworkPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RouterLink, SiteHeader, TranslatePage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') networkCanvas?: ElementRef<HTMLCanvasElement>;

  menuAberto = false;
  cookiesVisiveis = true;
  private animationFrame = 0;
  private resizeObserver?: ResizeObserver;
  private points: NetworkPoint[] = [];
  private pointer = { x: -1000, y: -1000, active: false };
  private readonly reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    if (!this.networkCanvas || typeof window === 'undefined') return;

    const canvas = this.networkCanvas.nativeElement;
    const hero = canvas.parentElement;
    if (!hero) return;

    const updatePointer = (event: PointerEvent): void => {
      const rect = hero.getBoundingClientRect();
      this.pointer.x = event.clientX - rect.left;
      this.pointer.y = event.clientY - rect.top;
      this.pointer.active = true;
    };
    const resetPointer = (): void => { this.pointer.active = false; };

    hero.addEventListener('pointermove', updatePointer);
    hero.addEventListener('pointerleave', resetPointer);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas(canvas));
      this.resizeObserver.observe(hero);
    }
    this.resizeCanvas(canvas);

    this.zone.runOutsideAngular(() => {
      const render = (): void => {
        this.drawNetwork(canvas);
        if (!this.reduceMotion) this.animationFrame = requestAnimationFrame(render);
      };
      render();
    });

    canvas.addEventListener('network-destroy', () => {
      hero.removeEventListener('pointermove', updatePointer);
      hero.removeEventListener('pointerleave', resetPointer);
    }, { once: true });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.networkCanvas?.nativeElement.dispatchEvent(new Event('network-destroy'));
  }

  private resizeCanvas(canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    const amount = Math.max(30, Math.round(rect.width / 55));
    this.points = Array.from({ length: amount }, () => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      return { x, y, originX: x, originY: y, vx: 0, vy: 0, radius: Math.random() * 1.2 + 1 };
    });
  }

  private drawNetwork(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');
    if (!context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / ratio;
    const height = canvas.height / ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    for (const point of this.points) {
      const dx = point.x - this.pointer.x;
      const dy = point.y - this.pointer.y;
      const distance = Math.hypot(dx, dy);
      if (this.pointer.active && distance < 170 && distance > 0) {
        const force = (170 - distance) / 170;
        point.vx += (dx / distance) * force * 0.42;
        point.vy += (dy / distance) * force * 0.42;
      }
      point.vx += (point.originX - point.x) * 0.008;
      point.vy += (point.originY - point.y) * 0.008;
      point.vx *= 0.91;
      point.vy *= 0.91;
      point.x += point.vx;
      point.y += point.vy;
    }

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const pointerDistance = Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y);
      for (let j = i + 1; j < this.points.length; j++) {
        const other = this.points[j];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        const interactive = this.pointer.active && pointerDistance < 210;
        const limit = interactive ? 145 : 82;
        if (distance < limit) {
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = interactive
            ? `rgba(61, 113, 255, ${0.32 * (1 - distance / limit)})`
            : `rgba(104, 143, 255, ${0.13 * (1 - distance / limit)})`;
          context.lineWidth = interactive ? 1 : 0.65;
          context.stroke();
        }
      }
      const highlighted = this.pointer.active && pointerDistance < 170;
      context.beginPath();
      context.arc(point.x, point.y, highlighted ? point.radius * 1.8 : point.radius, 0, Math.PI * 2);
      context.fillStyle = highlighted ? 'rgba(38, 94, 255, .92)' : 'rgba(61, 113, 255, .62)';
      context.fill();
    }
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  aceitarCookies(): void {
    this.cookiesVisiveis = false;
  }

  rejeitarCookies(): void {
    this.cookiesVisiveis = false;
  }

}
