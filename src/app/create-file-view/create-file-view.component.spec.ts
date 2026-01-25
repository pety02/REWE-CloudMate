import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileViewComponent } from './create-file-view.component';

describe('CreateFileViewComponent', () => {
  let component: CreateFileViewComponent;
  let fixture: ComponentFixture<CreateFileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
