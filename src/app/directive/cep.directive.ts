import {Directive, ElementRef, Inject, HostListener} from '@angular/core';

@Directive({
  selector: '[cep]'
})
export class CepDirective {

  constructor(@Inject(ElementRef) private el: ElementRef) {

  }

  @HostListener('keyup')
  onChange() {
    this.el.nativeElement.value = this.el.nativeElement.value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/,"$1-$2");
      //.replace(/^(\d{5})(\d{3})?/, '$1-$2');
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
