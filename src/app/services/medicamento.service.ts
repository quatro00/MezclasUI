import { Injectable } from '@angular/core';
import { MedicamentoRequestModel } from '../models/medicamento/medicamento-request-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MedicamentoModel } from '../models/medicamento/medicamento-model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  service:string = 'Medicamento'

  constructor(private http:HttpClient) { }

  getAll():Observable<MedicamentoModel[]>{
    return this.http.get<MedicamentoModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:MedicamentoRequestModel):Observable<MedicamentoRequestModel>{
    return this.http.post<MedicamentoRequestModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:MedicamentoRequestModel):Observable<MedicamentoRequestModel>{
    return this.http.put<MedicamentoRequestModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

}

