import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as Actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef<HTMLInputElement>;

  public chkCompletado: FormControl;
  public txtInput: FormControl;

  public editando: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(Actions.toggle({id: this.todo.id}));
    });
  }

  editar(): void {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(): void{
    this.editando = false;

    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }

    this.store.dispatch(
      Actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );
  }

  borrar(): void{
    this.store.dispatch(Actions.borrar({id: this.todo.id}));
  }

}
