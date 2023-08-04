import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { sortSelectRM } from 'src/app/models/sortSelect.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private homeService: ServiceForHome,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.selectedSort = { value: 0, label: 'Default' };
      this.page = 1;
      if (params.category === 'all') {
        this.productsArray = this.homeService.getAllProductsArray();
      } else {
        this.productsArray = this.homeService.getProductsByCategory(
          params.category
        );
      }
    });
  }

  defaultBindingsList: Array<number> = [5, 10, 15];
  sortBy: Array<sortSelectRM> = [
    { value: 1, label: 'Default' },
    { value: 2, label: 'Price (low to high)' },
    { value: 3, label: 'Price (high to low)' },
  ];

  selectedAmount: number = 5;
  selectedSort: sortSelectRM = { value: 0, label: 'Default' };

  ngOnInit(): void {}

  itemsPerPage: number = 5;
  productsArray: Array<ProductCardModel> = [];

  page: number = 1;

  onSortSelect() {
    switch (this.selectedSort.value) {
      case 2:
        this.productsArray = this.productsArray.sort(
          (a, b) => a.price - b.price
        );
        break;
      case 3:
        this.productsArray = this.productsArray.sort(
          (a, b) => b.price - a.price
        );
        break;

      default:
        break;
    }
  }
}
