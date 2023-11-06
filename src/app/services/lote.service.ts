import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loteModel } from '../models/lote/lote-model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  service:string = 'Lote'

  constructor(private http:HttpClient) { }

  create(request:loteModel):Observable<loteModel>{
    return this.http.post<loteModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  getLoteByArticulo(id:string):Observable<loteModel[]>{
    return this.http.get<loteModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetLoteByArticulo/${id}`);
  }

}

