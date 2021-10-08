import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Zapatilla } from '../models/zapatilla';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

export class Zapatillas {
  _id: number;
  marca: string;
  numero: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
}) 

export class ZapatillasService {

  endpoint = "http://localhost:8080/zapatillas";

  constructor(private httpClient: HttpClient) { }

  getZapatillas(): Observable<Zapatilla[]>{
    return this.httpClient.get<Zapatilla[]>(this.endpoint).pipe(
      tap(zapatillas => console.log("Zapatilla retrieved")),
      catchError(this.handleError<Zapatilla[]>("Get zapatilla", []))
    );
  }

  getZapatillaById(id: number): Observable<Zapatilla>{
    return this.httpClient.get<Zapatilla>(this.endpoint + "/" + id).pipe(
      tap(_ => console.log(`Zapatilla fetched: ${id}`)),
      catchError(this.handleError<Zapatilla>(`Get zapatilla id=${id}`))
    );
  }

  createZapatilla(zapatilla: Zapatilla): Observable<Zapatilla>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("marca", zapatilla.marca);
    bodyEncoded.append("numero", zapatilla.numero.toString());
    bodyEncoded.append("stock", zapatilla.stock.toString());
    const body = bodyEncoded.toString();
    return this.httpClient.post<Zapatilla>(this.endpoint, body, httpOptionsUsingUrlEncoded);
  }

  createZapatillaUsingJSON(zapatilla: Zapatilla): Observable<Zapatilla>{
    return this.httpClient.post<Zapatilla>(this.endpoint, JSON.stringify(zapatilla), httpOptions).pipe(
      catchError(this.handleError<Zapatilla>("Error ocurred"))
    );
  }

  updateZapatilla(idZapatilla, zapatilla: Zapatilla): Observable<any>{
    console.log(idZapatilla);
    console.log(zapatilla.marca);
    console.log(zapatilla.numero);
    console.log(zapatilla.stock);
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("marca", zapatilla.marca);
    bodyEncoded.append("numero", zapatilla.numero.toString());
    bodyEncoded.append("stock", zapatilla.stock.toString());
    const body = bodyEncoded.toString();
    return this.httpClient.put(this.endpoint + "/" + idZapatilla, body, httpOptionsUsingUrlEncoded).pipe(
      tap(_=> console.log(`Zapatilla update : ${idZapatilla}`)),
      catchError(this.handleError<Zapatilla[]>("Update zapatilla"))
    );
  }

 deleteZapatilla(idZapatilla: number): Observable<Zapatilla[]>{
   return this.httpClient.delete<Zapatilla[]>(this.endpoint + "/" + idZapatilla).pipe(
     tap(_=> console.log(`Zapatilla deleted: ${idZapatilla}`)),
     catchError(this.handleError<Zapatilla[]>("Delete zapatilla"))
   );
 }

 handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}  

}
