import { Directive, ElementRef, Inject, HostListener } from '@angular/core';

@Directive({
    selector: '[cpf-cnpj]'
})
export class CpfCnpjDirective {

    constructor(@Inject(ElementRef) private el: ElementRef) {
    }

    @HostListener('keyup') onKeyUp() {
        if (this.el.nativeElement.value.length <= 14) {
            this.el.nativeElement.value = this.el.nativeElement.value
                .replace(/\D/g,'')
                .replace(/(\d{3})(\d)/,"$1.$2")
                .replace(/(\d{3})(\d)/,"$1.$2")
                .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
                //.replace(/^(\d{3}\.?)(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4');
        } else {
            this.el.nativeElement.value = this.el.nativeElement.value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/,"$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
                .replace(/\.(\d{3})(\d)/,".$1/$2")
                .replace(/(\d{4})(\d)/,"$1-$2");
                //.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5');
        }
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