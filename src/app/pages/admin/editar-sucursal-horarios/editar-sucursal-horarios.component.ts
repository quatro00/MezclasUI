import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SucursalHorarioModel } from 'src/app/models/sucursalHorario/sucursal-horario-model';
import { SucursalHorarioService } from 'src/app/services/sucursal-horario.service';

@Component({
  selector: 'app-editar-sucursal-horarios',
  templateUrl: './editar-sucursal-horarios.component.html',
  styleUrls: ['./editar-sucursal-horarios.component.css']
})
export class EditarSucursalHorariosComponent {

  @Input() horarios: any;
  @Input() sucursalId: string;

  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;

  materialForm!: UntypedFormGroup;
  validateForm!: UntypedFormGroup;
  data: any[] = [];
  filteredData: any[] = [];
  loadingbtn_Entrar:boolean = false;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private sucursalHorarioService: SucursalHorarioService) { }

    ngOnInit() {

      console.log(this.horarios);
      this.filteredData = this.horarios;
      this.materialForm = this.fb.group({
        dia: ['', [Validators.required]],
        inicioCaptura: [null, [Validators.required]],
        terminoCaptura: [null, [Validators.required]],
        inicioPreparacion: [null, [Validators.required]],
        terminoPreparacion: [null, [Validators.required]],
        entregaDistribuidor: [null, [Validators.required]],
        entregaSucursal: [null, [Validators.required]],
      });

      this.validateForm = this.fb.group({
        observaciones: ['', [Validators.required]]
      });
  
    }

    loadData():void{
      this.filteredData = [];
    }

    submitForm(): void {
      
      if (this.materialForm.valid) {
       this.loadingbtn_Entrar = true;
        console.log(this.materialForm.value);
        var request:SucursalHorarioModel = {
          sucursalId: this.sucursalId,
          dia: this.materialForm.value.dia,
          solicitudInicio: this.materialForm.value.inicioCaptura.toString(),
          solicitudTermino: this.materialForm.value.terminoCaptura.toString(),
          preparacionInicio: this.materialForm.value.inicioPreparacion.toString(),
          preparacionTermino: this.materialForm.value.terminoPreparacion.toString(),
          entregaDistribuidor: this.materialForm.value.entregaDistribuidor.toString(),
          entregaSucursal: this.materialForm.value.entregaSucursal.toString(),
        }

        console.log(request);
        this.sucursalHorarioService.create(request).
        subscribe({
          next:(response)=>{
            this.modalService.closeAll();
            this.materialForm.reset();
            this.loadingbtn_Entrar = false;
            this.loadData();
          }})

      } else {
        Object.values(this.materialForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    showNew(newItem: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]">Deseas cerrar el ticket ?</h2>',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Cerrar ticket',
                  type: 'primary',
                  onClick: () => {
                    
                  }
              },
          ],
          nzWidth: 620
      })
    }

}
