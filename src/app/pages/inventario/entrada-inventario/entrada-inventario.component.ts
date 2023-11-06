import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EntradaInventarioDetalleModel } from 'src/app/models/inventario/entrada-inventario-detalle-model';
import { EntradaInventarioModel } from 'src/app/models/inventario/entrada-inventario-model';
import { loteModel } from 'src/app/models/lote/lote-model';
import { CatalogoArticuloService } from 'src/app/services/catalogo-articulo.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-entrada-inventario',
  templateUrl: './entrada-inventario.component.html',
  styleUrls: ['./entrada-inventario.component.css']
})
export class EntradaInventarioComponent {
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
  lotes: loteModel[] = [];

  validateForm!: UntypedFormGroup;
  detalleForm!: UntypedFormGroup;
  confirmarEntradaForm!: UntypedFormGroup;

  loading_Lote:boolean = false;
  loadingbtn_Entrar:boolean =true;

  constructor( 
    private fb: FormBuilder, 
    private modalService: NzModalService,
    private catalogoArticuloService: CatalogoArticuloService,
    private inventarioService: InventarioService,
    private loteService: LoteService,
    ) {}

  ngOnInit() {
    this.confirmarEntradaForm= this.fb.group({
      referencia: ['',[Validators.required]]
    });

    this.detalleForm = this.fb.group({
      articulo: ['',[Validators.required]],
      lote: ['',[Validators.required]],
      cantidad: ['',[Validators.required]]
    });

    this.validateForm = this.fb.group({
      articulo: ['',[Validators.required]],
      lote: ['',[Validators.required]],
      fechaDeCaducidad: ['',[Validators.required]],
      fabricante: ['',[Validators.required]],
    });

    this.loadData();
  }

  loadData() {
   
    this.catalogoArticuloService.getAll()
    .subscribe({
      next:(response)=>{
          this.articulos = response;
          
          
          this.isLoading = false;
          this.showContent = true;
      }
    });
  }

  showNewConfirmarEntrada(newItem: TemplateRef<{}>){
    const modal = this.modalService.create({
      nzTitle: 'Confirmar entrada',
      nzContent: newItem,
      nzFooter: [
          {
              label: 'Entrada de inventario',
              type: 'primary',
              //loading: this.loading_Lote,
              onClick: () => {
                //
                this.loading_Lote = true;
                
                this.confirmarEntradaSubmitForm();
              }
          },
      ],
      nzWidth: 620
  })
  }

  showNew(newItem: TemplateRef<{}>) {
    //this.validateForm.reset();
    const modal = this.modalService.create({
        nzTitle: 'Nuevo lote de medicamento',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Confirmar entrada',
                type: 'primary',
                //loading: this.loading_Lote,
                onClick: () => {
                  //
                  this.loading_Lote = true;
                  
                  this.submitForm();
                }
            },
        ],
        nzWidth: 620
    })
  }

  AgregarDetalle():void{
    if (this.detalleForm.valid) {

      //buscamos el articulo
      const articulo = this.articulos.find((element) => element.id == this.detalleForm.value.articulo);
      const lote = this.lotes.find((element) => element.id == this.detalleForm.value.lote);
      
      const detalle:EntradaInventarioDetalleModel = {
        articuloId: articulo.id,
        loteId: lote.id,
        gpo: articulo.gpo,
        gen: articulo.gen,
        esp:articulo.esp,
        dif: articulo.dif,
        var: articulo.var,
        descripcion: articulo.descripcionArticuloCorta,
        numLote: lote.numLote,
        cantidad: this.detalleForm.value.cantidad
        };

        this.entradaDetalle.push(detalle);
        this.data = this.entradaDetalle;
        this.filteredData = this.entradaDetalle;

        this.detalleForm.reset();
      /*
      var request:loteModel = {
        articuloId: this.validateForm.value.articulo,
        numLote : this.validateForm.value.lote,
        fechaCaducidad : this.validateForm.value.fechaDeCaducidad,
        fabricante : this.validateForm.value.fabricante,
      };
      */
      
    } else {
      Object.values(this.detalleForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  BuscaLotes(articuloId){
    if(articuloId == null || articuloId == ''){return;}
    this.detalleForm.patchValue({
      lote: null,
    });
    this.loteService.getLoteByArticulo(articuloId)
    .subscribe({
      next:(response)=>{
        this.lotes = response;
      }
    })
  }

  confirmarEntradaSubmitForm(): void {
    
    if (this.confirmarEntradaForm.valid) {
      var movimiento:EntradaInventarioModel = {
        referencia:this.confirmarEntradaForm.value.referencia,
        detalle:this.entradaDetalle
      };
      
      this.inventarioService.movimientoInventario(movimiento)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.confirmarEntradaForm.reset();
          
          this.entradaDetalle= [];
          this.data = this.entradaDetalle;
          this.filteredData = this.entradaDetalle;

          this.loadData();
        }
      })
     
    } else {
      Object.values(this.confirmarEntradaForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitForm(): void {
    
    if (this.validateForm.valid) {
      var request:loteModel = {
        id:null,
        articuloId: this.validateForm.value.articulo,
        numLote : this.validateForm.value.lote,
        fechaCaducidad : this.validateForm.value.fechaDeCaducidad,
        fabricante : this.validateForm.value.fabricante,
      };
      
      this.loteService.create(request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }
      })
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
      
    return this.data.filter((data2:EntradaInventarioDetalleModel) =>
      data2.gpo.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.gen.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.esp.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.dif.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.var.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||

      data2.descripcion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.numLote.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.cantidad.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }

   //metodos para la forma
   filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  borrarDetalle(detalle:EntradaInventarioDetalleModel):void{
    this.modalService.confirm({
      nzTitle: '<h2 class="text-dark dark:text-white/[.87]">Deseas eliminar el registro seleccionado?</h2>',
      nzOnOk: () =>{
        
        if(this.entradaDetalle.indexOf(detalle) != -1){
          this.entradaDetalle.splice(this.entradaDetalle.indexOf(detalle),1);
          this.data = this.entradaDetalle;
          this.filteredData = this.entradaDetalle;
          this.filteredData = this.applyFilters();
        }
        
      }
    });
  }
}
