import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = [];

  constructor( private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo(){

    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;

    });

  }

  private cargarEquipo(){

    this.http.get('https://angular-template-e50e3-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: InfoEquipo) => {

      this.equipo = resp;
      // console.log(resp);

    });

  }
}
