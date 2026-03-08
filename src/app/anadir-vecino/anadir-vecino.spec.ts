import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirVecino } from './anadir-vecino';

describe('AnadirVecino', () => {
  let component: AnadirVecino;
  let fixture: ComponentFixture<AnadirVecino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirVecino]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirVecino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
