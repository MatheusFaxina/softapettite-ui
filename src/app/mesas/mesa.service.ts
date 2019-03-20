import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Mesa } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class MesaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class MesaService {

  mesasUrl: string;

  constructor(private http: MoneyHttp) {
    this.mesasUrl = `${environment.apiUrl}/mesas`;
  }

  pesquisar(filtro: MesaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.mesasUrl}`, { params })
      .toPromise()
      .then(response => {
        const mesas = response.content;

        const resultado = {
          mesas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.mesasUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.mesasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(mesa: Mesa): Promise<Mesa> {
    return this.http.post<Mesa>(this.mesasUrl, mesa)
      .toPromise();
  }

  atualizar(mesa: Mesa): Promise<Mesa> {
    return this.http.put<Mesa>(`${this.mesasUrl}/${mesa.codigo}`, mesa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Mesa> {
    return this.http.get<Mesa>(`${this.mesasUrl}/${codigo}`)
      .toPromise();
  }

}
