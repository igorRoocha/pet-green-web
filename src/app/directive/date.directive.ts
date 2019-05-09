import {Directive, ElementRef, Inject, HostListener} from '@angular/core';

@Directive({
  selector: '[dateCustom]'
})
export class DateDirective {

  constructor(@Inject(ElementRef) private el: ElementRef) {

  }

  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{2})?(\d{4})?/, '$1/$2/$3');
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

}
