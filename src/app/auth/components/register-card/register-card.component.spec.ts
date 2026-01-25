import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCardComponent } from './register-card.component';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder } from '@angular/forms';

describe('RegisterCardComponent', () => {
  let component: RegisterCardComponent;
  let fixture: ComponentFixture<RegisterCardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterCardComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize register form on init', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.controls['username']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['confirmedPassword']).toBeDefined();
  });

  it('should mark form invalid when passwords do not match', () => {
    component.registerForm.setValue({
      username: 'newUser',
      password: 'Valid1234',
      confirmedPassword: 'Mismatch123'
    });

    expect(component.registerForm.invalid).toBeTrue();
    component.register();
    expect(component.errorMessage).toBe('Passwords do not match.');
  });

  it('should show error when username already exists', () => {
    component.registerForm.setValue({
      username: 'existingUser',
      password: 'Valid1234',
      confirmedPassword: 'Valid1234'
    });

    mockAuthService.register.and.returnValue(false); // simulate already exists

    component.register();

    expect(component.errorMessage).toBe('Username already exists.');
  });

  it('should call auth service register with form values', () => {
    const userData = {
      username: 'newUser',
      password: 'Valid1234',
      confirmedPassword: 'Valid1234'
    };
    component.registerForm.setValue(userData);

    mockAuthService.register.and.returnValue(true);

    component.register();

    expect(mockAuthService.register).toHaveBeenCalledWith({
      username: 'newUser',
      password: 'Valid1234'
    });
  });

  it('should emit registered event on successful registration', () => {
    const userData = {
      username: 'newUser',
      password: 'Valid1234',
      confirmedPassword: 'Valid1234'
    };
    component.registerForm.setValue(userData);

    mockAuthService.register.and.returnValue(true);

    spyOn(component.registered, 'emit');

    component.register();

    expect(component.registered.emit).toHaveBeenCalled();
  });

  it('should reset form after successful registration', () => {
    const userData = {
      username: 'newUser',
      password: 'Valid1234',
      confirmedPassword: 'Valid1234'
    };
    component.registerForm.setValue(userData);

    mockAuthService.register.and.returnValue(true);

    component.register();

    expect(component.registerForm.value.username).toBeNull();
    expect(component.registerForm.value.password).toBeNull();
    expect(component.registerForm.value.confirmedPassword).toBeNull();
  });
});
