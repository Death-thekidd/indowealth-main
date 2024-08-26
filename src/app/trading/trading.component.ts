import {
  animate,
  AnimationBuilder,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SanityService } from '../sanity.service';

@Component({
  selector: 'app-trading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trading.component.html',
  styleUrl: './trading.component.scss',
  animations: [
    trigger('fadeInSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate(
          '2s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class TradingComponent {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  tradingData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            this.renderer.setStyle(target, 'visibility', 'visible');
            if (target === this.title.nativeElement) {
              this.runAnimation(this.title.nativeElement, 'fadeInSlideUp');
            } else if (target === this.card.nativeElement) {
              this.runAnimation(this.card.nativeElement, 'fadeInSlideUp');
            }
          } else {
            // Element is out of view: hide it
            this.renderer.setStyle(target, 'visibility', 'hidden');
          }
        });
      }, options);

      observer.observe(this.title.nativeElement);
      observer.observe(this.card.nativeElement);
    }
  }

  private runAnimation(element: any, animationName: string) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0, transform: this.getTransform(animationName) }),
      animate(
        '800ms ease-out',
        style({ opacity: 1, transform: 'translate(0, 0)' })
      ),
    ]);

    const player = animation.create(element);
    player.play();
  }

  private getTransform(animationName: string): string {
    switch (animationName) {
      case 'fadeInSlideUp':
        return 'translateY(30px)';
      default:
        return 'none';
    }
  }

  ngOnInit(): void {
    this.sanityService.getTradingData().subscribe((data) => {
      this.tradingData = data;
      console.log(data);
    });
  }
}
