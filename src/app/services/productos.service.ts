import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise<void>( (resolve, reject) => {

      this.http.get('https://angular-template-e50e3-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: Object) => {

        this.productos= resp as Producto[];

        this.cargando = false;

        resolve();
      });

    });

  }

  getProducto( id: string ){
    return this.http.get(`https://angular-template-e50e3-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    if (this.productos.length === 0) {

      // cargar productos
      this.cargarProductos().then(()=>{
        // Ejecutar despues de tener lo productos
        this.filtrarProductos(termino);
      });

    } else {

      // aplicar el filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string){

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo?.toLocaleLowerCase();

      if(
        (prod.categoria ? prod.categoria.indexOf(termino) : -1 ) >= 0 ||
        (tituloLower ? tituloLower.indexOf(termino) : -1 ) >= 0
      ){
        this.productosFiltrado.push(prod);
      }

    });

  }
}
