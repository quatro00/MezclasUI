import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntradaInventarioModel } from '../models/inventario/entrada-inventario-model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  service:string = 'Inventario'

  constructor(private http:HttpClient) { }

  movimientoInventario(request:EntradaInventarioModel):Observable<EntradaInventarioModel>{
    return this.http.post<EntradaInventarioModel>(`${environment.apiBaseUrl}/api/${this.service}/MovimientoInventario`,request);
  }


}

