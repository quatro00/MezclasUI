import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EntradaInventarioComponent } from "./entrada-inventario/entrada-inventario.component";
import { NgModule } from "@angular/core";

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
      path: 'entrada-inventario',
      component: EntradaInventarioComponent,
      data: {
          title: 'Entrada de inventario',
      },
      //canActivate: [authAdminGuard]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventarioRoutingModule { }
  