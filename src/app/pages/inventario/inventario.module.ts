
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgChartsModule  } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { EditorModule } from '@tinymce/tinymce-angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { EntradaInventarioComponent } from './entrada-inventario/entrada-inventario.component';
import { EquivalenciaInventarioComponent } from './equivalencia-inventario/equivalencia-inventario.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const antdModule = [
  NzButtonModule,
  NzDropDownModule,
  AngularSvgIconModule.forRoot(),
  NgChartsModule,
  NgApexchartsModule,
  NzLayoutModule,
  NzGridModule,
  NzSkeletonModule,
  InventarioRoutingModule,
  NzModalModule,
  //FeaturesRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  NzInputModule,
  NzFormModule,
  //NzInputNumberModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzSelectModule,
 //NzUploadModule,
  NzCheckboxModule,
  NzRadioModule,
  NzTagModule,
  NzSwitchModule,
  //NzSliderModule,
  NzTableModule,
  //EditorModule,
  //DashboardModule,
  //AppsModule,
  NzProgressModule,
  NzAvatarModule,
  NzToolTipModule,
  //NzStepsModule,
  //GoogleMapsModule
  NzMessageModule,
  NzCollapseModule

]

@NgModule({
  declarations: [
  
    DashboardComponent,
       EntradaInventarioComponent,
       EquivalenciaInventarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzCardModule,
    HttpClientModule,
    NzSliderModule,
    ...antdModule
  ],
  providers: [
    NzMessageService
  ]
})
export class InventarioModule { }
