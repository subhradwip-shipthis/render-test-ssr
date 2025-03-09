import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '[fadeSlide]',
  standalone: true,
})
export class FadeSlideDirective implements OnInit {
  @Input() duration = '0.5s';
  @Input() easing = 'ease-out';
  @Input() delay = '0s';
  @Input() translateY = '20px';

  private player: AnimationPlayer | null = null;

  constructor(private el: ElementRef, private builder: AnimationBuilder) {}

  ngOnInit(): void {
    console.log('here');
    const element = this.el.nativeElement;
    element.style.opacity = '0';
    element.style.transform = `translateY(${this.translateY})`;
    const animation = this.builder.build([
      style({ opacity: 0, transform: `translateY(${this.translateY})` }),
      animate(`${this.duration} ${this.delay} ${this.easing}`, style({ opacity: 1, transform: 'translateY(0)' })),
    ]);

    this.player = animation.create(element);
    this.player.play();
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }
}
