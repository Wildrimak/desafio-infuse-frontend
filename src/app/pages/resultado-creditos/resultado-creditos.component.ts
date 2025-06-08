import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resultado-creditos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-creditos.component.html',
  styleUrls: ['./resultado-creditos.component.scss']
})
export class ResultadoCreditosComponent implements OnInit {
  credito: Credito | undefined;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private creditoService: CreditoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.route.paramMap.subscribe(params => {
      const numeroCredito = params.get('numeroCredito');
      if (numeroCredito) {
        this.creditoService.buscarPorNumeroCredito(numeroCredito).subscribe({
          next: (data: Credito) => {
            this.credito = data;
            this.carregando = false;
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error, 'Erro ao buscar detalhes do crédito:');
            this.carregando = false;
          }
        });
      } else {
        this.mensagemErro = 'Número do crédito não fornecido na URL.';
        this.carregando = false;
      }
    });
  }

  private handleError(error: HttpErrorResponse, contextMessage: string): void {
    console.error(contextMessage, error);
    if (error.error instanceof ErrorEvent) {
      this.mensagemErro = `Erro: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object' && 'message' in error.error) {
      this.mensagemErro = `Erro: ${error.error.message}`;
    } else if (error.status === 404) {
      this.mensagemErro = `Nenhum crédito encontrado com o número informado.`;
    } else {
      this.mensagemErro = `Erro de comunicação com o servidor: ${error.status} - ${error.statusText || 'Erro desconhecido'}.`;
    }
  }

  voltar(): void {
    this.location.back();
  }
  
}
