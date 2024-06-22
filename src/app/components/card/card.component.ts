import { Component, input, Input, OnInit, signal } from '@angular/core';
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
  objectForCard = input.required<ProductCardModel>();

  list = input<string | undefined>();

  favouriteColor = signal<string>('grey');

  checkFavourite(event: MouseEvent) {
    switch (this.favouriteColor()) {
      case 'grey':
        this.favouriteColor.set('red');
        break;

      case 'red':
        this.favouriteColor.set('grey');
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
