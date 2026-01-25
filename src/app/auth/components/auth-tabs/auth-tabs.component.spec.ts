import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthTabsComponent } from './auth-tabs.component';
import { AuthService } from '../../../../services/auth.service';

describe('AuthTabsComponent', () => {
  let component: AuthTabsComponent;
  let fixture: ComponentFixture<AuthTabsComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [AuthTabsComponent], // Standalone component
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthTabsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have login tab selected by default', () => {
    expect(component.selectedTabIndex).toBe(0);
  });

  it('should switch to login tab when goToLogin is called', () => {
    component.selectedTabIndex = 1; // simulate register tab active
    component.goToLogin();
    expect(component.selectedTabIndex).toBe(0);
  });

  it('should initialize users in localStorage if not present', () => {
    const usersMock = [{ username: 'user1', password: 'pass1' }];
    mockAuthService.getUsers.and.returnValue(usersMock);

    expect(localStorage.getItem('users')).toBeNull();

    component.initializeUsers();

    const stored = JSON.parse(localStorage.getItem('users')!);
    expect(stored).toEqual(usersMock);
    expect(mockAuthService.getUsers).toHaveBeenCalled();
  });

  it('should not overwrite users if already in localStorage', () => {
    const existingUsers = [{ username: 'existing', password: '1234' }];
    localStorage.setItem('users', JSON.stringify(existingUsers));

    const newUsers = [{ username: 'newUser', password: 'abcd' }];
    mockAuthService.getUsers.and.returnValue(newUsers);

    component.initializeUsers();

    const stored = JSON.parse(localStorage.getItem('users')!);
    expect(stored).toEqual(existingUsers); // should remain unchanged
    expect(mockAuthService.getUsers).not.toHaveBeenCalled();
  });
});
