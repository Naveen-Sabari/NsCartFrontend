import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCarouselConfigComponent } from './demo-carousel-config.component';

describe('DemoCarouselConfigComponent', () => {
  let component: DemoCarouselConfigComponent;
  let fixture: ComponentFixture<DemoCarouselConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoCarouselConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoCarouselConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
