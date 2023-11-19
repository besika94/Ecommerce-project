import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { ProductCardModel } from 'src/app/models/productCard.model';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const homeServiceSpy = jasmine.createSpyObj<ServiceForHome>(
    'ServiceForHome',
    ['getAllProductsArray', 'updateSingleProductView', 'updateSimilarProducts']
  );

  homeServiceSpy.updateSingleProductView = new Subject();
  homeServiceSpy.updateSingleProductView.next({} as ProductCardModel);

  homeServiceSpy.updateSimilarProducts = new Subject();
  homeServiceSpy.updateSimilarProducts.next({} as Array<ProductCardModel>);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ServiceForHome, useValue: homeServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.similarProducts = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
