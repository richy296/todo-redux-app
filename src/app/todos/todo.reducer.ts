import { Action, createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje Irnoman'),
    new Todo('Robar escudo del Capitán América'),
];

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, { texto }) => ([...state, new Todo(texto)])),
    on(borrar, (state, {id}) => state.filter( todo => todo.id !== id)),
    on(borrarCompletados, (state) => state.filter( todo => !todo.completado)),
    on(toggleAll, (state, {completado}) => state.map(todo => {

            return {
                ...todo,
                completado // texto: texto
            };

    }) ),
    on(toggle, (state, { id }) => {
        return state.map(todo => {

            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                };
            } else {
                return todo;
            }
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map(todo => {

            if (todo.id === id) {
                return {
                    ...todo,
                    texto // texto: texto
                };
            } else {
                return todo;
            }
        });
    }),
);

export function todoReducer(state, action: Action): any {
    return _todoReducer(state, action);
}
