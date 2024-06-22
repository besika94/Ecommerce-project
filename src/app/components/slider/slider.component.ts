import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import { ProductCardModel } from 'src/app/models/productCard.model';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-slider',
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
