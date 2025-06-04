import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCreditosComponent } from './resultado-creditos.component';

describe('ResultadoCreditosComponent', () => {
  let component: ResultadoCreditosComponent;
  let fixture: ComponentFixture<ResultadoCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoCreditosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
