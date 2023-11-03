import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const AdminRoutes: SideNavInterface[] = [
  
  {
    path: 'administrador/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'home-add',
    submenu:[]
  },
  {
    path: 'administrador/catalogoarticulos',
    title: 'Catalogo de articulos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'home-add',
    submenu:[]
  },
  {
    path: 'administrador/usuarios',
    title: 'Usuarios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'home-add',
    submenu:[]
  },
]

export const InventarioRoutes: SideNavInterface[] = [
  
  {
    path: 'inventario/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
},
{
  path: 'inventario/entrada-inventario',
  title: 'Entrada de inventario',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: 'appstore-add',
  submenu:[]
}]

  export const ClienteRoutes: SideNavInterface[] = [
  
    {
      path: 'cliente/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'home',
      submenu:[]
    },
   
]

  export const SupervisorRoutes: SideNavInterface[] = [

    {
      path: 'supervisor/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
]
