import { HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Parcela } from 'app/core/model';

export class ParcelaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ParcelaService {

  parcelassUrl: string;

  constructor(private http: MoneyHttp) {
    this.parcelassUrl = `${environment.apiUrl}/parcelas`;
  }

  pesquisar(filtro: ParcelaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.parcelassUrl}`, { params })
      .toPromise()
      .then(response => {
        const parcelass = response.content;

        const resultado = {
          parcelass,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.parcelassUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.parcelassUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(parcelas: Parcela): Promise<Parcela> {
    return this.http.post<Parcela>(this.parcelassUrl, parcelas)
      .toPromise();
  }

  atualizar(parcelas: Parcela): Promise<Parcela> {
    return this.http.put<Parcela>(`${this.parcelassUrl}/${parcelas.codigo}`, parcelas)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Parcela> {
    return this.http.get<Parcela>(`${this.parcelassUrl}/${codigo}`)
      .toPromise();
  }

}
