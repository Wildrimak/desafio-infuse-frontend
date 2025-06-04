import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-creditos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './consulta-creditos.component.html',
  styleUrls: ['./consulta-creditos.component.scss']
})
export class ConsultaCreditosComponent implements AfterViewInit {
  termoBusca: string = '';
  displayedColumns: string[] = ['numeroCredito', 'numeroNfse', 'dataConstituicao', 'valorIssqn', 'tipoCredito', 'acoes'];
  dataSource = new MatTableDataSource<Credito>([]);
  mensagemErro: string = '';
  carregando: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private creditoService: CreditoService, private router: Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  consultarCreditos(): void {
    this.dataSource.data = [];
    this.mensagemErro = '';
    this.carregando = true;

    if (this.termoBusca.trim() === '') {
      this.mensagemErro = 'Por favor, digite um número de NFS-e ou de Crédito.';
      this.carregando = false;
      return;
    }

    this.creditoService.buscarPorNumeroNfse(this.termoBusca).subscribe({
      next: (data: Credito[]) => {
        if (data && data.length > 0) {
          this.dataSource.data = data;
          this.carregando = false;
        } else {
          this.buscarPorNumeroCredito();
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.buscarPorNumeroCredito();
        } else {
          this.handleError(error, 'Erro ao buscar créditos por NFS-e:');
          this.carregando = false;
        }
      }
    });

  }

  private buscarPorNumeroCredito(): void {
    
    this.creditoService.buscarPorNumeroCredito(this.termoBusca).subscribe({
      next: (creditData: Credito) => {
        if (creditData) {
          this.dataSource.data = [creditData];
        } else {
          this.mensagemErro = 'Nenhum crédito encontrado para a sua busca.';
        }
        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.mensagemErro = 'Nenhum crédito encontrado para a sua busca.';
        } else {
          this.handleError(error, 'Erro ao buscar crédito por número do crédito:');
        }
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
    } else {
      this.mensagemErro = `Erro de comunicação com o servidor: ${error.status} - ${error.statusText || 'Erro desconhecido'}.`;
    }

  }

  verDetalhes(numeroCredito: string): void {
    this.router.navigate(['/detalhes', numeroCredito]);
  }

}