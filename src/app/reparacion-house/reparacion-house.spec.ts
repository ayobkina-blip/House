import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionHouse } from './reparacion-house';

describe('ReparacionHouse', () => {
  let component: ReparacionHouse;
  let fixture: ComponentFixture<ReparacionHouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReparacionHouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparacionHouse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
