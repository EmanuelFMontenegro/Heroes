// src/app/heroes/components/hero-form/hero-form.component.ts
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  isEditMode: boolean = false;
  heroId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      alias: [''],
      superpower: [''],
      universe: [''],
    });
  }

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.heroId) {
      this.isEditMode = true;
      this.heroService.getHeroById(this.heroId).subscribe((hero) => {
        if (hero) {
          this.heroForm.patchValue(hero);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const hero: Hero = this.heroForm.value;
      if (this.isEditMode && this.heroId !== null) {
        hero.id = this.heroId;
        this.heroService.updateHero(hero);
      } else {
        this.heroService.addHero(hero);
      }
      this.router.navigate(['/heroes']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/heroes']);
  }
}
