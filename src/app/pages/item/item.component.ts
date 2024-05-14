import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDetalle } from 'src/app/interfaces/producto-detalle.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productoDetalle: ProductoDetalle = {};
  id: string = "";

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService
  ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe( parametros => {

      // console.log(parametros['id']);
      this.productoService.getProducto(parametros['id'])
      .subscribe((producto: Object) => {

        this.id = parametros['id'];
        this.productoDetalle = producto as ProductoDetalle;
        // console.log(this.productoDetalle);

      });

    });
  }

}
