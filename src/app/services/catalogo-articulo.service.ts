import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatalogoArticuloModel } from '../models/catalogoArticulo/catalogo-articulo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoArticuloService {
  service:string = 'CatalogoArticulo'

  constructor(private http:HttpClient) { }

  getAll():Observable<CatalogoArticuloModel[]>{
    return this.http.get<CatalogoArticuloModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAll`);
  }
}

