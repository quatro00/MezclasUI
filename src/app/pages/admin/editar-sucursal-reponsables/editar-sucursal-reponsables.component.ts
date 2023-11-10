import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SucursalHorarioModel } from 'src/app/models/sucursalHorario/sucursal-horario-model';
import { SucursalHorarioService } from 'src/app/services/sucursal-horario.service';
import { CuentaService } from '../../../services/cuenta.service';
import { SucursalCuentaModel } from 'src/app/models/cuenta/sucursal-cuenta-model';

@Component({
  selector: 'app-editar-sucursal-reponsables',
  templateUrl: './editar-sucursal-reponsables.component.html',
  styleUrls: ['./editar-sucursal-reponsables.component.css']
})
export class EditarSucursalReponsablesComponent {
  @Input() horarios: any;
  @Input() sucursalId: string;

  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;

  materialForm!: UntypedFormGroup;
  
  data: any[] = [];
  filteredData: any[] = [];
  cuentas: any[] = [];
  loadingbtn_Entrar:boolean = false;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private cuentaService: CuentaService) { }

    ngOnInit() {

      this.cuentaService.getAll().
      subscribe({
        next:(response)=>{
          this.cuentas = response;
        }})

      this.filteredData = this.horarios;
      this.materialForm = this.fb.group({
        cuentaId: ['', [Validators.required]],
      });

     
    }

    loadData():void{
      this.filteredData = [];
    }

    submitForm(): void {
      
      if (this.materialForm.valid) {
       this.loadingbtn_Entrar = true;
        
        var request:SucursalCuentaModel = {
          sucursalId: this.sucursalId,
          cuentaId: this.materialForm.value.cuentaId,
          
        }

        console.log(request);
        this.cuentaService.asociarSucursalCuenta(request).
        subscribe({
          next:(response)=>{
            this.modalService.closeAll();
            this.materialForm.reset();
            this.loadingbtn_Entrar = false;
            this.loadData();
          },
          error: (err) => {this.loadingbtn_Entrar = false;},
        })
          
      } else {
        Object.values(this.materialForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }


}
