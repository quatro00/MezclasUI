import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { UnidadMedidaModel } from '../../../models/catalogo/unidad-medida-model';
import { TipoMedicamentoModel } from 'src/app/models/catalogo/tipo-medicamento-model';
import { MedicamentoRequestModel } from 'src/app/models/medicamento/medicamento-request-model';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { MedicamentoModel } from 'src/app/models/medicamento/medicamento-model';

@Component({
  selector: 'app-catalogo-medicamentos',
  templateUrl: './catalogo-medicamentos.component.html',
  styleUrls: ['./catalogo-medicamentos.component.css']
})
export class CatalogoMedicamentosComponent {

  loading:boolean = false;
  isLoading = true;
  
  showContent = false;
  loadCatalogo_1 = false;
  loadCatalogo_2 = false;
  loadCatalogo_3 = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  UnidadMedida: UnidadMedidaModel[] = [];
  TipoMedicamento: TipoMedicamentoModel[] = [];

  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
    private modalService: NzModalService,
    private catalogoService:CatalogoService,
    private medicamentoService:MedicamentoService
    ) {}

    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        nombre: ['',[Validators.required]],
        unidadMedidaId: ['',[Validators.required]],
        tipoMedicamentoId: ['',[Validators.required]]
      });
  
      this.loadData();
    }

    
    loadData() {
  
      //this.isLoading = false;
      this.showContent = true;
          
      // Simulate an asynchronous data loading operation
      this.catalogoService.getTipoMedicamento()
      .subscribe({
        next:(response)=>{
          this.TipoMedicamento = response;
          this.loadCatalogo_1 = true;
        }
      })

      this.catalogoService.getUnidadMedida()
      .subscribe({
        next:(response)=>{
          this.UnidadMedida = response;
          this.loadCatalogo_2 = true;
        }
      })

      this.medicamentoService.getAll()
      .subscribe({
        next:(response)=>{
          this.data = response;
            this.filteredData = response;
            
            this.loadCatalogo_3 = true;
        }
      })
    }

    showNew(newItem: TemplateRef<{}>, footer: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: 'Información del medicamento',
          nzContent: newItem,
          nzFooter: footer,
          nzWidth: 620
      })
    }

    submitForm(): void {
      console.log(this.validateForm.valid);
      if (this.validateForm.valid) {
        
  
        
        var request:MedicamentoRequestModel = {
          nombre : this.validateForm.value.nombre,
          tipoMedicamentoId : this.validateForm.value.tipoMedicamentoId,
          unidadMedidaId : this.validateForm.value.unidadMedidaId,
          activo : true,
        };
        
        console.log(request);
        
        this.medicamentoService.create(request)
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
      console.log(this.data);
      return this.data.filter((data2:any) =>
        data2.nombre.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.tipoMedicamento.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.unidadMedida.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
      );
    }
  
     //metodos para la forma
     filterItems(): void {
      this.filteredData = this.applyFilters();
    }
}
