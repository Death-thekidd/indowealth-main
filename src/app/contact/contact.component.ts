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
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
  ],
})
export class ContactComponent {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us - Indowealth Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Get in touch with Indowealth Group for inquiries and support.',
      },
      {
        name: 'keywords',
        content: 'contact, support, inquiries, Indowealth Group',
      },
    ]);
  }

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
}
