import { Observable, OperatorFunction, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { DEFAULT_LIST_STATE, WidgetState } from './state-switcher.model';
import { getDefaultEmptyHandler } from './utils/widget-state';

interface StateSwitcherStateManageOptions<T> {
  id?: string;
  emptyHandler?: (data: T) => boolean;
}

export class StateSwitcherState {
  private stateDispatcher$ = new ReplaySubject<Partial<WidgetState>>(this.replayTimes);
  private sourceStates = new Map<string, Partial<WidgetState>>();

  private stateChange$ = this.stateDispatcher$.pipe(
    startWith(DEFAULT_LIST_STATE),
    scan(
      (stored, updated) => ({
        ...stored,
        ...updated
      }),
      DEFAULT_LIST_STATE
    )
  );

  public get state$(): Observable<WidgetState> {
    return this.stateChange$;
  }

  constructor(private readonly replayTimes: number = 1) { }

  public getMulticastState(): Observable<WidgetState> {
    return this.stateChange$.pipe(
      map((state) => {
        const values = [...this.sourceStates.values()];

        if (!values.length) {
          return state;
        }

        const isLoading = values.some((state) => state.isLoading);
        const isEmpty = values.every((state) => state.isEmpty);
        const errorStates = values
          .filter((state) => state.error);

        const error = errorStates.length > 0
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ? errorStates[0].error!
          : false;

        return {
          isLoading,
          isEmpty,
          error
        };
      }),
      shareReplay(1)
    );
  }

  public setState(state: Partial<WidgetState>, id?: string): void {
    if (id) {
      this.sourceStates.set(id, {
        ...this.sourceStates.get(id) || {},
        ...state
      });
    }

    this.stateDispatcher$.next(state);
  }

  // custom rxjs operator
  public manageState<T>(options?: StateSwitcherStateManageOptions<T>): OperatorFunction<T, T> {
    const id = options?.id;
    const state = { isLoading: true, error: false };

    this.setState(state, id);

    const emptyHandler = options?.emptyHandler ?? getDefaultEmptyHandler();

    return (source: Observable<T>) => source.pipe(
      tap((data) => {
        this.setState({
          isLoading: false,
          isEmpty: emptyHandler(data)
        }, id);
      }),
      catchError((err) => {
        this.setState({
          isLoading: false,
          error: true
        }, id);

        return throwError(() => err);
      }),
      finalize(() => this.setState({ isLoading: false }, id))
    );
  }
}
