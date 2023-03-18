import { NgModule } from "@angular/core"; 
import { Routes, RouterModule } from '@angular/router'; 

import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component'; 
import { PasswordRecoverComponent } from './components/password-recover/password-recover.component'; 

//mapeamento de rotas 
const routes: Routes = [ 
    { path: '', pathMatch: 'full', redirectTo: 'login' }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'password-recover', component: PasswordRecoverComponent } 
]; 

//registrando as rotas 
@NgModule({ 
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
}) 
export class AppRoutingModule { }