import { FileCardComponent } from './file-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FileService } from '../../services/file.service';
import { of } from 'rxjs';
import { FileItem } from '../../models/file-item.model';

describe('FileCardComponent', () => {
  let component: FileCardComponent;
  let fixture: ComponentFixture<FileCardComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockDatePipe: jasmine.SpyObj<DatePipe>;
  let mockFileService: jasmine.SpyObj<FileService>;

  const mockFile: FileItem = {
    name: 'test',
    extension: 'png',
    content: 'file-content',
    size: 100,
    url: '',
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    createUser: 'user',
    updateUser: 'user'
  };

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);
    mockFileService = jasmine.createSpyObj('FileService', [
      'updateFile',
      'deleteFile',
      'notifyFileChanged'
    ]);

    mockDatePipe.transform.and.returnValue('Jan 1, 2025, 10:00 AM');

    await TestBed.configureTestingModule({
      imports: [FileCardComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: DatePipe, useValue: mockDatePipe },
        { provide: FileService, useValue: mockFileService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileCardComponent);
    component = fixture.componentInstance;
    component.file = mockFile;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should detect image file extensions', () => {
    expect(component.isImage('png')).toBeTrue();
    expect(component.isImage('pdf')).toBeFalse();
  });

  it('should store file content on preview', () => {
    component.onPreview(mockFile);
    expect(localStorage.getItem('currentFileContent')).toBe('file-content');
  });

  it('should open update dialog and update file', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'editor' }));

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ ...mockFile })
    } as any);

    component.onUpdate(mockFile);

    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(mockFileService.updateFile).toHaveBeenCalled();
    expect(mockFileService.notifyFileChanged).toHaveBeenCalled();
  });

  it('should delete file and emit event', () => {
    spyOn(component.delete, 'emit');

    component.onDelete(mockFile);

    expect(mockFileService.deleteFile).toHaveBeenCalledWith(mockFile);
    expect(mockFileService.notifyFileChanged).toHaveBeenCalled();
    expect(component.delete.emit).toHaveBeenCalledWith(mockFile);
  });

  it('should open share dialog', () => {
    component.onShare(mockFile);
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(localStorage.getItem('sharedFile')).toBeTruthy();
  });

  it('should open full preview dialog', () => {
    component.openFile(mockFile);
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(localStorage.getItem('openedFile')).toBeTruthy();
  });

  it('should generate tooltip text correctly', () => {
    const tooltip = component.tooltipText;
    expect(tooltip).toContain('Created');
    expect(tooltip).toContain('Updated');
  });
});
