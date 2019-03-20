import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaPesquisaComponent } from './parcela-pesquisa.component';

describe('ParcelaPesquisaComponent', () => {
  let component: ParcelaPesquisaComponent;
  let fixture: ComponentFixture<ParcelaPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelaPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
