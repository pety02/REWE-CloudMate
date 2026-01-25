import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import { FileItem } from './models/file-item.model';
import {User} from '../auth/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private storageKey = 'files';
  private searchQuery$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {

  }

  setSearchQuery(query: string): void {
    this.searchQuery$.next(query.toLowerCase());
  }

  getSearchQuery() {
    return this.searchQuery$.asObservable();
  }

  getCurrentSearchQuery(): string {
    return this.searchQuery$.value;
  }

  public async initializeFiles() {
    const mockFiles = await firstValueFrom(
      this.http.get<User[]>('/mock-files.json')
    );
    localStorage.setItem(this.storageKey, JSON.stringify(mockFiles));
  }

  getFiles(username: string): FileItem[] {
    const data = JSON.parse(localStorage.getItem('files')!);
    const fileKeys = data.userFiles[username] || [];

    return data.files.filter((f: any) =>
      fileKeys.includes(`${f.name}.${f.extension}`)
    );
  }
}
