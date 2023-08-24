import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, Subject } from 'rxjs';
import {
  ProductCardModel,
  productsModel,
} from 'src/app/models/productCard.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ServiceForHome {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  // watch products added to cart
  updateCart = new Subject<Array<ProductCardModel>>();
  cartProducts: Array<ProductCardModel> = [];

  // watch single product view
  updateSingleProductView = new Subject<ProductCardModel>();
  singleProductView: ProductCardModel | undefined;

  allProducts: Array<ProductCardModel> = [];

  updateSimilarProducts = new Subject<Array<ProductCardModel>>();
  similarProducts: Array<ProductCardModel> = [];

  getSimilarProducts(category: string) {
    this.similarProducts = this.getProductsByCategory(category);
    this.updateSimilarProducts.next(this.similarProducts);
  }

  getAllProductsArray() {
    return this.allProducts.slice();
  }

  getProductsByCategory(category: string) {
    if (category === 'men') {
      return this.getAllProductsArray().filter(
        (product) =>
          product.category === 'mens-shirts' ||
          product.category === 'mens-shoes' ||
          product.category === 'mens-watches'
      );
    }

    if (category === 'accessories') {
      return this.getAllProductsArray().filter(
        (product) => product.category === 'sunglasses'
      );
    }

    return this.getAllProductsArray().filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  searchProducts(searchRes: string) {
    return this.getAllProductsArray().filter((p) =>
      p.title.toLowerCase().includes(searchRes.toLowerCase())
    );
  }

  onDecrease(id: number) {
    const index = this.cartProducts.findIndex((p) => p.id === id);

    if (this.cartProducts[index].amount === 1)
      this.cartProducts = this.cartProducts.filter((item) => item.id !== id);

    if (this.cartProducts[index]?.amount > 1) this.cartProducts[index].amount--;

    this.storeCartProductLocaly(this.cartProducts);
    this.updateCart.next(this.cartProducts);
  }

  onIncrease(id: number) {
    const index = this.cartProducts.findIndex((p) => p.id === id);

    this.cartProducts[index].amount++;
    this.storeCartProductLocaly(this.cartProducts);
    this.updateCart.next(this.cartProducts);
  }

  onAddCart(cartObject: ProductCardModel) {
    const items = this.cartProducts.slice();

    // check if object alredy existed
    const itemInCart = items.find((_item) => _item.id === cartObject.id);

    if (itemInCart)
      return this._snackBar.open('Item is alredy in cart', 'ok', {
        duration: 3000,
      });

    this.cartProducts.push(cartObject);
    this.storeCartProductLocaly(this.cartProducts);
    this.updateCart.next(this.cartProducts);
    return this._snackBar.open('item successfully added to cart', 'ok', {
      duration: 2000,
    });
  }

  storeCartProductLocaly(arr: ProductCardModel[]): void {
    localStorage.setItem('inCart', JSON.stringify(arr));
  }

  onSingleProduct(singleProductObject: ProductCardModel) {
    this.singleProductView = singleProductObject;
    this.getSimilarProducts(singleProductObject.category);
    this.updateSingleProductView.next(this.singleProductView);
  }

  getBestSellers(limit: number, skip: number) {
    const params = new HttpParams().set('limit', limit).set('skip', skip);

    return this.http
      .get<productsModel>(
        'https://dummyjson.com/products/category/womens-dresses',
        { params }
      )
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }

  getFeatured(limit: number, skip: number) {
    const params = new HttpParams().set('limit', limit).set('skip', skip);

    return this.http
      .get<productsModel>('https://dummyjson.com/products/', { params })
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }

  getAllProducts(limit: number, skip: number) {
    const params = new HttpParams().set('limit', limit).set('skip', skip);
    return this.http
      .get<productsModel>('https://dummyjson.com/products/', { params })
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }
}
