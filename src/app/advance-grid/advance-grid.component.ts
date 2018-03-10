import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer, Host, ComponentRef, AfterViewInit, AfterViewChecked, NgZone, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription, Observable, Observer } from 'rxjs';

import { AdvColumn } from './models/adv-column.model';
import { AdvRowComponent } from './adv-row/adv-row.component';
import { CellItemEvent } from './models/adv-row.model';
declare var $: any;
@Component({
  selector: 'advance-grid',
  templateUrl: './advance-grid.component.html',
  styleUrls: ['./advance-grid.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class AdvanceGridComponent implements OnInit {
  @ViewChildren(AdvRowComponent) rowComponents: QueryList<AdvRowComponent>;
  focusedRow: AdvRowComponent;
  /* Settings */
  @Input() readOnly: boolean = true;
  @Input() maxRows: number = 0;
  @Input() colWidth: string = '';
  @Input() rowHeight: string = '41px';
  @Input() serialEnabled: boolean = true;
  @Input() selectEnabled: boolean = true;
  @Input() selectAllEnabled: boolean = true;
  @Input() headerVisible: boolean = true;
  
  /* Data Property Configurations */
  @Input() serialField: string = "_advance_grid_component_serial";
  @Input() selectField: string = "_advance_grid_component_select";
  @Input() keyField: string = "";
  @Input() cssClass: string = "";
  /* Data */
  @Input() columns: AdvColumn[] = [];
  _dataSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Input()
  set dataSource(value: any[]) {
    this._dataSource.next(value);
  }
  get dataSource(): any[] {
    return this._dataSource.getValue();
  }
  

  /* Behaviour Fields */
  private subscription: Subscription;
  /**
   * Constructor & Initializations
   */
  constructor(private _el: ElementRef) { }

  ngOnInit() {
    this.subscription = this._dataSource
      .subscribe((value: any[]) => {
        
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDocumentClick(event) {
    var hasClass = $(<any>event.target).hasClass('advance-grid-table-cell');
    
    if (!this._el.nativeElement.contains(event.target) && !hasClass) {
      this.focusedRow = null;
      this.closeEdit();
    }
  }

  nextCellRequest_Handler(e: CellItemEvent) {
    
    if (e.row >= this.dataSource.length)
      e.row = 0;
    if (this.focusedRow != null)
      this.focusedRow.closeCellEdit(e.column, e.row);
    this.setFocusedRow(e.row);
    var save_this = this;
    window.setTimeout(function () {
      save_this.focusedRow.openEditByCell(e.column);
    }, 100);
    
  }

  rowHovered_Handler(rowIndex: number) {
    
    //if (this.focusedRow != null && this.focusedRow.focusedColumn != null && this.focusedRow.focusedColumn.editingCell)
    //  return;
    this.openEdit(rowIndex);
  }

  setFocusedRow(rowIndex: number) {
    if (this.focusedRow == null || this.focusedRow.rowIndex != rowIndex) {
      var arr = this.rowComponents.toArray();
      this.focusedRow = arr[rowIndex];
    }
  }

  openEdit(rowIndex: number) {
    
    if (this.focusedRow != null && this.focusedRow.rowIndex != rowIndex)
      this.focusedRow.closeEdit();

    if (this.focusedRow == null || this.focusedRow.rowIndex != rowIndex) {
      this.setFocusedRow(rowIndex);
      this.focusedRow.openEdit();
    }
    
  }

  closeEdit() {
    
    this.rowComponents.forEach(function (item) {
      item.closeEdit();
    }); 
  }

}
