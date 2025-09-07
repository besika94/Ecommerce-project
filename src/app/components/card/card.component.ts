import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
