import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService, Hero } from '../../../services/hero.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
})
export class EditHeroComponent implements OnInit {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Crear el formulario y deshabilitar el campo 'id' para que no sea editable
    this.heroForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      superhero: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    const heroData = localStorage.getItem('heroData');
    if (heroData) {
      const hero: Hero = JSON.parse(heroData);

      // Verificar si los datos son correctos antes de rellenar el formulario
      if (hero && hero.id && hero.superhero && hero.description) {
        this.heroForm.patchValue(hero);
      } else {
        console.error(
          'Los datos del héroe están incompletos o son incorrectos:',
          hero
        );
      }
    }
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroData = this.heroForm.getRawValue(); // Obtener los valores, incluido el campo 'id' deshabilitado
      this.heroService.updateHero(heroData).subscribe({
        next: () => {
          this.toastr.success(
            'Héroe actualizado con éxito',
            'Actualización Exitosa'
          );
          this.router.navigate(['dashboard/list-hero'])
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el héroe: ' + err, 'Error');
        },
      });
    }
  }
}
