import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../../../services/hero.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddHeroComponent {
  heroForm: FormGroup;
  nextId: number = 22; // Define el ID inicial deseado

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private heroService: HeroService,
    private toastr: ToastrService
  ) {
    // Inicializar el formulario con el ID en estado deshabilitado
    this.heroForm = this.fb.group({
      id: [{ value: String(this.nextId), disabled: true }],// convertimos en cadena al Id por el server.
      superhero: ['', Validators.required],
      comic: [{ value: 'marvel-bop', disabled: true }], // Valor predeterminado para el cómic
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.setNextHeroId();
    this.applyUppercaseTransform();
  }
  private setNextHeroId(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      const highestId = Math.max(...heroes.map((hero) => Number(hero.id)));
      this.nextId = highestId + 1;
      this.heroForm.patchValue({ id: this.nextId });
    });
  }

  applyUppercaseTransform(): void {
    ['superhero', 'description'].forEach((field) => {
      // Excluye `comic`
      this.heroForm.get(field)?.valueChanges.subscribe((value) => {
        if (value && value !== value.toUpperCase()) {
          this.heroForm
            .get(field)
            ?.setValue(value.toUpperCase(), { emitEvent: false });
        }
      });
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      this.heroForm.get('comic')?.enable(); // habilitar comic temporalmente para enviar

      const heroData = { ...this.heroForm.getRawValue() };
      this.heroService.addHero(heroData).subscribe(
        () => {
          this.toastr.success('Héroe agregado exitosamente', 'Éxito');
          this.router.navigate(['/dashboard/list-heroes']);
        },
        (error) => {
          this.toastr.error('No se pudo agregar el héroe', 'Error');
        }
      );

      this.heroForm.get('comic')?.disable();
      this.setNextHeroId(); // Actualizar el próximo ID
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/list-heroes']); // Redirige a la ruta del dashboard
  }
}
