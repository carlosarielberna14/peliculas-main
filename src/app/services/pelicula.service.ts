import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  baseUri: string = 'https://peliculasds02.herokuapp.com/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //Método para agregar una nueva película
  agregarPelicula(data):Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url,data).pipe(catchError(this.errorManagement));
  }

  //Método para obtener a todas las películas
  getPeliculas(){
    let url = `${this.baseUri}/peliculas`;
    return this.http.get(url);
  }

  //Método para obtener una sola película por su ID
  getPelicula(id):Observable<any>{
    let url = `${this.baseUri}/pelicula/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:Response) => {
        return res || {};
      }),
      catchError(this.errorManagement)
    );
  }

  //Método para actualizar una película
  updatePelicula(id,data):Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url,data,{headers: this.headers}).pipe(
      catchError(this.errorManagement)
    );
  }

  //Método para eliminar una película
  deletePelicula(id):Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url,{headers: this.headers}).pipe(
      catchError(this.errorManagement)
    );
  }

  //Manejador de errores
  errorManagement(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    }else{
      //Obtnemos el error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
