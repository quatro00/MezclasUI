import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadMedidaModel } from '../models/catalogo/unidad-medida-model';
import { TipoMedicamentoModel } from '../models/catalogo/tipo-medicamento-model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  service:string = 'Catalogo'

  constructor(private http:HttpClient) { }

  getUnidadMedida():Observable<UnidadMedidaModel[]>{
    return this.http.get<UnidadMedidaModel[]>(`${environment.apiBaseUrl}/api/${this.service}/getunidadmedida`);
  }

  getTipoMedicamento():Observable<TipoMedicamentoModel[]>{
    return this.http.get<TipoMedicamentoModel[]>(`${environment.apiBaseUrl}/api/${this.service}/gettipomedicamento`);
  }

}

