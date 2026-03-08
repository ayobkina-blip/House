import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCasa } from './detalles-casa';

describe('DetallesCasa', () => {
  let component: DetallesCasa;
  let fixture: ComponentFixture<DetallesCasa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesCasa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCasa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
