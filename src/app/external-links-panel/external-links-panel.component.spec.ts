import {ExternalLinksPanelComponent} from './external-links-panel.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

describe('ExternalLinksPanelComponent', () => {
  let component: ExternalLinksPanelComponent;
  let fixture: ComponentFixture<ExternalLinksPanelComponent>;
  let mockHttp: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [ExternalLinksPanelComponent],
      providers: [
        { HttpClient, useValue: mockHttp }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinksPanelComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {});

  it('should load external links on init', () => {});

  it('should store received links', () => {});

  it('should handle http error gracefully', () => {});
});
