import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceForHome } from './services/home/home.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'estore';
  dataArrive$: Observable<boolean> = this.homeService.getAllProducts(50, 35);

  constructor(private homeService: ServiceForHome) {
    // Removed NgwWowService dependency as it's not compatible with Angular 20
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
