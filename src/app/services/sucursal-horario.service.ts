import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SucursalHorarioModel } from '../models/sucursalHorario/sucursal-horario-model';

@Injectable({
  providedIn: 'root'
})
export class SucursalHorarioService {
  service:string = 'SucursalHorario'

  constructor(private http:HttpClient) { }

  get(sucursalId:string):Observable<SucursalHorarioModel[]>{
    return this.http.get<SucursalHorarioModel[]>(`${environment.apiBaseUrl}/api/${this.service}/${sucursalId}`);
  }

  create(request:SucursalHorarioModel):Observable<SucursalHorarioModel>{
    return this.http.post<SucursalHorarioModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:SucursalHorarioModel):Observable<SucursalHorarioModel>{
    return this.http.put<SucursalHorarioModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

}