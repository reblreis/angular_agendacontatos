import { Component, OnInit } from '@angular/core';
import { ContatosService } from 'src/app/services/contatos.service';
import { ConsultarContatos } from 'src/app/models/consultar-contatos.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-contatos',
  templateUrl: './consultar-contatos.component.html',
  styleUrls: ['./consultar-contatos.component.css']
})
export class ConsultarContatosComponent implements OnInit {

  //atributos
  contatos: ConsultarContatos[] = [];
  filtro: any = { nome: ''};
  pagina: number = 1;

  //construtor
  constructor(
    private contatosService: ContatosService, //injeção de dependência
    private spinner: NgxSpinnerService //injeção de dependência
  ) {
  }

  //evento executado antes do componente carregar
  ngOnInit(): void {

    this.spinner.show();

    this.contatosService.getAll()
      .subscribe({
        next: (data) => {
          this.contatos = data;
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(() => {
        this.spinner.hide();
      })
  }

  //função utilizada pelo componente de paginação sempre
  //que o usuário alternar para uma nova página (próxima ou anterior)
  pageChange(event: any): void {
    this.pagina = event;
  }
}