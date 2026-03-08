import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Casa } from './casa';

describe('Casa', () => {
  let component: Casa;
  let fixture: ComponentFixture<Casa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Casa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Casa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
