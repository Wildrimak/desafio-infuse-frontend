import { Routes } from '@angular/router';
import { ConsultaCreditosComponent } from './pages/consulta-creditos/consulta-creditos.component';
import { ResultadoCreditosComponent } from './pages/resultado-creditos/resultado-creditos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'consulta', pathMatch: 'full' },
    { path: 'consulta', component: ConsultaCreditosComponent },
    { path: 'detalhes/:numeroCredito', component: ResultadoCreditosComponent },
    { path: '**', redirectTo: 'consulta' }
];
   