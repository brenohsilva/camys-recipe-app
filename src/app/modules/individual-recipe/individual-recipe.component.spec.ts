import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRecipeComponent } from './individual-recipe.component';

describe('IndividualRecipeComponent', () => {
  let component: IndividualRecipeComponent;
  let fixture: ComponentFixture<IndividualRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
