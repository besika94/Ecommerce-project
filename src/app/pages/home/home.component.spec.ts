import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { productsModel } from 'src/app/models/productCard.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const homeServiceSpy = jasmine.createSpyObj<ServiceForHome>(
    'ServiceForHome',
    ['getBestSellers', 'getFeatured']
  );

  homeServiceSpy.getBestSellers.and.returnValue(of({} as productsModel));
  homeServiceSpy.getFeatured.and.returnValue(of({} as productsModel));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ServiceForHome, useValue: homeServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
