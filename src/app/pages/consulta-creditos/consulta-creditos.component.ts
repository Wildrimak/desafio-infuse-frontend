import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-creditos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-creditos.component.html',
  styleUrls: ['./consulta-creditos.component.scss']
})
export class ConsultaCreditosComponent {
  termoBusca: string = '';
  creditos: Credito[] = [];
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(private creditoService: CreditoService, private router: Router) {}

  consultarCreditos(): void {
    this.creditos = [];
    this.mensagemErro = '';
    this.carregando = true;

    if (this.termoBusca.trim() === '') {
      this.mensagemErro = 'Por favor, digite um número de NFS-e ou de Crédito.';
      this.carregando = false;
      return;
    }

    this.creditoService.buscarPorNumeroNfse(this.termoBusca).subscribe({
      next: (data: Credito[]) => {
        if (data?.length) {
          this.creditos = data;
        } else {
          this.buscarPorNumeroCredito();
        }
        this.carregando = false;
      },
      error: () => {
        this.buscarPorNumeroCredito();
      }
    });
  }

  private buscarPorNumeroCredito(): void {
    this.creditoService.buscarPorNumeroCredito(this.termoBusca).subscribe({
      next: (data: Credito) => {
        if (data) {
          this.creditos = [data];
        } else {
          this.mensagemErro = 'Nenhum crédito encontrado para a sua busca.';
        }
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Nenhum crédito encontrado para a sua busca.';
        this.carregando = false;
      }
    });
  }

  verDetalhes(numeroCredito: string): void {
    this.router.navigate(['/detalhes', numeroCredito]);
  }

}
