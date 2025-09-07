import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ProductCardModel, productsModel } from 'src/app/models/productCard.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceForHome {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  // watch products added to cart
  cartProducts = signal<Array<ProductCardModel>>([]);

  // watch single product view
  updateSingleProductView = new Subject<ProductCardModel>();
  singleProductView = signal<ProductCardModel | undefined>(undefined);

  allProducts = signal<Array<ProductCardModel>>([]);

  similarProducts = signal<Array<ProductCardModel>>([]);

  getSimilarProducts(category: string) {
    this.similarProducts.set(this.getProductsByCategory(category));
  }

  getAllProductsArray() {
    return this.allProducts().slice();
  }

  getProductsByCategory(category: string) {
    if (category === 'men') {
      return this.getAllProductsArray().filter(
        (product) =>
          product.category === 'mens-shirts' || product.category === 'mens-shoes' || product.category === 'mens-watches'
      );
    }

    if (category === 'accessories') {
      return this.getAllProductsArray().filter((product) => product.category === 'sunglasses');
    }

    return this.getAllProductsArray().filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  searchProducts(searchRes: string) {
    return this.getAllProductsArray().filter((p) => p.title.toLowerCase().includes(searchRes.toLowerCase()));
  }

  onDecrease(id: number) {
    const index = this.cartProducts().findIndex((p) => p.id === id);

    if (this.cartProducts()[index].amount === 1) {
      this.cartProducts.update((i) => i.filter((item) => item.id !== id));
    } else if (this.cartProducts()[index]?.amount > 1) {
      this.cartProducts.update((p) => {
        p[index].amount--;
        return p;
      });
    }

    this.storeCartProductLocaly(this.cartProducts());
  }

  onIncrease(id: number) {
    const index = this.cartProducts().findIndex((p) => p.id === id);

    this.cartProducts.update((p) => {
      p[index].amount++;
      return p;
    });
    this.storeCartProductLocaly(this.cartProducts());
  }

  onAddCart(cartObject: ProductCardModel) {
    const items = this.cartProducts().slice();

    // check if object alredy existed
    const itemInCart = items.find((_item) => _item.id === cartObject.id);

    if (itemInCart)
      return this._snackBar.open('Item is alredy in cart', 'ok', {
        duration: 3000,
      });

    this.cartProducts.set([...items, cartObject]);
    this.storeCartProductLocaly(this.cartProducts());
    return this._snackBar.open('item successfully added to cart', 'ok', {
      duration: 2000,
    });
  }

  onRemoveProduct(id: number) {
    this.cartProducts.update((items) => items.filter((item) => item.id !== id));
    this.storeCartProductLocaly(this.cartProducts());
    this._snackBar.open('Item removed from cart', 'ok', {
      duration: 2000,
    });
  }

  storeCartProductLocaly(arr: ProductCardModel[]): void {
    localStorage.setItem('inCart', JSON.stringify(arr));
  }

  onSingleProduct(singleProductObject: ProductCardModel) {
    this.singleProductView.set(singleProductObject);
    this.getSimilarProducts(singleProductObject.category);
  }

  getBestSellers(limit: number, skip: number) {
    const params = new HttpParams().set('limit', limit).set('skip', skip);

    return this.http
      .get<productsModel>(environment.baseUrl + 'category/womens-dresses', {
        params,
      })
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }

  getFeatured(limit: number, skip: number) {
    const params = new HttpParams().set('limit', limit).set('skip', skip);

    return this.http.get<productsModel>(environment.baseUrl, { params }).pipe(
      map((response) => {
        const featuredProducts = response.products.map((el) => (el.amount = 1));
        return response;
      })
    );
  }

  getAllProducts(limit: number, skip: number): Observable<boolean> {
    const params = new HttpParams().set('limit', 0).set('skip', 0);
    return this.http.get<productsModel>(environment.baseUrl, { params }).pipe(
      map((r) => {
        this.allProducts.set(r.products.map((el) => ({ ...el, amount: 1 })));
        return true;
      })
    );
  }
}
