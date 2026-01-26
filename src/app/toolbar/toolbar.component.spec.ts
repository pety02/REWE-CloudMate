import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { FileService } from '../../services/file.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['setSearchQuery']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: [
        { provide: FileService, useValue: fileServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should forward search query to file service', () => {
    component.onSearch('query');

    expect(fileServiceSpy.setSearchQuery).toHaveBeenCalledWith('query');
  });

  it('should clear localStorage on logout', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalledWith(routerSpy);
  });

  it('should navigate to auth page on logout', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
