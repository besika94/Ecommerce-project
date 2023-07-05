import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private homeService: ServiceForHome, private router: Router) {}

  ngOnInit(): void {}

  @Input() objectForCard: ProductCardModel | undefined;

  @Input() list: string | undefined;

  favouriteColor: string = 'grey';

  checkFavourite(event: MouseEvent) {
    switch (this.favouriteColor) {
      case 'grey':
        this.favouriteColor = 'red';
        break;

      case 'red':
        this.favouriteColor = 'grey';
        break;
    }
    event.stopPropagation();
  }

  onAddCart(cartObject: ProductCardModel, event: MouseEvent) {
    this.homeService.onAddCart(cartObject);
    event.stopPropagation();
  }

  onProduct(cartObject: ProductCardModel) {
    this.homeService.onSingleProduct(cartObject);
    this.router.navigate([`product/${cartObject.id}`]);
  }
}
