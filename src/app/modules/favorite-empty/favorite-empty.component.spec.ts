import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteEmptyComponent } from './favorite-empty.component';

describe('FavoriteEmptyComponent', () => {
  let component: FavoriteEmptyComponent;
  let fixture: ComponentFixture<FavoriteEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
