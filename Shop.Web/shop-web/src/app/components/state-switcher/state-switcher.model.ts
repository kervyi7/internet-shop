export const DEFAULT_LIST_STATE: WidgetState = { isLoading: true, isEmpty: true, error: false };

export interface WidgetState {
  isEmpty?: boolean | null;
  isLoading: boolean;
  error?: boolean | null;
}

export interface WidgetStateWithData<T> extends WidgetState {
  data?: T;
}

export enum CurrentWidgetState {
  EMPTY = 'empty',
  ERROR = 'error',
  LOADING = 'loading',
  DEFAULT = 'default',
  LOADING_OVERLAY = 'loading_overlay'
}
