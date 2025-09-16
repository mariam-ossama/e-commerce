import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight{
  private readonly el = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

 

  @HostListener('mouseenter')
  mouseEnter():void {
    this.renderer2.addClass(this.el.nativeElement,'text-shadow-[0_4px_4px_#9B7E5C]');
  }
  @HostListener('mouseleave')
  mouseLeave():void {
    this.renderer2.removeClass(this.el.nativeElement,'text-shadow-[0_4px_4px_#9B7E5C]');
  }
}
