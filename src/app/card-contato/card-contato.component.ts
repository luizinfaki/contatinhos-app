import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.scss']
})
export class CardContatoComponent implements OnInit {


  @Input() nome: string;
  @Input() email: string;
  @Input() tel: string;
  @Input() link: string;

  @Output('excluir') excluirEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  cliqueBotaoX() {
    this.excluirEvent.emit();
  }

}
