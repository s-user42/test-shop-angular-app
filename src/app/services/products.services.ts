import { ErrorService } from './error.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, delay, throwError } from "rxjs";
import { IProduct } from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class ProductsServices {
  constructor(
    private http: HttpClient,
    private ErrorService: ErrorService
    ) {
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {params: new HttpParams({fromObject:{limit: 5}})})
    .pipe(
      delay(2000),
      catchError(this.errorHandler)
    )
  }


  private errorHandler(error: HttpErrorResponse) {
    this.ErrorService.handle(error.message);
    return throwError(() => error.message)
  }
}
