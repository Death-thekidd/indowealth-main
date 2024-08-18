import {
  animate,
  AnimationBuilder,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  animations: [
    trigger('fadeInSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeInSlideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('fadeInSlideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class FooterComponent {
  @ViewChild('item1') item1!: ElementRef;
  @ViewChild('item2') item2!: ElementRef;
  @ViewChild('item3') item3!: ElementRef;
  @ViewChild('item4') item4!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder
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
            // Set visibility to visible before running the animation
            this.renderer.setStyle(target, 'visibility', 'visible');

            if (target === this.item1.nativeElement) {
              this.runAnimation(this.item1.nativeElement, 'fadeInSlideUp');
            } else if (target === this.item2.nativeElement) {
              this.runAnimation(this.item2.nativeElement, 'fadeInSlideUp');
            } else if (target === this.item3.nativeElement) {
              this.runAnimation(this.item3.nativeElement, 'fadeInSlideUp');
            } else if (target === this.item4.nativeElement) {
              this.runAnimation(this.item4.nativeElement, 'fadeInSlideUp');
            }
          } else {
            // Element is out of view: hide it
            this.renderer.setStyle(target, 'visibility', 'hidden');
          }
        });
      }, options);

      observer.observe(this.item1.nativeElement);
      observer.observe(this.item2.nativeElement);
      observer.observe(this.item3.nativeElement);
      observer.observe(this.item4.nativeElement);
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
}
