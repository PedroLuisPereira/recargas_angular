import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecargaService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:8080/";
  }


  listRecargas() {
    let url = this.apiUrl + "api/recargas";
    return this.http.get(url);
  }


  getPersonas() {
    let url = this.apiUrl + "api/personas";
    return this.http.get(url);
  }


  create(recarga: any) {
    let url = this.apiUrl + "api/recargas";
    return this.http.post(url, recarga);
  }
}
