import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contato } from 'src/app/shared/contato.model';
import { ContatosService } from 'src/app/shared/contatos.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss'],
  animations: [
    trigger('itemAnim', [
      // animacao de entrada
      transition('void => *', [
        // estado inicial
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        // incluir animacao p o espaceamento (altura e margem)
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingLeft: '*',
            paddingRight: '*',
          })
        ),
        animate(68),
      ]),

      transition('* => void', [
        // primeiro aumentar
        animate(
          50,
          style({
            transform: 'scale(1.05',
          })
        ),
        // entao diminui para o tamanho normal enquanto começa a sumir
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        // diminui e some completamente
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        // entao animar o espaceamento (altura, margem e padding)
        animate(
          '150ms ease-out',
          style({
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-bottom': '0',
          })
        ),
      ]),
    ]),

    trigger('listaAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class ListaContatosComponent implements OnInit {

  contatos: Contato[] = new Array<Contato>();
  contatosFiltrados: Contato[] = new Array<Contato>();

  @ViewChild('filtrarInput') filtrarInputElRef: ElementRef<HTMLInputElement>;

  constructor(private contatosService: ContatosService) {}

  ngOnInit(): void {
    // queremos retornar todos os contatos do ContatosService
    this.contatos = this.contatosService.getAll();

    this.contatosFiltrados = this.contatosService.getAll();
    
  }

  excluirContato(contato: Contato) {
    let contatoId = this.contatosService.getId(contato);
    this.contatosService.excluir(contatoId);
    this.filtrar(this.filtrarInputElRef.nativeElement.value);
  }

  gerarContatoURL(contato: Contato) {
    let contatoId = this.contatosService.getId(contato);
    return contatoId;
  }

  filtrar(query: string) {
    query = query.toLowerCase().trim();

    let todosResult: Contato[] = new Array<Contato>();

    // dividir a pesquisa em palavras individuais
    let termos: string[] = query.split(' '); // dividir nos espaços
    // remover termos duplicados
    termos = this.removerDuplicados(termos);
    // incluir todos resultados relevantes para a array todosResult
    termos.forEach(termo => {
      let resultados: Contato[] = this.contatosRelevantes(termo);
      
      // passe os resultados para a array todosResult
      todosResult = [...todosResult, ...resultados]
    });

    // todosResult vai incluir contatos duplicados
    // pq um contato específico pode ser o resultado de diversas pesquisas
    // mas nao se deve mostrar o mesmo contato multiplas vezes na interface
    // entao removemos os duplicados
    let resultUnicos = this.removerDuplicados(todosResult);
    this.contatosFiltrados = resultUnicos;

  }

  removerDuplicados(arr: Array<any>): Array<any> {
    let resultUnicos: Set<any> = new Set<any>(); // utilizando set pois nao permite valores duplicados
    // loop no array que vem como argumento e add os itens ao set
    arr.forEach((e) => resultUnicos.add(e));

    return Array.from(resultUnicos);
  }

  contatosRelevantes(query: any) : Array<Contato> {
    query = query.toLowerCase().trim();
    let contatosRelevantes = this.contatos.filter((contato) => {
      if (
        contato.nome.toLowerCase().includes(query) ||
        contato.email.toLowerCase().includes(query) ||
        contato.tel.toLowerCase().includes(query)
      ) {
        return true;
      }
      return false;
    });
    return contatosRelevantes;
  }
}

