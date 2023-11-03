import { Component } from '@angular/core';
import { CatalogoArticuloModel } from 'src/app/models/catalogoArticulo/catalogo-articulo';
import { CatalogoArticuloService } from 'src/app/services/catalogo-articulo.service';

@Component({
  selector: 'app-catalogoarticulos',
  templateUrl: './catalogoarticulos.component.html',
  styleUrls: ['./catalogoarticulos.component.css']
})
export class CatalogoarticulosComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  constructor( 
    private catalogoArticuloService: CatalogoArticuloService,
    ) {}
 

  ngOnInit() {
    
    this.loadData();
  }

  loadData() {
    this.catalogoArticuloService.getAll()
    .subscribe({
      next:(response)=>{
        this.data = response;
          this.filteredData = response;
          
          this.isLoading = false;
          this.showContent = true;
      }
    })
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2:CatalogoArticuloModel) =>
      data2.gpo.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.gen.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.esp.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.dif.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.var.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||

      data2.programaEspecial.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.descripcionArticuloCorta.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.nivelDeAtencion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.unidadPresentacion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.cantidadPresentacion.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.tipoPresentacion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.cuadroBasicoSai.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.precioArticulo.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.partidaPresupuestal.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.var.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }

   //metodos para la forma
   filterItems(): void {
    this.filteredData = this.applyFilters();
  }

}
