import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaCadastroComponent } from './parcela-cadastro.component';

describe('ParcelaCadastroComponent', () => {
  let component: ParcelaCadastroComponent;
  let fixture: ComponentFixture<ParcelaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
