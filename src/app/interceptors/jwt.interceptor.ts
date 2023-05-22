import { Injectable } from "@angular/core";
import { AutenticarHelper } from "../helpers/autenticar.helper";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

//lista de serviços que exigem autenticação
const urls = [
    environment.apiContatos + "/contatos",
    environment.apiContatos + "/dashboard"
];

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private autenticarHelper: AutenticarHelper
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //verificando se a chamada feita pelo HttpClient
        //é para um endereço de API que contenha /api/contatos
        if (urls.some(item => req.url.includes(item))) {

            //Capturar o Token gravado na localstorage
            let accessToken = this.autenticarHelper.getData()?.accessToken;

            //Adicionar o token no cabeçalho da requisição da API
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }

        //liberando a requisição
        return next.handle(req);
    }
}