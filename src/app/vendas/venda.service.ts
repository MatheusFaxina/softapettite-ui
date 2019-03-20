import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Pedido, Categoria } from './../core/model';

export class VendaFiltro {
  dataCriacaoDe: Date;
  dataCriacaoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class VendaService {

  vendasUrl: string;

  constructor(private http: MoneyHttp) {
    this.vendasUrl = `${environment.apiUrl}/vendas`;
  }

  adicionar(produto: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(this.vendasUrl, produto)
      .toPromise();
  }

  pesquisar(filtro: VendaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.dataCriacaoDe) {
      params.set('dataCriacaoDe', moment(filtro.dataCriacaoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataCriacaoAte) {
      params.set('dataCriacaoAte', moment(filtro.dataCriacaoAte).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.vendasUrl}`, { params })
     .toPromise()
     .then(response => {
      const vendas = response.content;

      const resultado = {
        vendas,
        total: response.totalElements
      };

      return resultado;
    })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.vendasUrl)
      .toPromise()
      .then(response => response.content);
  }

  cancelar(codigo: number): Promise<void> {
    return this.http.put(`${this.vendasUrl}/${codigo}/cancelar`, null)
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(codigo: number): Promise<Pedido> {
    return this.http.get<Pedido>(`${this.vendasUrl}/${codigo}`)
      .toPromise();
  }

  produtosPorCategoria(codigo: number): Promise<Categoria> {
    return this.http.get<Categoria>(`${this.vendasUrl}/produtoPorCategoria/${codigo}`)
      .toPromise();
  }

}
