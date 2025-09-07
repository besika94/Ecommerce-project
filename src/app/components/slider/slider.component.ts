import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModel } from 'src/app/models/productCard.model';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  constructor() {}
  slideImages = input<Array<string>>();
  cardSlider = input<Array<ProductCardModel>>();

  ngOnInit(): void {}
  thumbsSwiper: any;
}
