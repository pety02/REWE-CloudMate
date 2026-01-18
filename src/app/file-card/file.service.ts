import { Injectable } from '@angular/core';
import {firstValueFrom, Observable, of} from 'rxjs';
import { FileItem } from './models/file-item.model';
import {User} from '../auth/models/user.model';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private storageKey = 'files';

  constructor(private http: HttpClient) {
    this.initializeFiles();
  }

  private async initializeFiles() {
    const files = localStorage.getItem(this.storageKey);
    if (!files) {
      const mockFiles = await firstValueFrom(
        this.http.get<User[]>('/mock-files.json')
      );
      localStorage.setItem(this.storageKey, JSON.stringify(mockFiles));
    }
  }

  getFiles(): FileItem[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
