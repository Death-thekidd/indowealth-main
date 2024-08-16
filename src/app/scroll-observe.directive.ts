import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[scrollObserve]',
})
export class ScrollObserveDirective implements OnInit {
  @Output() intersectionChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.intersectionChange.emit(entry.isIntersecting);
      });
    });

    observer.observe(this.el.nativeElement);
  }
}
