import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecuperarSenhaRequest } from "../models/recuperar-senha.request.model";
import { Observable } from "rxjs";
import { RecuperarSenhaResponse } from "../models/recuperar-senha.response.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class RecuperarSenhaService {


    constructor(
        private httpClient: HttpClient
    ) {
    }


    //POST /api/recuperar-senha
    post(request: RecuperarSenhaRequest): Observable<RecuperarSenhaResponse> {
        return this.httpClient.post<RecuperarSenhaResponse>
            (environment.apiContatos + "/recuperar-senha", request);
    }
}