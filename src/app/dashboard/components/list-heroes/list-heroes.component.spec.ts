import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeroesComponent } from './list-heroes.component';

describe('ListHeroesComponent', () => {
  let component: ListHeroesComponent;
  let fixture: ComponentFixture<ListHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHeroesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
