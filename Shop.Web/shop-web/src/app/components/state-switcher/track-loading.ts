import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function trackLoading(stream: Observable<unknown>): Observable<boolean> {
  const newSubject = new BehaviorSubject<boolean>(true);
  stream.pipe(finalize(() => newSubject.next(false))).subscribe();

  return newSubject.asObservable();
}
