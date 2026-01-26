import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value after debounce', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.searchCtrl.setValue('test');
    tick(1000);

    expect(component.search.emit).toHaveBeenCalledWith('test');
  }));

  it('should trim emitted search value', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.searchCtrl.setValue('   test   ');
    tick(1000);

    expect(component.search.emit).toHaveBeenCalledWith('test');
  }));

  it('should emit empty string for null input', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.searchCtrl.setValue(null);
    tick(1000);

    expect(component.search.emit).toHaveBeenCalledWith('');
  }));
});
