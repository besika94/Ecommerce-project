import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

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

  @Input() slideImages: Array<string> | undefined;

  @Input() cardSlider: Array<ProductCardModel> | undefined;

  ngOnInit(): void {}
  thumbsSwiper: any;
}
