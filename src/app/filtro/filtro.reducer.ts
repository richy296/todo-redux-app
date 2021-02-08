import { createReducer, on, Action } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';

export const initialState: filtrosValidos = 'todos';

const _filtroReducer = createReducer(
    initialState,
    on(setFiltro, (state, {filtro}) => filtro),
  );

export function filtroReducer(state, action: Action): any {
    return _filtroReducer(state, action);
}
