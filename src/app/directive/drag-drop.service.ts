import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
export interface DragData {
  tag: string;
  data: any;
}
@Injectable()
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);
  setDragData(data: DragData) {
    this._dragData.next(data)
  }

  getDragData(): Observable<DragData> {
    // asObservable(),隐藏可观察序列的身份,无法使用next发出数据，只能被subject()。
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null)
  }
}
