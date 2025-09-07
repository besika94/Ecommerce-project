import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { SliderComponent } from 'src/app/components/slider/slider.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  private homeService = inject(ServiceForHome);
  private route = inject(ActivatedRoute);

  singleProduct = this.homeService.singleProductView;
  similarProducts = this.homeService.similarProducts;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!this.singleProduct()) {
        this.homeService.singleProductView.set(this.homeService.getAllProductsArray().find((p) => +params.id === p.id));
        const prd = this.homeService.singleProductView();
        this.homeService.getSimilarProducts(prd?.category || '');
      }
    });
  }

  getSimilarProducts(category: string) {
    this.homeService.getProductsByCategory(category);
  }

  onAmount(upOrDown: string) {
    const singleProductview = this.singleProduct();
    switch (upOrDown) {
      case '+':
        singleProductview !== undefined ? singleProductview.amount++ : '';
        break;

      case '-':
        singleProductview !== undefined && singleProductview.amount > 1 ? singleProductview.amount-- : '';
        break;
    }
  }

  onAddToCart(product: ProductCardModel | undefined) {
    if (product) {
      this.homeService.onAddCart(product);
    }
  }
}
