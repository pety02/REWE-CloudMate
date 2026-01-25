import {MainContentComponent} from './main-content.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FileService} from '../../../../services/file.service';
import {FileSortService} from '../../../../services/file-sort.service';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let mockFileService: jasmine.SpyObj<FileService>;
  let mockFileSortService: jasmine.SpyObj<FileSortService>;

  beforeEach(async () => {
    mockFileService = jasmine.createSpyObj('FileService', ['getSearchQuery', 'getCurrentViewMode',
      'getCurrentSearchQuery', 'getFiles', 'getSharedFiles']);
    mockFileSortService = jasmine.createSpyObj('FileSortService', ['getSortState']);

    await TestBed.configureTestingModule({
      imports: [MainContentComponent],
      providers: [
        { FileService, useValue: mockFileService },
        { FileSortService, useValue: mockFileSortService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {});

  it('should load files on init', () => {});

  it('should clear files if no logged in user', () => {});

  it('should filter files by search query', () => {});

  it('should sort files based on sort state', () => {});

  it('should reload files on file change notification', () => {});
});
