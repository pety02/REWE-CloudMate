import { FileItem } from '../models/file-item.model';
import { StoredData } from '../models/stored-data.model';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * FileService
 *
 * Manages all file-related operations:
 * - CRUD operations for files
 * - User-specific and shared file access
 * - Search query management
 * - View mode management ('home' or 'shared')
 */
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private searchQuery$ = new BehaviorSubject<string>('');
  private fileChanged = new Subject<void>();
  fileChanged$ = this.fileChanged.asObservable();

  private viewMode$ = new BehaviorSubject<'home' | 'shared'>('home');
  viewModeObservable$ = this.viewMode$.asObservable();

  constructor(private http: HttpClient) {
    this.initializeFiles().then(f => f);
  }

  /** Notify subscribers that a file has changed (added, updated, deleted). */
  notifyFileChanged() {
    this.fileChanged.next();
  }

  /** Sets the current view mode: 'home' or 'shared'. */
  setViewMode(mode: 'home' | 'shared') {
    this.viewMode$.next(mode);
  }

  /** Returns the current view mode. */
  getCurrentViewMode(): 'home' | 'shared' {
    return this.viewMode$.getValue();
  }

  /** Loads initial files from mock JSON into localStorage. */
  private async initializeFiles(): Promise<void> {
    const mockUsers = await firstValueFrom(
      this.http.get<StoredData>('/mock-files.json')
    );
    localStorage.setItem('storedData', JSON.stringify(mockUsers));
  }

  /** Sets the current search query (lowercased). */
  setSearchQuery(query: string): void {
    this.searchQuery$.next(query.toLowerCase());
  }

  /** Returns the search query as an observable. */
  getSearchQuery() {
    return this.searchQuery$.asObservable();
  }

  /** Returns the current search query value. */
  getCurrentSearchQuery(): string {
    return this.searchQuery$.value;
  }

  /** Returns all stored data (users, files, userFiles map). */
  getStoredData(): StoredData {
    const stored = localStorage.getItem('storedData');
    return stored ? JSON.parse(stored) : { users: [], files: [], userFiles: {} };
  }

  /** Persists the stored data object to localStorage. */
  saveStoredData(data: StoredData): void {
    localStorage.setItem('storedData', JSON.stringify(data));
  }

  /** Returns all files belonging to a specific user. */
  getFiles(username: string): FileItem[] {
    const data = this.getStoredData();
    const fileKeys = data.userFiles[username] || [];
    return data.files.filter(f => fileKeys.includes(`${f.name}.${f.extension}`));
  }

  /** Returns all shared files accessible to a specific user. */
  getSharedFiles(username: string): FileItem[] {
    const data = this.getStoredData();
    const sharedKeys = data.sharedFiles?.[username] || [];
    return data.files.filter(f => sharedKeys.includes(`${f.name}.${f.extension}`));
  }

  /** Adds a new file for a user and updates localStorage. */
  addFile(newFile: FileItem) {
    const data = this.getStoredData();
    data.files.push(newFile);

    const fileKey = `${newFile.name}.${newFile.extension}`;
    if (!data.userFiles[newFile.createUser]) data.userFiles[newFile.createUser] = [];
    data.userFiles[newFile.createUser].push(fileKey);

    this.saveStoredData(data);
  }

  /** Updates an existing file and its references in userFiles map. */
  updateFile(updatedFile: FileItem) {
    const data = this.getStoredData();
    const index = data.files.findIndex(
      f => f.name === updatedFile.name && f.extension === updatedFile.extension
    );
    if (index === -1) return;

    data.files[index] = updatedFile;

    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] = data.userFiles[username].filter(
        f => f !== `${updatedFile.name}.${updatedFile.extension}`
      );
    });

    if (!data.userFiles[updatedFile.createUser]) data.userFiles[updatedFile.createUser] = [];
    data.userFiles[updatedFile.createUser].push(`${updatedFile.name}.${updatedFile.extension}`);

    this.saveStoredData(data);
  }

  /** Deletes a file and removes its references from userFiles. */
  deleteFile(file: FileItem) {
    const data = this.getStoredData();
    const fileKey = `${file.name}.${file.extension}`;
    data.files = data.files.filter(f => !(f.name === file.name && f.extension === file.extension));

    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] = data.userFiles[username].filter(f => f !== fileKey);
    });

    this.saveStoredData(data);
  }
}
