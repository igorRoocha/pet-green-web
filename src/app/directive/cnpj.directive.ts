import {Directive, ElementRef, Inject, HostListener} from '@angular/core';

@Directive({
  selector: '[cnpj]'
})
export class CnpjDirective {

  constructor(@Inject(ElementRef) private el: ElementRef) {

  }

  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/,"$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
      .replace(/\.(\d{3})(\d)/,".$1/$2")
      .replace(/(\d{4})(\d)/,"$1-$2");
  }

  // @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

}
