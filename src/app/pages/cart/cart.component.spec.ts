import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const homeServiceSpy = jasmine.createSpyObj<ServiceForHome>(
    'ServiceForHome',
    ['updateCart', 'onDecrease', 'onIncrease']
  );

  homeServiceSpy.updateCart = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ServiceForHome, useValue: homeServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.dataForCartTable = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
