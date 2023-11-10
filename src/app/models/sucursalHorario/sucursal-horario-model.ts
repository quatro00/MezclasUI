export class SucursalHorarioModel{
    id?:string;
    sucursalId:string;
    dia:number;
    solicitudInicio:string;
    solicitudTermino:string;
    preparacionInicio:string;
    preparacionTermino:string;
    entregaDistribuidor:string;
    entregaSucursal:string;
    activo?:boolean;
}