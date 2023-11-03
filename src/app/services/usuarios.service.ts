import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  service:string = 'Usuario'

  constructor(private http:HttpClient) { }

  getAll():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAll`);
  }

  create(request:UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

}