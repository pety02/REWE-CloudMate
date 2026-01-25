import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {User} from './models/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private storageKey = 'users';

  constructor(private http: HttpClient) {
    this.initializeUsers().then(r => r);
  }

  private async initializeUsers() {
    const mockUsers = await firstValueFrom(
      this.http.get<User[]>('/mock-users.json')
    );
    localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  register(user: User): boolean {
    const users = this.getUsers();

    if (users.some(u => u.username === user.username)) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.username === username && u.password === password);
  }
}
