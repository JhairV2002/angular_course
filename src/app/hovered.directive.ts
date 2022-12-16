import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHovered]',
})
export class HoveredDirective implements OnInit {
  // @Input() color: string = 'red';
  // conbine the input property with the directive name
  @Input() appHovered: string = 'red';

  constructor(private element: ElementRef, private renderer2: Renderer2) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.appHovered;
    // this.document.querySelector('')
  }

  // events

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer2.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer2.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.appHovered
    );
  }
}
