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
import { NgxPaginationModule } from 'ngx-pagination';
import { SanityService } from '../sanity.service';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
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
export class DocumentComponent {
  @ViewChild('title') title!: ElementRef;
  documents: any[] = [
    {
      title:
        'Memorandum between              PT Synergy Tharada and Indowealth Group',
      name: 'memo1',
    },
    {
      title:
        'Memorandum between PT Synery Tharada and China Communications Construction Company',
      name: 'memo2',
    },
    {
      title:
        'Letter of Approval for NBC Land jointly issued by Ministry of Investments and Ministry of Marine Affairs & Fisheries',
      name: 'Letter',
    },
    {
      title:
        'Ministry of Transportation Approval Letter to PT Synergy Tharada for Land Survey Work',
      name: 'ministry',
    },
    {
      title: 'NBC Land Project Presentation',
      name: 'nbc1',
    },
    { title: 'NBC Land Architectural Blueprint & Design', name: 'nbc2' },
    { title: 'Master Schedule              NBC Land', name: 'master' },
    { title: 'NBC Land Reclamatiion Concept Design', name: 'nbc3' },
    {
      title:
        'China Communications Construction Company Limited (CCCC) Presentation',
      name: 'China',
    },
    { title: 'WDS Architecture Firm Presentation', name: 'wds' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Blogs - Indowealth Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Access comprehensive documentation and user guides for Indowealth Group services.',
      },
      { name: 'keywords', content: 'documentation, user guides, resources' },
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
            }
          } else {
            // Element is out of view: hide it
            this.renderer.setStyle(target, 'visibility', 'hidden');
          }
        });
      }, options);

      observer.observe(this.title.nativeElement);
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
