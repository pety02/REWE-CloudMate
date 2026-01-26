import {CreateOrUpdateFileViewComponent} from './create-or-update-file-view.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileDialogData} from '../../models/file-dialog-data.model';
import {FileItem} from '../../models/file-item.model';

describe('CreateOrUpdateFileViewComponent', () => {
  let component: CreateOrUpdateFileViewComponent;
  let fixture: ComponentFixture<CreateOrUpdateFileViewComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateOrUpdateFileViewComponent>>;

  const mockFileItem: FileItem = {
    name: 'name',
    extension: '.pdf',
    content: 'content',
    size: 1400,
    url: 'https://mock.net',
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    createUser: 'user',
    updateUser: 'user'
  };

  const mockData: FileDialogData = {
    file: mockFileItem,
    mode: 'create'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateFileViewComponent], // standalone component
      providers: [
        FormBuilder, // real FormBuilder
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    expect(component.fileForm).toBeDefined();
  });

  it('should patch form values in edit mode', () => {
    component.data.mode = 'edit';
    component.ngOnInit();
    expect(component.fileForm.value.name).toBe(mockFileItem.name);
  });

  it('should close dialog with file data on submit', () => {
    component.fileForm.patchValue({ name: 'test' });
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog without data on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });
});
