import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { WidgetStateWithData } from '../state-switcher.model';

export function withState<T>(mapper?: (data: T) => T): (source$: Observable<T>) => Observable<WidgetStateWithData<T>> {
  return (source$: Observable<T>): Observable<WidgetStateWithData<T>> =>
    source$.pipe(
      map(data => {
        const mapped = mapper ? mapper(data) : data;
        return {
          isEmpty: mapped == null || (Array.isArray(mapped) && mapped.length === 0),
          isLoading: false,
          error: false,
          data: mapped
        };
      }),
      catchError(() =>
        of({
          isEmpty: true,
          isLoading: false,
          error: true,
          data: null
        })
      ),
      startWith({
        isEmpty: false,
        isLoading: true,
        error: false,
        data: null
      })
    );
}

export function getDefaultEmptyHandler<T>(): (data: T) => boolean {
  return (data: T) => Array.isArray(data) ? !data.length : !data;
}
