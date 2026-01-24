import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingNavBar } from './sorting-nav-bar';

describe('SortingNavBar', () => {
  let component: SortingNavBar;
  let fixture: ComponentFixture<SortingNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
