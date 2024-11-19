import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  AnimationBuilder,
} from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SanityService } from '../sanity.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '900ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
    trigger('fadeInSlideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
    trigger('fadeInSlideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('btn') button!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  @ViewChild('desc') desc!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  homeData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private sanityService: SanityService,
    private titleService: Title,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay the setup of IntersectionObserver
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

            if (target === this.title?.nativeElement) {
              this.runAnimation(this.title.nativeElement, 'fadeInSlideUp');
            } else if (target === this.button?.nativeElement) {
              this.runAnimation(this.button.nativeElement, 'fadeInSlideLeft');
            } else if (target === this.img?.nativeElement) {
              this.runAnimation(this.img.nativeElement, 'fadeInSlideUp');
            } else if (target === this.desc?.nativeElement) {
              this.runAnimation(this.desc.nativeElement, 'fadeInSlideRight');
            } else if (target === this.card?.nativeElement) {
              this.runAnimation(this.card.nativeElement, 'fadeInSlideUp');
            }
          } else {
            // Element is out of view: hide it
            this.renderer.setStyle(target, 'visibility', 'hidden');
          }
        });
      }, options);

      if (this.title) observer.observe(this.title.nativeElement);
      if (this.button) observer.observe(this.button.nativeElement);
      if (this.img) observer.observe(this.img.nativeElement);
      if (this.desc) observer.observe(this.desc.nativeElement);
      if (this.card) observer.observe(this.card.nativeElement);
    }
  }

  private runAnimation(element: any, animationName: string) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0, transform: this.getTransform(animationName) }),
      animate(
        '800ms ease-out',
        style({ opacity: 1, transform: 'translate(0, 0)' }),
      ),
    ]);

    const player = animation.create(element);
    player.play();
  }

  private getTransform(animationName: string): string {
    switch (animationName) {
      case 'fadeInSlideUp':
        return 'translateY(30px)';
      case 'fadeInSlideRight':
        return 'translateX(-30px)';
      case 'fadeInSlideLeft':
        return 'translateX(30px)';
      default:
        return 'none';
    }
  }

  ngOnInit(): void {
    // this.sanityService.getHomeData().subscribe((data) => {
    //   this.homeData = data;
    //   console.log(data);
    // });
    this.titleService.setTitle('Indowealth Group');
  }
}
