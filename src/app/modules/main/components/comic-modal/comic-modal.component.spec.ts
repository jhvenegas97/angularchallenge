import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicModalComponent } from './comic-modal.component';

describe('ComicModalComponent', () => {
  let component: ComicModalComponent;
  let fixture: ComponentFixture<ComicModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComicModalComponent]
    });
    fixture = TestBed.createComponent(ComicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
