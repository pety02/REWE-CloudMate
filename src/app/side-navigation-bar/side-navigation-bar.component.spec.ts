import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationBarComponent } from './side-navigation-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '../../services/file.service';

describe('SideNavigationBarComponent', () => {
  let component: SideNavigationBarComponent;
  let fixture: ComponentFixture<SideNavigationBarComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    fileServiceSpy = jasmine.createSpyObj('FileService', [
      'addFile',
      'notifyFileChanged',
      'setViewMode'
    ]);

    await TestBed.configureTestingModule({
      imports: [SideNavigationBarComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: FileService, useValue: fileServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavigationBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to home view', () => {
    component.onHome();

    expect(fileServiceSpy.setViewMode).toHaveBeenCalledWith('home');
  });

  it('should switch to shared view', () => {
    component.onShared();

    expect(fileServiceSpy.setViewMode).toHaveBeenCalledWith('shared');
  });
});
