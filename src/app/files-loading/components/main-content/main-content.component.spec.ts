import { MainContentComponent } from './main-content.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileService } from '../../../../services/file.service';
import { FileSortService } from '../../../../services/file-sort.service';
import { of, Subject } from 'rxjs';
import { FileItem } from '../../../../models/file-item.model';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let mockFileService: jasmine.SpyObj<FileService>;
  let mockFileSortService: jasmine.SpyObj<FileSortService>;

  const mockFiles: FileItem[] = [
    {
      name: 'Test',
      extension: '.txt',
      size: 10,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      content: '',
      url: '',
      createUser: 'user',
      updateUser: 'user'
    }
  ];

  beforeEach(async () => {
    mockFileService = jasmine.createSpyObj(
      'FileService',
      [
        'getFiles',
        'getSharedFiles',
        'getCurrentViewMode',
        'getCurrentSearchQuery',
        'getSearchQuery'
      ],
      {
        viewModeObservable$: new Subject<void>(),
        fileChanged$: new Subject<void>()
      }
    );

    mockFileSortService = jasmine.createSpyObj(
      'FileSortService',
      ['getSortState'],
      {
        sortChanged$: new Subject<void>()
      }
    );

    mockFileService.getSearchQuery.and.returnValue(of(''));

    await TestBed.configureTestingModule({
      imports: [MainContentComponent],
      providers: [
        { provide: FileService, useValue: mockFileService },
        { provide: FileSortService, useValue: mockFileSortService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load files on init', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'user' }));

    mockFileService.getCurrentViewMode.and.returnValue('home');
    mockFileService.getCurrentSearchQuery.and.returnValue('');
    mockFileService.getFiles.and.returnValue(mockFiles);
    mockFileSortService.getSortState.and.returnValue({ key: 'title', direction: 'asc' });

    component.ngOnInit();

    expect(mockFileService.getFiles).toHaveBeenCalledWith('user');
    expect(component.files.length).toBe(1);
  });

  it('should clear files if no logged in user', () => {
    component.loadFiles();
    expect(component.files).toEqual([]);
  });

  it('should filter files by search query', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'user' }));

    mockFileService.getCurrentViewMode.and.returnValue('home');
    mockFileService.getCurrentSearchQuery.and.returnValue('test');
    mockFileService.getFiles.and.returnValue(mockFiles);
    mockFileSortService.getSortState.and.returnValue({ key: 'title', direction: 'asc' });

    component.loadFiles();

    expect(component.files.length).toBe(1);
  });

  it('should sort files based on sort state', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'user' }));

    mockFileService.getCurrentViewMode.and.returnValue('home');
    mockFileService.getCurrentSearchQuery.and.returnValue('');
    mockFileService.getFiles.and.returnValue(mockFiles);
    mockFileSortService.getSortState.and.returnValue({ key: 'size', direction: 'asc' });

    component.loadFiles();

    expect(component.files[0].name).toBe('Test');
  });

  it('should reload files when file is deleted', () => {
    spyOn(component, 'loadFiles');

    component.onFileDeleted();

    expect(component.loadFiles).toHaveBeenCalled();
  });
});
