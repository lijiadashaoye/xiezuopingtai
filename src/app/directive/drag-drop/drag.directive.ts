import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input
} from '@angular/core';
import {
  DragDropService
} from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][draggedClass][dropTag][dragData]'
})
export class DragDirective {
  private _isDraggable = false;
  @Input() draggedClass: string;
  @Input() dragData: any;
  @Input() dragTag: string;

  @Input('app-draggable') // @Input()后接set 和 get，表示调用或设置小括
  set isDraggables(val: boolean) { // 号('app-draggable')的属性时，执行set或get方法来确认属性值
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`)
  }
  get isDraggables() {
    return this._isDraggable;
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {}
  @HostListener('dragstart', ['$event'])
  // 函数名可以随便取
  onDragStart(ev: Event) {
    if (this.el.nativeElement == ev.target) {
      this.service.setDragData({
        tag: this.dragTag,
        data: this.dragData
      })
      this.rd.addClass(this.el.nativeElement, this.draggedClass)
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement == ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }
}
