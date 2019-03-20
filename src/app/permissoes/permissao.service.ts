import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Permissao } from 'app/core/model';

export class PermissaoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PermissaoService {

  permissaosUrl: string;

  constructor(private http: MoneyHttp) {
    this.permissaosUrl = `${environment.apiUrl}/permissaos`;
  }

  pesquisar(filtro: PermissaoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.permissaosUrl}`, { params })
      .toPromise()
      .then(response => {
        const permissaos = response.content;

        const resultado = {
          permissaos,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.permissaosUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.permissaosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(permissao: Permissao): Promise<Permissao> {
    return this.http.post<Permissao>(this.permissaosUrl, permissao)
      .toPromise();
  }

  atualizar(permissao: Permissao): Promise<Permissao> {
    return this.http.put<Permissao>(`${this.permissaosUrl}/${permissao.codigo}`, permissao)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Permissao> {
    return this.http.get<Permissao>(`${this.permissaosUrl}/${codigo}`)
      .toPromise();
  }

}
