import { Component, OnInit } from '@angular/core';
import { RecargaService } from './recarga.service';
//import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recargas';

  //datos
  data: Array<any> = [];
  personas: Array<any> = [];

  //recarga
  id: number = 0;
  valor: number = 0;
  celular: string = "";
  operador: string = "";
  personaId: number = 0;


  //promesa
  spinner: boolean = false;
  btnGuardar: string = "Guardar"

  cantidadTigo: number = 0;
  cantidadMovistar: number = 0;
  cantidadComcel: number = 0;
  cantidadUff: number = 0;
  valorTigo: number = 0;
  valorMovistar: number = 0;
  valorComcel: number = 0;
  valorUff: number = 0;

  constructor(private recagaService: RecargaService) { }


  ngOnInit(): void {
    this.list();
    this.getCompanies();
  }

  list(): void {
    //consultar datos
    this.recagaService.listRecargas().subscribe({
      next: (data: any) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.data = datos;

        //apagar spinner
        this.spinner = false;

        if (this.data.length > 0) {

          for (let index = 0; index < this.data.length; index++) {

            switch (this.data[index].operador) {
              case "Tigo":

                this.cantidadTigo = this.cantidadTigo + 1;
                this.valorTigo = this.data[index].valor + this.valorTigo;

                break;
              case "Comcel":

                this.cantidadComcel = this.cantidadComcel + 1;
                this.valorComcel = this.data[index].valor + this.valorComcel;

                break;

              case "Movistar":

                this.cantidadMovistar = this.cantidadMovistar + 1;
                this.valorMovistar = this.data[index].valor + this.valorMovistar;
                break;

              case "UFF":

                this.cantidadUff = this.cantidadUff + 1;
                this.valorUff = this.data[index].valor + this.valorUff;
                break;
            }

          }


        }

      },
      error: (e: any) => {
        //apagar spinner
        this.spinner = false;

        //Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });

  }

  getCompanies(): void {

    //reiniciar data
    this.personas = [];

    //consultar datos
    this.recagaService.getPersonas().subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.personas = datos;

      },
      error: (e) => {
        //Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });

  }

  refresh() {
    this.clean();
    this.list();
  }

  create(): void {
    //iniciar
    this.btnGuardar = "Guardando...";

    let json = {
      valor: this.valor,
      celular: this.celular,
      operador: this.operador,
      persona_id: this.personaId,
    };

    this.recagaService.create(json).subscribe({
      next: (data) => {
        document.getElementById("closeModalCreate")?.click();
        //Swal.fire('Guardado', 'Registro creado con éxito', 'success');
        this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          //Swal.fire("Error en el proceso", '', "error");
        }

        // if (error.status == 422) {
        //   if (error.error.codigo) {
        //     this.errorCodigo = error.error.codigo;
        //     this.isCodigo = true;
        //   }
        // }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list();
    }, 3000);


  }

  getDisable(): boolean {
    if (this.valor == 0 || this.operador == "" || this.personaId == 0) {
      return true;
    } else {
      return false;
    }
  }


  clean(): void {
    this.id = 0;
    this.valor = 0;
    this.operador = "";
    this.personaId = 0;
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    // this.errorCodigo = "";
    // this.isCodigo = false;
    // this.btnGuardar = "Guardar";
  }

  cleanAll(): void {
    this.clean();
    this.cleanErrors();
  }
}


