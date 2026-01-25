import { LoginCardComponent } from './login-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginCardComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [LoginCardComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form on init', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should show error when form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });
    component.login();
    expect(component.errorMessage).toBe('Please fix the errors in the form.');
  });

  it('should call auth service login with form values', () => {
    const userData = { username: 'alice42', password: 'Password1' };
    component.loginForm.setValue(userData);
    mockAuthService.login.and.returnValue(true);

    component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith('alice42', 'Password1');
  });

  it('should show error message on invalid credentials', () => {
    const userData = { username: 'wrong', password: 'wrong' };
    component.loginForm.setValue(userData);
    mockAuthService.login.and.returnValue(false);

    component.login();

    expect(component.errorMessage).toBe('Please fix the errors in the form.');
  });

  it('should store logged in user on successful login', () => {
    const userData = { username: 'alice42', password: 'Password1' };
    component.loginForm.setValue(userData);
    mockAuthService.login.and.returnValue(true);

    component.login();

    const storedUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    expect(storedUser.username).toBe('alice42');
  });

  it('should navigate to home on successful login', () => {
    const userData = { username: 'alice42', password: 'Password1' };
    component.loginForm.setValue(userData);
    mockAuthService.login.and.returnValue(true);

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should reset form after successful login', () => {
    const userData = { username: 'alice42', password: 'Password1' };
    component.loginForm.setValue(userData);
    mockAuthService.login.and.returnValue(true);

    component.login();

    expect(component.loginForm.value.username).toBeNull();
    expect(component.loginForm.value.password).toBeNull();
  });
});
