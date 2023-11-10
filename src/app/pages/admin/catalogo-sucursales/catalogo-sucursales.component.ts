import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SucursalModel } from 'src/app/models/sucursal/sucursal-model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { SucursalHorarioService } from 'src/app/services/sucursal-horario.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-catalogo-sucursales',
  templateUrl: './catalogo-sucursales.component.html',
  styleUrls: ['./catalogo-sucursales.component.css']
})
export class CatalogoSucursalesComponent {
  loading:boolean = false;
  isLoading = true;
  
  showContent = false;
  loadCatalogo = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];
  isVisibleHorarios:boolean = false;
  isVisibleResponsables:boolean = false;

  sucursalId:string = '';
  horarios: any[] = [];

  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
    private modalService: NzModalService,
    private sucursalService:SucursalService,
    private sucursalHorarioService:SucursalHorarioService,
    ) {}

    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        nombre: ['',[Validators.required]],
        direccion: ['',[Validators.required]],
        telefono: ['',[Validators.required]],
        telefono2: ['',[Validators.required]],
        correoElectronico: ['',[Validators.required]],
        contacto: ['',[Validators.required]],
      });
  
      this.loadData();
    }

    loadData() {
      this.sucursalService.getAll()
      .subscribe({
        next:(response)=>{
          this.data = response;
            this.filteredData = response;
            this.loadCatalogo = true;
            this.showContent = true;
        }
      })
    }

    showNew(newItem: TemplateRef<{}>, footer: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: 'Información de la sucursal',
          nzContent: newItem,
          nzFooter: footer,
          nzWidth: 620
      })
    }

    submitForm(): void {
      
      if (this.validateForm.valid) {
        
        var request:SucursalModel = {
          nombre : this.validateForm.value.nombre,
          direccion : this.validateForm.value.direccion,
          telefono : this.validateForm.value.telefono,
          telefono2 : this.validateForm.value.telefono2,
          correoElectronico : this.validateForm.value.correoElectronico,
          contacto : this.validateForm.value.contacto
        };
        
        this.sucursalService.create(request)
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

    private applyFilters(): SucursalModel[] {
      console.log(this.data);
      return this.data.filter((data2:SucursalModel) =>
        data2.nombre.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.direccion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.telefono2.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.correoElectronico.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.contacto.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.telefono.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
      );
    }
  
     //metodos para la forma
     filterItems(): void {
      this.filteredData = this.applyFilters();
    }

    showModalHorarios(id:string): void {
      this.sucursalHorarioService.get(id)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.horarios = response;
        //this.isVisibleHorarios = response;
        this.isVisibleHorarios = true;
        this.sucursalId = id;
      }})
    }

    showModalResponsables(id:string): void {
      //this.horarios = response;
      //this.isVisibleHorarios = response;
      this.isVisibleResponsables = true;
      this.sucursalId = id;
    }

    handleOkTop(): void {
      this.isVisibleHorarios = false;
      this.isVisibleResponsables = false;
      //this.isVisibleTop = false;
    }
  
    handleCancelTop(): void {
      this.isVisibleHorarios = false;
      this.isVisibleResponsables = false;
      //this.isVisibleTop = false;
    }
}
