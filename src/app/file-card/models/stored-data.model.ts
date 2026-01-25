import {FileItem} from './file-item.model';

export interface StoredData {
  users: { username: string; password: string }[];
  files: FileItem[];
  userFiles: { [username: string]: string[] };
  sharedFiles?: { [username: string]: string[] };
}
