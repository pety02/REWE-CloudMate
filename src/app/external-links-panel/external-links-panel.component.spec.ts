import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinksPanelComponent } from './external-links-panel.component';

describe('ExternalLinksPanelComponent', () => {
  let component: ExternalLinksPanelComponent;
  let fixture: ComponentFixture<ExternalLinksPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinksPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalLinksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
