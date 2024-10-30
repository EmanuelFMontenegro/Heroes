import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../../../services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
  ],
})
export class AddHeroComponent implements OnInit {
  heroForm: FormGroup;
  images: string[] = [];
  availableImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private snackBar: MatSnackBar
  ) {
    this.heroForm = this.fb.group({
      id: ['', Validators.required],
      superhero: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.heroService.getAvailableImages().subscribe((images) => {
      this.availableImages = images;
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      this.heroService.addHero(this.heroForm.value).subscribe(() => {
        this.snackBar.open('Héroe agregado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.heroForm.reset();
      });
    }
  }
}
