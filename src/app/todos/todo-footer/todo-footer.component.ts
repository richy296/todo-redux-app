import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as Actions from '../../filtro/filtro.actions';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  public filtroActual: Actions.filtrosValidos;
  public filtros: Actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  public pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro')
    //     .subscribe(filtro => this.filtroActual = filtro);

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: Actions.filtrosValidos): void{
    this.store.dispatch(Actions.setFiltro({filtro}));
  }

  borrarCompletados(): void{
    this.store.dispatch(borrarCompletados());
  }

}
