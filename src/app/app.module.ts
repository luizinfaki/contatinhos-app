import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaContatosComponent } from './pages/lista-contatos/lista-contatos.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { CardContatoComponent } from './card-contato/card-contato.component';
import { EditarContatosComponent } from './pages/editar-contatos/editar-contatos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaContatosComponent,
    MainLayoutComponent,
    CardContatoComponent,
    EditarContatosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
