import {FilePreviewComponent} from './file-preview.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('FilePreviewComponent', () => {
  let component: FilePreviewComponent;
  let fixture: ComponentFixture<FilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePreviewComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(FilePreviewComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {});

  it('should return file content from localStorage', () => {});

  it('should return empty string when no content exists', () => {});
});
