import {FileCardComponent} from './file-card.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {FileService} from '../../services/file.service';

describe('FileCardComponent', () => {
  let component: FileCardComponent;
  let fixture: ComponentFixture<FileCardComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockDatePipe: jasmine.SpyObj<DatePipe>;
  let mockFileService: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);
    mockFileService = jasmine.createSpyObj('FileService', ['update', 'delete', 'notify']);

    await TestBed.configureTestingModule({
      imports: [FileCardComponent],
      providers: [
        { MatDialog, useValue: mockMatDialog },
        { DatePipe, useValue: mockDatePipe },
        { FileService, useValue: mockFileService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileCardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {});

  it('should detect image file extensions', () => {});

  it('should store file content on preview', () => {});

  it('should open update dialog', () => {});

  it('should call file service on delete', () => {});

  it('should emit delete event', () => {});

  it('should open share dialog', () => {});

  it('should open full preview dialog', () => {});

  it('should generate tooltip text correctly', () => {});
});
