import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabernaComponent } from './taberna.component';

describe('TabernaComponent', () => {
  let component: TabernaComponent;
  let fixture: ComponentFixture<TabernaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabernaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabernaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
