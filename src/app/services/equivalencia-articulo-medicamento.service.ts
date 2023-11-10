import { Injectable } from '@angular/core';
import { MedicamentoRequestModel } from '../models/medicamento/medicamento-request-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EquivalenciaInventarioModel } from '../models/inventario/equivalencia-inventario-model';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaArticuloMedicamentoService {

  service:string = 'EquivalenciaArticuloMedicamento'

  constructor(private http:HttpClient) { }

  getAll():Observable<EquivalenciaInventarioModel[]>{
    return this.http.get<EquivalenciaInventarioModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:EquivalenciaInventarioModel):Observable<EquivalenciaInventarioModel>{
    return this.http.post<EquivalenciaInventarioModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:EquivalenciaInventarioModel):Observable<EquivalenciaInventarioModel>{
    return this.http.put<EquivalenciaInventarioModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

}