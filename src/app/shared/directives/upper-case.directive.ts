// src/app/shared/directives/upper-case.directive.ts
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const transformed = input.value.toUpperCase();
    this.ngControl.control?.setValue(transformed);
  }
}
