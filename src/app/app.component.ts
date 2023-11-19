import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { ServiceForHome } from './services/home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private wowService: NgwWowService,
    private homeService: ServiceForHome
  ) {
    this.wowService.init();
  }
  ngOnInit(): void {
    this.homeService.getAllProducts(50, 35).subscribe((bool) => {
      this.dataArrive = bool;
    });

    const storedCart: string | null = localStorage.getItem('inCart');
    if (!this.homeService.cartProducts.length && storedCart) {
      this.homeService.cartProducts = JSON.parse(storedCart);
      this.homeService.updateCart.next(this.homeService.cartProducts);
    }
  }
  title = 'estore';
  dataArrive: boolean = false;
}
