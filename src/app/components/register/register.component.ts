import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  //método construtor
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {
  }

  //estrutura do formulário
  formRegister = new FormGroup({
    //campo 'nome'
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)
    ]),
    //campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    //campo 'senha'
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,./?]).{8,20}$/)
    ]),
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    //incluindo as validações customizadas do formulário
    validators: [
      PasswordMatchValidator.MatchPassword
    ]
  });

  //função para verificar a validação dos campos
  get form(): any {
    //retornar todos os controles do formulário (FormControl)
    return this.formRegister.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    //requisição
    let requestBody = {
      nome: this.formRegister.value.nome,
      email: this.formRegister.value.email,
      senha: this.formRegister.value.senha
    };

    //enviando uma requisição HTTP POST para a API
    this.httpClient.post(
      'http://appcontatos1-001-site1.gtempurl.com/api/criar-conta', //endpoint
      requestBody //dados da requisição
    )
      .subscribe({ //capturando o retorno (promisse) da API
        next: (data) => { //obtendo a resposta de sucesso da API
          console.log(data);
        },
        error: (e) => { //obtendo a resposta de erro da API
          console.log(e.error);
        }
      })


  }


}