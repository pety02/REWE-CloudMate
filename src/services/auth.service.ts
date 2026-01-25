import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

/**
 *
 */
@Injectable({providedIn: 'root'})
export class AuthService {
  private storageKey = 'users';

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) {
    this.initializeUsers().then(r => r);
  }

  /**
   *
   * @private
   */
  private async initializeUsers() {
    const mockUsers = await firstValueFrom(
      this.http.get<User[]>('/mock-users.json')
    );
    localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
  }

  /**
   *
   */
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  /**
   *
   * @param user
   */
  register(user: User): boolean {
    const users = this.getUsers();

    if (users.some(u => u.username === user.username)) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  /**
   *
   * @param username
   * @param password
   */
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.username === username && u.password === password);
  }

  /**
   *
   * @param router
   */
  logout(router: Router) {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('currentFileContent');
    localStorage.removeItem('openedFile');
    localStorage.removeItem('sharedFile');
    localStorage.removeItem('sortedFiles');

    router.navigate(['']).then(p => p);
  }
}
