import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SucursalModel } from '../models/sucursal/sucursal-model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  service:string = 'Sucursal'

  constructor(private http:HttpClient) { }

  getAll():Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:SucursalModel):Observable<SucursalModel>{
    return this.http.post<SucursalModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:SucursalModel):Observable<SucursalModel>{
    return this.http.put<SucursalModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

}

