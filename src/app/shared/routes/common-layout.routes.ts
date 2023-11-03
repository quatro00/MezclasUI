import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [

   
    {
        path: 'administrador',
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminModule),
    },
    {
        path: 'inventario',
        loadChildren: () => import('../../pages/inventario/inventario.module').then(m => m.InventarioModule),
    },
    //Component
   
    
];
