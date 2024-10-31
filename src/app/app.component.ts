import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'super-heroes-manager';
  loading$; // Declarar la propiedad sin inicializarla aquí

  constructor(private spinnerService: SpinnerService) {
    this.loading$ = this.spinnerService.loading$; // Inicializar aquí
  }
}
