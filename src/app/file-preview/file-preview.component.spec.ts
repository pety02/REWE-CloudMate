import { FilePreviewComponent } from './file-preview.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FilePreviewComponent', () => {
  let component: FilePreviewComponent;
  let fixture: ComponentFixture<FilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return file content from localStorage', () => {
    localStorage.setItem('currentFileContent', 'data');

    const result = component.updateContent();

    expect(result).toBe('data');
  });

  it('should return empty string when no content exists', () => {
    const result = component.updateContent();

    expect(result).toBe('');
  });
});
