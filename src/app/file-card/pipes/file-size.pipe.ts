import { Pipe, PipeTransform } from '@angular/core';

/**
 * FileSizePipe
 *
 * Transforms a numeric file size in bytes to a human-readable string (B, KB, MB).
 */
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  /**
   * Converts bytes to a string with appropriate units.
   *
   * @param bytes File size in bytes
   * @returns Formatted string (e.g., "1.2 MB")
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
