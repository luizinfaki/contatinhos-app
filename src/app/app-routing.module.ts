import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarContatosComponent } from './pages/editar-contatos/editar-contatos.component';
import { ListaContatosComponent } from './pages/lista-contatos/lista-contatos.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  // setando a pagina "inicial" para o componente MainLayout
  { path: '', component: MainLayoutComponent, children: [
    // "injetando" o componente ListaContatos no MainLayout
    { path: '', component: ListaContatosComponent },
    { path: 'novo', component: EditarContatosComponent },
    { path: ':id', component: EditarContatosComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
