import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpenedFileFullPreviewComponent } from './opened-file-full-preview.component';
import { FileItem } from '../../models/file-item.model';

describe('OpenedFileFullPreviewComponent', () => {
  let component: OpenedFileFullPreviewComponent;
  let fixture: ComponentFixture<OpenedFileFullPreviewComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<OpenedFileFullPreviewComponent>>;

  const mockFile: FileItem = {
    name: 'test',
    extension: '.txt',
    content: 'content',
    size: 100,
    url: '',
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    createUser: 'user',
    updateUser: 'user'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [OpenedFileFullPreviewComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockFile }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenedFileFullPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on closeFile', () => {
    component.closeFile();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
