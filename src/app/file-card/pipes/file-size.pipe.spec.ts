import {FileSizePipe} from './file-size.pipe';

describe('FileSizePipe', () => {
  it('should return empty string for null', () => {
    expect(new FileSizePipe().transform(null)).toBe('');
  });

  it('should format bytes correctly', () => {
    expect(new FileSizePipe().transform(500)).toContain('B');
  });

  it('should format kilobytes correctly', () => {
    expect(new FileSizePipe().transform(1024)).toContain('KB');
  });

  it('should format megabytes correctly', () => {
    expect(new FileSizePipe().transform(1024 * 1024)).toContain('MB');
  });
});
