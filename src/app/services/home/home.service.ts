import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
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
    let filteredProducts: Array<ProductCardModel> = [];
    if (category === 'men') {
      this.getAllProductsArray().filter((product) => {
        if (
          product.category === 'mens-shirts' ||
          product.category === 'mens-shoes' ||
          product.category === 'mens-watches'
        ) {
          filteredProducts.push(product);
        }
      });
    } else if (category === 'accessories') {
      this.getAllProductsArray().filter((product) => {
        if (product.category === 'sunglasses') {
          filteredProducts.push(product);
        }
      });
    } else {
      this.getAllProductsArray().filter((product) => {
        if (product.category.toLowerCase().includes(category.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
    }

    return filteredProducts;
  }

  searchProducts(searchRes: string) {
    return this.getAllProductsArray().filter((p) =>
      p.title.toLowerCase().includes(searchRes.toLowerCase())
    );
  }

  onDecrease(id: number) {
    this.cartProducts.map((el) => {
      if (el.id === id && el.amount > 0) {
        if (el.amount === 1) {
          this.cartProducts = this.cartProducts.filter(
            (item) => item.id !== el.id
          );
        } else {
          el.amount--;
        }
      }
    });
    this.updateCart.next(this.cartProducts);
  }

  onIncrease(id: number) {
    this.cartProducts.map((el) => {
      if (el.id === id && el.amount > 0) {
        el.amount++;
      }
    });
    this.updateCart.next(this.cartProducts);
  }

  onAddCart(cartObject: ProductCardModel) {
    const items = this.cartProducts.slice();

    // check if object alredy existed
    const itemInCart = items.find((_item) => _item.id === cartObject.id);

    if (itemInCart) {
      // to use quantity
      // itemInCart.amount ? (itemInCart.amount += 1) : '';

      this._snackBar.open('Item is alredy in cart', 'ok', {
        duration: 3000,
      });
    } else {
      this.cartProducts.push(cartObject);
      this._snackBar.open('item successfully added to cart', 'ok', {
        duration: 2000,
      });
    }
    this.updateCart.next(this.cartProducts);
  }

  onSingleProduct(singleProductObject: ProductCardModel) {
    this.singleProductView = singleProductObject;
    this.getSimilarProducts(singleProductObject.category);
    this.updateSingleProductView.next(this.singleProductView);
  }

  getBestSellers() {
    return this.http
      .get<productsModel>(
        'https://dummyjson.com/products/category/womens-dresses?limit=4&skip=1'
      )
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }

  getFeatured() {
    return this.http
      .get<productsModel>('https://dummyjson.com/products/?limit=10&skip=35')
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }

  getAllProducts() {
    return this.http
      .get<productsModel>('https://dummyjson.com/products/?limit=50&skip=35')
      .pipe(
        map((response) => {
          response.products.forEach((el) => (el.amount = 1));
          return response;
        })
      );
  }
}
