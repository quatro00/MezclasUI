import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsuarioModel } from 'src/app/models/usuario/usuario-model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  loading:boolean = false;
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  centralesDeMezclas:any[]=[
    {
      id:'20EA25',
      nombre:'UMAE ESPECIALIDADES N.L.'
    },
   
    
  ];

  roles:any[]=[
    {
      id:'MEZCLAS-ADMIN',
      nombre:'ADMINISTRADOR'
    },
    {
      id:'MEZCLAS-CABINA',
      nombre:'CABINA'
    },
    {
      id:'MEZCLAS-INVENTARIO',
      nombre:'INVENTARIO'
    },
    {
      id:'MEZCLAS-QUIMICO',
      nombre:'QUIMICO'
    },
    {
      id:'MEZCLAS-SOLICITANTE',
      nombre:'SOLICITANTE'
    },
    
  ];

  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usuariosService: UsuariosService,
    private modalService: NzModalService
    ) {}

       
    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        sucursalId: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        apellidos: ['',[Validators.required]],
        matricula: ['',[Validators.required]],
        correoElectronico: ['',[Validators.required]],
        rol: ['',[Validators.required]],
      });
  
      this.loadData();
    }

    loadData() {
  
      this.usuariosService.getAll()
      .subscribe({
        next:(response)=>{
          this.data = response;
            this.filteredData = response;
            
            this.isLoading = false;
            this.showContent = true;
        }
      })
      this.isLoading = false;
      this.showContent = true;
          
      // Simulate an asynchronous data loading operation
    
    }

    showNew(newItem: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: 'Información del usario',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Agregar usuario',
                  type: 'primary',
                  loading: this.loading,
                  onClick: () => {
                    this.submitForm();
                    this.loading = true;
                    //console.log(this.loading);
                  }
              },
          ],
          nzWidth: 620
      })
    }

    submitForm(): void {
      console.log(this.validateForm.valid);
      if (this.validateForm.valid) {
        
  
        
        var request:UsuarioModel = {
          id : '',
          matricula: this.validateForm.value.matricula,
          nombre : this.validateForm.value.nombre,
          apellidos : this.validateForm.value.apellidos,
          unidad : this.validateForm.value.sucursalId,
          correoElectronico: this.validateForm.value.correoElectronico,
          activo : true,
          rolId: this.validateForm.value.rol,
        };
        
        console.log(request);
        
        this.usuariosService.create(request)
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
}
