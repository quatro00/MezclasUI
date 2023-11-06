import { EntradaInventarioDetalleModel } from "./entrada-inventario-detalle-model";

export class EntradaInventarioModel{
    referencia:string;
    detalle:EntradaInventarioDetalleModel[]=[];
}