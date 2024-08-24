import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { ServiceForHome } from './services/home/home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'estore';
  dataArrive$: Observable<boolean> = this.homeService.getAllProducts(50, 35);

  constructor(private wowService: NgwWowService, private homeService: ServiceForHome) {
    this.wowService.init();
  }
  ngOnInit(): void {
    this.checkCartItems();
  }

  checkCartItems() {
    const storedCart: string | null = localStorage.getItem('inCart');
    if (!this.homeService.cartProducts().length && storedCart) {
      this.homeService.cartProducts.set(JSON.parse(storedCart));
    }
  }
}
