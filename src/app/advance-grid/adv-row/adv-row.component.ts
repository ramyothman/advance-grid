import { Component, OnInit, Input, Output, QueryList, EventEmitter, ElementRef, Renderer, Host, ComponentRef, AfterViewInit, AfterViewChecked, NgZone, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription, Observable, Observer } from 'rxjs';
import { CellItemEvent } from './../models/adv-row.model';
import { AdvColumn } from './../models/adv-column.model';
import { AdvColumnComponent } from './../adv-column/adv-column.component'

@Component({
  selector: '[adv-row]',
  templateUrl: './adv-row.component.html',
  styleUrls: ['./adv-row.component.scss']
})
export class AdvRowComponent implements OnInit {
  @ViewChildren(AdvColumnComponent) columnComponents: QueryList<AdvColumnComponent>;
  /* Settings */
  @Input() readOnly: boolean = true;
  @Input() colWidth: string = '';
  @Input() rowHeight: string = '41px';
  @Input() serialEnabled: boolean = true;
  @Input() selectEnabled: boolean = true;

  /* Data Property Configurations */
  @Input() serialField: string = "_advance_grid_component_serial";
  @Input() selectField: string = "_advance_grid_component_select";

  /* Data */
  @Input() columns: AdvColumn[] = [];
  @Input() row: any;
  @Input() rowIndex: number;
  
  @Output() nextCellRequest: EventEmitter<CellItemEvent> = new EventEmitter<CellItemEvent>();
  focusedColumn: AdvColumnComponent;
  /* Forward Event Fields */
  cellClicked: BehaviorSubject<CellItemEvent> = new BehaviorSubject<CellItemEvent>({column: -1, row:-1});
  /**
   * @param el
   * @param renderer
   */
  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  cellClick_EventHandler(columnIndex: number) {

    
    //this.setFocusedColumn(columnIndex);
    
    //this.cellClicked.next({ column: columnIndex, row: this.rowIndex });
    
    this.nextCellRequest.emit({ column: columnIndex, row: this.rowIndex });
  }

  setFocusedColumn(columnIndex: number) {
    if (this.focusedColumn == null || this.focusedColumn.columnIndex != columnIndex) {
      var arr = this.columnComponents.toArray();
      this.focusedColumn = arr[columnIndex];
    }
  }

  keyDown_EventHandler(e, columnIndex: number) {
    
    var that = this;
    if (e.keyCode == 13) {
      this.nextCellRequest.emit({ column: columnIndex, row: this.rowIndex + 1 });
      e.stopPropagation();
    }
    else if (e.keyCode == 9) {
      var nextColumn = columnIndex + 1;
      var nextRow = this.rowIndex;
      if (nextColumn == this.columns.length) {
        nextColumn = 0;
        nextRow++;
      }
        
      this.nextCellRequest.emit({ column: nextColumn, row: nextRow });
      e.stopPropagation();
    }
  }

  openEditByCell(columnIndex: number) {
    if (this.focusedColumn != null && this.focusedColumn.columnIndex == columnIndex && this.focusedColumn.editMode)
      return;
    this.setFocusedColumn(columnIndex);
    if (this.focusedColumn != null) {
      this.focusedColumn.openEditFocus();  
    } 
  }

  closeCellEdit(columnIndex: number, rowIndex: number) {
    var differentRow = this.focusedColumn.columnIndex != columnIndex || this.rowIndex != rowIndex;
    if (this.focusedColumn != null && differentRow) {
      this.focusedColumn.closeEdit();
    }
  }

  getWidthStyle(width: string): any {
    
    if (width == undefined || width == null || width == '')
      return;
    return { 'width': width };
  }

  openEdit() {
    console.log('row open edit' + this.rowIndex);
    this.columnComponents.forEach(function (item) {
      item.openEdit();
    }); 
  }
  closeEdit() {
    
    this.focusedColumn = null;
    this.columnComponents.forEach(function (item) {
      item.closeEdit();
    });
    
  }

}
