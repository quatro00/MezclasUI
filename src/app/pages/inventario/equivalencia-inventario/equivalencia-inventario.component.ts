import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EntradaInventarioDetalleModel } from 'src/app/models/inventario/entrada-inventario-detalle-model';
import { EntradaInventarioModel } from 'src/app/models/inventario/entrada-inventario-model';
import { EquivalenciaInventarioModel } from 'src/app/models/inventario/equivalencia-inventario-model';
import { loteModel } from 'src/app/models/lote/lote-model';
import { MedicamentoModel } from 'src/app/models/medicamento/medicamento-model';
import { CatalogoArticuloService } from 'src/app/services/catalogo-articulo.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoteService } from 'src/app/services/lote.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { EquivalenciaArticuloMedicamentoService } from '../../../services/equivalencia-articulo-medicamento.service';

@Component({
  selector: 'app-equivalencia-inventario',
  templateUrl: './equivalencia-inventario.component.html',
  styleUrls: ['./equivalencia-inventario.component.css']
})
export class EquivalenciaInventarioComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];
  articulos: any[] = [];
  entradaDetalle: EntradaInventarioDetalleModel[] = [];
  medicamentos: MedicamentoModel[] = [];

  validateForm!: UntypedFormGroup;

  loadingbtn:boolean = false;

  constructor( 
    private fb: FormBuilder, 
    private modalService: NzModalService,
    private catalogoArticuloService: CatalogoArticuloService,
    private medicamentoService: MedicamentoService,
    private equivalenciaArticuloMedicamentoService: EquivalenciaArticuloMedicamentoService,
    ) {}

  ngOnInit() {

    this.validateForm = this.fb.group({
      articuloId: ['',[Validators.required]],
      medicamentoId: ['',[Validators.required]],
      cantidadPiezasUnitarias: ['',[Validators.required]],
      contenidoPorPieza: ['',[Validators.required]]
    });


    this.loadData();
  }

  loadData() {
   
    this.equivalenciaArticuloMedicamentoService.getAll()
    .subscribe({
      next:(response)=>{
        this.data = response;
        this.filteredData = response;
      }});
    this.medicamentoService.getAll()
    .subscribe({
      next:(response)=>{
          this.medicamentos = response;
      }});

    this.catalogoArticuloService.getAll()
    .subscribe({
      next:(response)=>{
          this.articulos = response;
          
          
          this.isLoading = false;
          this.showContent = true;
      }});
  }


  


  submitForm(): void {
    
    if (this.validateForm.valid) {
      var request:EquivalenciaInventarioModel = {
        articuloId: this.validateForm.value.articuloId,
        medicamentoId : this.validateForm.value.medicamentoId,
        cantidadPiezasUnitarias : this.validateForm.value.cantidadPiezasUnitarias,
        contenidoPorPieza : this.validateForm.value.contenidoPorPieza,
      };
      
      this.loadingbtn = true;
      this.equivalenciaArticuloMedicamentoService.create(request)
      .subscribe({
        next:(response)=>{
          this.validateForm.reset();
          this.loadData();
          this.loadingbtn = false;
        },
        error: (err) => {this.loadingbtn = false;},
      })
      /*
      this.loteService.create(request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }})
        */
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private applyFilters(): any[] {
      
    return this.data.filter((data2:EquivalenciaInventarioModel) =>
      data2.articulo.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.medicamento.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.cantidadPiezasUnitarias.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.contenidoPorPieza.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }

   //metodos para la forma
   filterItems(): void {
    this.filteredData = this.applyFilters();
  }

 
}
