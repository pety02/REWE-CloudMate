import {FileItem} from './file-item.model';

export interface FileDialogData {
  file: FileItem;
  mode: 'create' | 'edit';
}
