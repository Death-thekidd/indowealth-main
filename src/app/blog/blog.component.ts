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
import { SkeletonPreviewComponent } from '../skeleton-preview/skeleton-preview.component';
import { Meta, Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NgxPaginationModule,
    CommonModule,
    RouterModule,
    SkeletonPreviewComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
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
export class BlogComponent {
  @ViewChild('title') title!: ElementRef;

  blogs: any[] = [];
  page: number = 1;
  totalBlogs: number = 0;
  blogsPerPage: number = 4;
  isLoading = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanitizer: DomSanitizer,
    private sanityService: SanityService,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.getBlogs(this.page);
    this.titleService.setTitle('Blogs - Indowealth Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Read the latest news and updates from Indowealth Group on our blog.',
      },
      { name: 'keywords', content: 'blog, news, updates, Indowealth Group' },
    ]);
  }

  getBlogs(page: number) {
    this.sanityService
      .fetchPosts(page, this.blogsPerPage)
      .then((posts: any[]) => {
        this.blogs = posts.map((blog) => ({
          ...blog,
          bodyPreview: this.formatBlogBody(blog.body), // Format the body here
        }));
        this.isLoading = false;
        console.log(this.blogs);
      });
  }

  formatBlogBody(body: any, maxLength: number = 150): SafeHtml {
    if (!body || !body[0]?.children) return '';

    let formattedText = '';

    body[0].children.forEach((child: any) => {
      let childText = child.text || '';

      // Convert URLs to clickable links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      childText = childText.replace(
        urlRegex,
        '<a href="$&" target="_blank">$&</a>'
      );

      // Handle strong marks
      if (child.marks && child.marks.includes('strong')) {
        childText = `<strong>${childText}</strong>`;
      }

      formattedText += childText; // Append child text
    });

    // Replace newlines with <br />
    formattedText = formattedText.replace(/\n/g, '<br />');

    // Cut to maxLength and add ellipsis if needed
    if (formattedText.length > maxLength) {
      formattedText = formattedText.substring(0, maxLength) + '...';
    }

    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getBlogs(this.page);
  }
}
