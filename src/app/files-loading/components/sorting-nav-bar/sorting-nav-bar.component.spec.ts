import { SortingNavBarComponent } from './sorting-nav-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSortService } from '../../../../services/file-sort.service';

describe('SortingNavBarComponent', () => {
  let component: SortingNavBarComponent;
  let fixture: ComponentFixture<SortingNavBarComponent>;
  let mockFileSortService: jasmine.SpyObj<FileSortService>;

  beforeEach(async () => {
    mockFileSortService = jasmine.createSpyObj('FileSortService', ['setSort']);

    await TestBed.configureTestingModule({
      imports: [SortingNavBarComponent],
      providers: [
        {provide: FileSortService, useValue: mockFileSortService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingNavBarComponent);
    component = fixture.componentInstance;
  });

  it('should reset direction when changing sort key', () => {});

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sort direction when clicking same sort key', () => {
    component.activeSort = 'title';
    component.sortDirection = 'asc';

    component.onSortClick('title');

    expect(component.sortDirection).toBe('desc');

    component.onSortClick('title');

    expect(component.sortDirection).toBe('asc');
  });

  it('should reset direction to asc when changing sort key', () => {
    component.activeSort = 'title';
    component.sortDirection = 'desc';

    component.onSortClick('size');

    expect(component.activeSort).toBe('size');
    expect(component.sortDirection).toBe('asc');
  });

  it('should call sort service on applySort', () => {
    component.activeSort = 'createdAt';
    component.sortDirection = 'desc';

    component.applySort();

    expect(mockFileSortService.setSort)
      .toHaveBeenCalledWith('createdAt', 'desc');
  });
});
