import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarSalaComponent } from './reservar-sala.component';

describe('ReservarSalaComponent', () => {
  let component: ReservarSalaComponent;
  let fixture: ComponentFixture<ReservarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservarSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
