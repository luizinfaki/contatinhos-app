import { Injectable } from '@angular/core';
import { Contato } from './contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  contatos: Contato[] = new Array<Contato>();
  result1: any;
  result2: any;

  constructor() {}

  getAll() {
    return this.contatos;
  }

  get(id: number) {
    return this.contatos[id];
  }

  getId(contato: Contato) {
    return this.contatos.indexOf(contato);
  }

  incluir(contato: Contato) {
    // adiciona um contato ao array de contatos e retorna o id do contato
    // id = indice
    let newTamanho = this.contatos.push(contato);
    let indice = newTamanho - 1;
    return indice;
  }

  alterar(id: number, nome: string, tel: string, email: string, obs: string) {
    let contato = this.contatos[id];
    contato.nome = nome;
    contato.tel = tel;
    contato.email = email;
    contato.obs = obs;
  }

  excluir(id: number) {
    this.contatos.splice(id, 1);
  }

  validar(email: string, tel: string): boolean {
    // vai checar se existe um contato na array de contatos, com atributos (tel/email) iguais aos inputs do formulario
    this.result1 = this.contatos.find((m) => m.email == email);
    this.result2 = this.contatos.find((m) => m.tel == tel);
    if (this.result1 === undefined && this.result2 === undefined) {
      // se ambos resultados retornarem "undefined", então não há, e valida o cadastro do contato
      return true;
    } else {
      // se pelo menos um resultado retornar um resultado, há um contato com o tel/email, e "cancela" o cadastro
      return false;
    }
  }
}
