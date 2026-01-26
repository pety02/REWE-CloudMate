import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareFileComponent } from './share-file.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FileItem } from '../../models/file-item.model';

describe('ShareFileComponent', () => {
  let component: ShareFileComponent;
  let fixture: ComponentFixture<ShareFileComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ShareFileComponent>>;

  const mockFile: FileItem = {
    name: 'test',
    extension: 'txt',
    content: '',
    size: 0,
    url: '',
    createDate: '',
    updateDate: '',
    createUser: 'admin',
    updateUser: ''
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    localStorage.setItem(
      'files',
      JSON.stringify({
        users: [{ username: 'john' }],
        userFiles: {}
      })
    );

    await TestBed.configureTestingModule({
      imports: [ShareFileComponent, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockFile },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when username is empty', () => {
    component.usernameCtrl.setValue('');
    component.onSubmit();

    expect(component.shareForm.invalid).toBeTrue();
  });

  it('should show error when user does not exist', () => {
    component.usernameCtrl.setValue('unknown');
    component.onSubmit();

    expect(component.usernameCtrl.errors).toEqual({ userNotFound: true });
  });

  it('should update stored data when sharing file', () => {
    component.usernameCtrl.setValue('john');
    component.onSubmit();

    const stored = JSON.parse(localStorage.getItem('storedData')!);
    expect(stored.userFiles['john']).toContain('test.txt');
  });

  it('should close dialog after successful share', () => {
    component.usernameCtrl.setValue('john');
    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
