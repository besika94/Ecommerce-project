import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(
    private homeService: ServiceForHome,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if (!this.singleProduct) {
        this.singleProduct = this.homeService
          .getAllProductsArray()
          .find((p) => +params.id === p.id);

        this.similarProducts = this.homeService
          .getAllProductsArray()
          .filter((p) => p.category === this.singleProduct?.category);
      }
    });
  }

  ngOnInit(): void {
    this.singleProductSubscription =
      this.homeService.updateSingleProductView.subscribe((_singleProduct) => {
        this.singleProduct = _singleProduct;
      });

    this.similarProductsSubscription =
      this.homeService.updateSimilarProducts.subscribe((_similarProduct) => {
        this.similarProducts = _similarProduct;
      });
  }
  singleProduct: ProductCardModel | undefined =
    this.homeService.singleProductView;

  similarProducts: Array<ProductCardModel> = this.homeService.similarProducts;
  similarProductsSubscription: Subscription | undefined;
  singleProductSubscription: Subscription | undefined;

  getSimilarProducts(category: string) {
    this.similarProducts = this.homeService.getProductsByCategory(category);
  }

  onAmount(upOrDown: string) {
    switch (upOrDown) {
      case '+':
        this.singleProduct !== undefined ? this.singleProduct.amount++ : '';
        break;

      case '-':
        this.singleProduct !== undefined && this.singleProduct.amount !== 1
          ? this.singleProduct.amount--
          : '';
        break;
    }
  }

  onAddCart(cartObject: ProductCardModel) {
    this.homeService.onAddCart(cartObject);
  }

  ngOnDestroy(): void {
    this.singleProductSubscription?.unsubscribe();
    this.similarProductsSubscription?.unsubscribe();
  }
}
