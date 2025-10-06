import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { WidgetStateWithData } from '../state-switcher.model';

export function withState<T>(mapper?: (data: T) => T): (source$: Observable<T>) => Observable<WidgetStateWithData<T>> {
  return (source$: Observable<T>): Observable<WidgetStateWithData<T>> =>
    source$.pipe(
      map(data => ({
        isEmpty: !data || (Array.isArray(data) && data.length === 0),
        isLoading: false,
        error: false,
        data: mapper ? mapper(data) : data
      })),
      catchError((err: any) =>
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
