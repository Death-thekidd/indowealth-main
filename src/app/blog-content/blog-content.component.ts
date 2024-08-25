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

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './blog-content.component.html',
  styleUrl: './blog-content.component.scss',
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
export class BlogContentComponent {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  blogs: any[] = [];
  page: number = 1;
  totalBlogs: number = 0;
  blogsPerPage: number = 4;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService
  ) {}

  ngOnInit(): void {
    this.getTotalBlogs();
    this.getBlogs(this.page);
  }

  getTotalBlogs() {
    this.sanityService.fetchTotalPostsCount().then((count: number) => {
      this.totalBlogs = count;
    });
  }

  getBlogs(page: number) {
    this.sanityService
      .fetchPosts(page, this.blogsPerPage)
      .then((posts: any[]) => {
        this.blogs = posts;
      });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getBlogs(this.page);
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
      // observer.observe(this.card.nativeElement);
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
