import {FileItem} from './models/file-item.model';
import {StoredData} from '../files-loading/models/StoredData.model';
import {BehaviorSubject, firstValueFrom, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private searchQuery$ = new BehaviorSubject<string>('');
  private fileChanged = new Subject<void>();
  fileChanged$ = this.fileChanged.asObservable();

  private viewMode$ = new BehaviorSubject<'home' | 'shared'>('home');
  viewModeObservable$ = this.viewMode$.asObservable();

  notifyFileChanged() {
    this.fileChanged.next();
  }

  setViewMode(mode: 'home' | 'shared') {
    this.viewMode$.next(mode);
  }

  getCurrentViewMode(): 'home' | 'shared' {
    return this.viewMode$.getValue();
  }

  constructor(private http: HttpClient) {
    this.initializeFiles().then(f => f);
  }

  private async initializeFiles(): Promise<void> {
    const mockUsers = await firstValueFrom(
      this.http.get<StoredData>('/mock-files.json')
    );
    localStorage.setItem("storedData", JSON.stringify(mockUsers));
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

  getStoredData(): StoredData {
    const stored = localStorage.getItem('storedData');
    return stored ? JSON.parse(stored) : { users: [], files: [], userFiles: {} };
  }

  saveStoredData(data: StoredData): void {
    localStorage.setItem('storedData', JSON.stringify(data));
  }

  getFiles(username: string): FileItem[] {
    const data = this.getStoredData();
    const fileKeys = data.userFiles[username] || [];
    return data.files.filter(f => fileKeys.includes(`${f.name}.${f.extension}`));
  }

  getSharedFiles(username: string): FileItem[] {
    const data = this.getStoredData();
    const sharedKeys = data.sharedFiles?.[username] || [];
    return data.files.filter(f => sharedKeys.includes(`${f.name}.${f.extension}`));
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

    const index = data.files.findIndex(
      f => f.name === updatedFile.name && f.extension === updatedFile.extension
    );

    if (index === -1) {
      console.error('File not found:', updatedFile);
      return;
    }

    data.files[index] = updatedFile;

    // Update userFiles map
    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] = data.userFiles[username].filter(f => f !== fileKeyOld);
    });

    const newKey = `${updatedFile.name}.${updatedFile.extension}`;
    if (!data.userFiles[updatedFile.createUser]) data.userFiles[updatedFile.createUser] = [];
    data.userFiles[updatedFile.createUser].push(newKey);

    this.saveStoredData(data);
  }

  deleteFile(file: FileItem) {
    const data = this.getStoredData();
    const fileKey = `${file.name}.${file.extension}`;

    // Remove from files array
    data.files = data.files.filter(f => !(f.name === file.name && f.extension === file.extension));

    // Remove from userFiles map
    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] = data.userFiles[username].filter(f => f !== fileKey);
    });

    this.saveStoredData(data);
  }
}
