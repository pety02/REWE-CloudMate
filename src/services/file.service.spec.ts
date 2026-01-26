import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoredData } from '../models/stored-data.model';

describe('FileService', () => {
  let service: FileService;
  let httpMock: HttpTestingController;

  const mockData: StoredData = {
    users: [],
    files: [
      {
        name: 'file',
        extension: 'txt',
        content: '',
        size: 1,
        url: '',
        createDate: '',
        updateDate: '',
        createUser: 'john',
        updateUser: ''
      }
    ],
    userFiles: {
      john: ['file.txt']
    },
    sharedFiles: {
      jane: ['file.txt']
    }
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });

    service = TestBed.inject(FileService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne('/mock-files.json');
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty list for user files', () => {
    const files = service.getFiles('john');
    expect(files.length).toBe(0);
  });

  it('should return empty list for shared files', () => {
    const files = service.getSharedFiles('jane');
    expect(files.length).toBe(0);
  });

  it('should add new file', () => {
    service.addFile({
      name: 'new',
      extension: 'txt',
      content: '',
      size: 1,
      url: '',
      createDate: '',
      updateDate: '',
      createUser: 'john',
      updateUser: ''
    });

    const stored = service.getStoredData();
    expect(stored.files.length).toBe(1);
  });

  it('should delete file', () => {
    service.deleteFile({
      name: 'file',
      extension: 'txt'
    } as any);

    const stored = service.getStoredData();
    expect(stored.files.length).toBe(0);
  });

  it('should notify file changes', done => {
    service.fileChanged$.subscribe(() => {
      done();
    });

    service.notifyFileChanged();
  });

  it('should set and get view mode', () => {
    service.setViewMode('shared');
    expect(service.getCurrentViewMode()).toBe('shared');
  });

  it('should set and get search query', () => {
    service.setSearchQuery('TEST');
    expect(service.getCurrentSearchQuery()).toBe('test');
  });
});
