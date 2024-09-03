import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPreviewComponent } from './skeleton-preview.component';

describe('SkeletonPreviewComponent', () => {
  let component: SkeletonPreviewComponent;
  let fixture: ComponentFixture<SkeletonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
