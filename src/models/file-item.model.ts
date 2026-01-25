export interface FileItem {
  name: string;
  extension: string;
  content?: string;
  size: number;
  url?: string;
  createDate: string;
  updateDate?: string;
  createUser: string;
  updateUser?: string;
}
