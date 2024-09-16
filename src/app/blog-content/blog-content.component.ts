import {
  animate,
  AnimationBuilder,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SanityService } from '../sanity.service';
import { SkeletonPreviewComponent } from '../skeleton-preview/skeleton-preview.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, SkeletonPreviewComponent],
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
export class BlogContentComponent implements OnInit, AfterViewInit {
  @ViewChild('title') title!: ElementRef;

  blog: any;
  isLoading = true;
  sanitizedText!: SafeHtml;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.sanityService.getPostBySlug(slug as string).subscribe((data) => {
      this.blog = data;
      this.sanitizeBlogText();
      this.isLoading = false;
    });
  }

  sanitizeBlogText() {
    const bodyContent = this.blog?.body || [];
    let formattedText = '';

    bodyContent.forEach((block: any) => {
      if (block.children) {
        block.children.forEach((child: any) => {
          // Handle links
          let childText = child.text;

          // Convert URLs to clickable links
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          childText = childText.replace(
            urlRegex,
            '<a href="$&" target="_blank">$&</a>'
          );

          // Check for strong mark
          if (child.marks && child.marks.includes('strong')) {
            childText = `<strong class="bold">${childText}</strong>`;
          }

          formattedText += childText; // Append child text
        });
      }
    });

    // Replace all newline characters with <br />
    formattedText = formattedText.replace(/\n/g, '<br />');

    this.sanitizedText = this.sanitizer.bypassSecurityTrustHtml(formattedText);
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
