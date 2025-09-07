import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { sortSelectRM } from 'src/app/models/sortSelect.model';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, NgxPaginationModule, MatSelectModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  constructor(
    private homeService: ServiceForHome,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params) => {
      this.selectedSort = { value: 0, label: 'Default' };
      this.page = 1;
      if (params.category === 'all') {
        this.productsArray.set(this.homeService.getAllProductsArray());
      } else {
        this.productsArray.set(this.homeService.getProductsByCategory(params.category));
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
  productsArray = signal<Array<ProductCardModel>>([]);

  page: number = 1;

  onSortSelect() {
    switch (this.selectedSort.value) {
      case 2:
        this.productsArray.update((prev) => prev.sort((a, b) => a.price - b.price));
        break;

      case 3:
        this.productsArray.update((prev) => prev.sort((a, b) => b.price - a.price));
        break;

      default:
        break;
    }
  }

  onAmountSelect() {
    this.itemsPerPage = this.selectedAmount;
  }
}
