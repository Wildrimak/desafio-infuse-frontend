import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credito } from '../models/credito.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    buscarPorNumeroNfse(numeroNfse: string): Observable<Credito[]> {
        return this.http.get<Credito[]>(`${this.apiUrl}/${numeroNfse}`);
    }

    buscarPorNumeroCredito(numeroCredito: string): Observable<Credito> {
        return this.http.get<Credito>(`${this.apiUrl}/credito/${numeroCredito}`);
    }

}
