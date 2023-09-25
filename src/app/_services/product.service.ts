import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaz
import { Product } from '../_interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * URL de la API a consumir
   */
  private apiURL = "https://api-node-prueba-production.up.railway.app/api"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /**
   *  Muestra todos los productos
   */
  getAll(): Observable<any> {
    return this.http.get(this.apiURL + '/products')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Elimina un producto dado un id
   */
  delete(id: number) {
    return this.http.delete(this.apiURL + '/products/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Encuentra un producto dado un id
   */
  find(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/products/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  /*

  update(id: number, post: Post): Observable<any> {
    return this.http.put(this.apiURL + '/photos/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

*/

  /**
   * Registra un producto dado su objeto y encabezado
   */

  create(product: Product): Observable<any> {
    console.log(product);
    return this.http.post(this.apiURL + '/products/', JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  /**
   * Gestiona los errores
   */
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {

      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }

    // Recurso no encontrado
    if (error.status === 404) {
      errorMessage = 'Recurso no encontrado';
    }
    return throwError(() => new Error(errorMessage));
  }
}
