import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos(){

    this.http.get('https://angular-template-e50e3-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( ( resp: Object) => {

      this.productos= resp as Producto[];

      this.cargando = false;

    });

  }
}