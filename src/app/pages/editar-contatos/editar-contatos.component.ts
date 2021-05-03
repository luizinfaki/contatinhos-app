import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contato } from 'src/app/shared/contato.model';
import { ContatosService } from 'src/app/shared/contatos.service';

@Component({
  selector: 'app-editar-contatos',
  templateUrl: './editar-contatos.component.html',
  styleUrls: ['./editar-contatos.component.scss'],
})
export class EditarContatosComponent implements OnInit {
  contato: Contato;
  contatoId: number;
  novo: boolean;
  novoTel: string;
  novoEmail: string;
  tempNum: number;

  constructor(
    private contatosService: ContatosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // saber se esta criando um novo contato ou editando um existente
    this.route.params.subscribe((params: Params) => {
      this.contato = new Contato();
      if (params.id) {
        this.contato = this.contatosService.get(params.id);
        this.contatoId = params.id;
        this.novo = false;
      } else {
        this.novo = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    // checa se o email e/ou telefones são unicos utilizando a funcao validar
    if(this.contatosService.validar(form.value.email, form.value.tel)) {
      // checa se é um novo contato, se não for, estará editando contato
      if (this.novo) {
        // salvar o contato
        this.tempNum = this.contatosService.incluir(form.value);
        this.novoTel = this.contatosService.contatos[this.tempNum].tel;
        this.novoEmail = this.contatosService.contatos[this.tempNum].email;
      } else {
        // alterar o contato
        this.contatosService.alterar(
          this.contatoId,
          form.value.nome,
          form.value.tel,
          form.value.email,
          form.value.obs
        );
      }
      this.router.navigateByUrl('/');
    } else {
      alert("E-mail e/ou telefone já cadastrados!")
    }
    

  }

  cancelar() {
    this.router.navigateByUrl('/');
  }
}
