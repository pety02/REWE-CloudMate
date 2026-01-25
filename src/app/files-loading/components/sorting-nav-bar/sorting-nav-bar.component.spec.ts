import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingNavBarComponent } from './sorting-nav-bar.component';

describe('SortingNavBarComponent', () => {
  let component: SortingNavBarComponent;
  let fixture: ComponentFixture<SortingNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
