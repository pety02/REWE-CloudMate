import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedFileFullPreviewComponent } from './opened-file-full-preview.component';

describe('OpenedFileFullPreviewComponent', () => {
  let component: OpenedFileFullPreviewComponent;
  let fixture: ComponentFixture<OpenedFileFullPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenedFileFullPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenedFileFullPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
