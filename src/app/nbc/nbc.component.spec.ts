import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbcComponent } from './nbc.component';

describe('NbcComponent', () => {
  let component: NbcComponent;
  let fixture: ComponentFixture<NbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
