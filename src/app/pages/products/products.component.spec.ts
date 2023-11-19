import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const homeServiceSpy = jasmine.createSpyObj<ServiceForHome>(
    'ServiceForHome',
    ['getAllProductsArray', 'getProductsByCategory']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ServiceForHome, useValue: homeServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.productsArray = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
