import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMyRecipesComponent } from './empty-my-recipes.component';

describe('EmptyMyRecipesComponent', () => {
  let component: EmptyMyRecipesComponent;
  let fixture: ComponentFixture<EmptyMyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyMyRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyMyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
