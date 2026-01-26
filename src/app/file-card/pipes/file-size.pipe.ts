import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 */
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  /**
   *
   * @param bytes
   */
  transform(bytes: number | null | undefined): string {
    if (bytes === null || bytes === undefined) {
      return '';
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
