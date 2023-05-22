import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardModel } from "../models/dashboard.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    get(): Observable<DashboardModel[]> {
        return this.httpClient.get<DashboardModel[]>
            (environment.apiContatos + "/dashboard");
    }
}