import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import { FileItem } from './models/file-item.model';
import {User} from '../auth/models/user.model';
import {HttpClient} from '@angular/common/http';
import {StoredData} from '../files-loading/models/StoredData.model';

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

  getStoredData(): StoredData {
    const stored = localStorage.getItem('storedData');
    return stored ? JSON.parse(stored) : { users: [], files: [], userFiles: {} };
  }

  saveStoredData(data: StoredData): void {
    localStorage.setItem('storedData', JSON.stringify(data));
  }

  addFile(newFile: FileItem) {
    const data = this.getStoredData();

    // Add file to files array
    data.files.push(newFile);

    // Add to userFiles map
    const fileKey = `${newFile.name}.${newFile.extension}`;
    if (!data.userFiles[newFile.createUser]) {
      data.userFiles[newFile.createUser] = [];
    }
    data.userFiles[newFile.createUser].push(fileKey);

    this.saveStoredData(data);
  }

  updateFile(updatedFile: FileItem) {
    const data = this.getStoredData();
    const fileKeyOld = `${updatedFile.name}.${updatedFile.extension}`;

    // Find existing file index
    const index = data.files.findIndex(
      f => f.name === updatedFile.name && f.extension === updatedFile.extension
    );

    if (index === -1) {
      console.error('File not found:', updatedFile);
      return;
    }

    // Update the file
    data.files[index] = updatedFile;

    // Update userFiles map if updateUser is different or name changed
    // Remove old key if file was renamed
    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] = data.userFiles[username].filter(f => f !== fileKeyOld);
    });

    const newKey = `${updatedFile.name}.${updatedFile.extension}`;
    if (!data.userFiles[updatedFile.createUser]) data.userFiles[updatedFile.createUser] = [];
    data.userFiles[updatedFile.createUser].push(newKey);

    this.saveStoredData(data);
  }
}
