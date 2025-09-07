import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { productsModel } from 'src/app/models/productCard.model';
import { ServiceForHome } from 'src/app/services/home/home.service';
import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private homeService = inject(ServiceForHome);
  private router = inject(Router);

  bestSellers$: Observable<productsModel> = this.homeService.getBestSellers(4, 1);
  featuredProduct$: Observable<productsModel> = this.homeService.getFeatured(10, 35);

  onStartShopping() {
    this.router.navigate(['products/all']);
  }
}
