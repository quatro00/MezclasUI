import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from 'src/app/guard/auth-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogoarticulosComponent } from './catalogoarticulos/catalogoarticulos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CatalogoMedicamentosComponent } from './catalogo-medicamentos/catalogo-medicamentos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Dashboard',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'catalogoarticulos',
    component: CatalogoarticulosComponent,
    data: {
        title: 'Catalogo de articulos',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
        title: 'Usuarios',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'catalogo-medicamentos',
    component: CatalogoMedicamentosComponent,
    data: {
        title: 'Catalogo de medicamentos',
    },
    //canActivate: [authAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
