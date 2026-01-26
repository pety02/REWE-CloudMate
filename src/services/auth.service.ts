import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

/**
 * AuthService
 *
 * Manages user registration, login, and logout.
 * Persists users in localStorage and initializes mock users from JSON.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';

  constructor(private http: HttpClient) {
    this.initializeUsers().then(r => r);
  }

  /** Loads mock users from JSON and stores them in localStorage. */
  private async initializeUsers() {
    const mockUsers = await firstValueFrom(
      this.http.get<User[]>('/mock-users.json')
    );
    localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
  }

  /** Returns all registered users. */
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  /**
   * Registers a new user if the username is not taken.
   *
   * @param user User object to register
   * @returns true if registration succeeded, false if username exists
   */
  register(user: User): boolean {
    const users = this.getUsers();
    if (users.some(u => u.username === user.username)) return false;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  /**
   * Logs in a user by validating credentials.
   *
   * @param username
   * @param password
   * @returns true if login is successful
   */
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.username === username && u.password === password);
  }

  /**
   * Logs out the user and clears all related localStorage keys.
   *
   * @param router Angular Router for redirect
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
