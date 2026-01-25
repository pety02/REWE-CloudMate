import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateFileViewComponent } from './create-or-update-file-view.component';

describe('CreateOrUpdateFileViewComponent', () => {
  let component: CreateOrUpdateFileViewComponent;
  let fixture: ComponentFixture<CreateOrUpdateFileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateFileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
