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
    this.homeService.getAllProducts().subscribe((products) => {
      this.homeService.allProducts = products.products;
      this.dataArrive = true;
    });
  }
  title = 'estore';
  dataArrive: boolean = false;
}
