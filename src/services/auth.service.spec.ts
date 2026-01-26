import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUsers = [
    { username: 'u', password: 'P1assword' }
  ];

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne('/mock-users.json');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register new user', () => {
    const result = service.register({ username: 'new', password: 'Pass123' });
    expect(result).toBeTrue();
  });

  it('should fail login with invalid credentials', () => {
    expect(service.login('x', 'y')).toBeFalse();
  });
});
