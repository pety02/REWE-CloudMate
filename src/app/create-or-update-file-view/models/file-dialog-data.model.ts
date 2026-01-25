import {FileItem} from '../../file-card/models/file-item.model';

export interface FileDialogData {
  file: FileItem;
  mode: 'create' | 'edit';
}
