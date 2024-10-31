import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../../services/hero.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero } from '../../../models/hero.models';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
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
    this.heroForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Habilitar ID pero no editable
      superhero: [''], // Sin validación
      description: [''], // Sin validación
      comic: ['dc-bop'], // Valor predeterminado para el comic
    });
  }

  ngOnInit(): void {
    const heroData = localStorage.getItem('heroData');
    if (heroData) {
      const hero: Hero = JSON.parse(heroData);
      if (hero) this.heroForm.patchValue(hero);
    }
  }

  onSubmit(): void {
    // Aquí ya no se verifican validaciones
    const heroData = this.heroForm.getRawValue();
    this.heroService.updateHero(heroData).subscribe({
      next: () => {
        this.toastr.success('Héroe actualizado con éxito', 'Éxito');
        this.router.navigate(['dashboard/list-hero']);
      },
      error: (err) => {
        this.toastr.error('Error al actualizar el héroe: ' + err, 'Error');
      },
    });
  }

  cancelar() {
    this.router.navigate(['dashboard/lits-heroes']);
  }
}
