import { Injectable } from '@angular/core';
import { MedicamentoRequestModel } from '../models/medicamento/medicamento-request-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { cuentaModel } from '../models/cuenta/cuenta-model';
import { SucursalCuentaModel } from '../models/cuenta/sucursal-cuenta-model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  service:string = 'Cuenta'

  constructor(private http:HttpClient) { }

  getAll():Observable<cuentaModel[]>{
    return this.http.get<cuentaModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  asociarSucursalCuenta(request:SucursalCuentaModel):Observable<SucursalCuentaModel>{
    return this.http.post<SucursalCuentaModel>(`${environment.apiBaseUrl}/api/${this.service}/AsociarSucursalCuenta`,request);
  }
  

}