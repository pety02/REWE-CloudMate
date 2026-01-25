import {FileItem} from '../../file-card/models/file-item.model';

export interface StoredData {
  users: { username: string; password: string }[];
  files: FileItem[];
  userFiles: { [username: string]: string[] };
}
