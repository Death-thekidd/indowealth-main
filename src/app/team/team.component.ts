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

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
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
export class TeamComponent {
  @ViewChild('title') title!: ElementRef;
  teams: any[] = [
    {
      name: 'William “Will” Adams',
      url: 'assets/team2.JPEG',
      body: 'William Adams is the CEO and a co-founder of the Indowealth Group. He has previous work experience in various fields including finance, consulting and academia prior to his foray into the cryptosphere. Given his passion for innovative finance solutions and fascination with the role of technology in continuously shaping more and more of that landscape, it is little wonder that he has now found himself at the forefront of introducing a unique world’s first token in IWT.',
    },
    {
      name: 'Scott “Benny” Burnham',
      url: 'assets/team3.JPEG',
      body: 'Scott Burnham is the CFO of the Indowealth Group. He has previous work experience in audit and finance, where he crossed paths with Will and found himself on a one-way trip into Indowealth Group. Despite his cautious and wary nature, he was convinced of the merits in creating a token that would allow for equal opportunity investments for investors of all categories into large-scale projects, and is now determined to ensure the success of IWT.',
    },
    {
      name: 'Sergei “Peter” Pavlovitch',
      url: 'assets/team5.JPEG',
      body: 'Sergei Pavlovitch is the COO of the Indowealth Group. Originally hailing from the city of St Petersburg, his previous work experience in sales and operations have allowed him to gain valuable insight from which the Indowealth Group benefits tremendously. A strict belief in utilitarian principles and unwavering desire to make a wider impact on the world around him has led down the path of joining forces with Will and Benny to create IWT and ensure its message is known far and wide.',
    },
    {
      name: 'Kyo',
      url: 'assets/team1.JPEG',
      body: 'Kyo is the General Manager of the Indowealth Group. Having worked and travelled throughout much of his younger days, he unsuspectingly stumbled into the Indowealth Group and has ended up as Head Minion to Will, Benny and Peter. Not one to outwardly express his thoughts, Kyo is nonetheless brimming with excitement to see IWT become a household name in the crypto verse.',
    },
    {
      name: 'Joshua “Josh” Joseph',
      url: 'assets/team4.JPEG',
      body: 'Joshua Joseph, commonly referred to as Josh, serves as the Head of Marketing Strategies at IndoWealth Group. With a self-taught mastery in digital marketing, Josh has intricately woven his innovative strategies into the fabric of IndoWealth’s operations, under the guidance of Kyo, the General Manager, and in close collaboration with Will, Benny, and Peter. His knack for capturing market trends has not only heightened the group’s visibility but has also harmonized with the team’s collective vision, propelling IndoWealth into new realms of the blockchain landscape.',
    },
  ];

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
