import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, Renderer, Host, ComponentRef, AfterViewInit, AfterViewChecked, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription, Observable, Observer } from 'rxjs';
import { CellItemEvent } from './../models/adv-row.model';
import { AdvColumn } from './../models/adv-column.model';
declare var $: any;
@Component({
  selector: '[adv-column]',
  templateUrl: './adv-column.component.html',
  styleUrls: ['./adv-column.component.scss']
})
export class AdvColumnComponent implements OnInit {
  @Input() readOnly: boolean = true;
  @Input() column: AdvColumn;
  @Input() row: any;
  @Input() rowIndex: number;
  @Input() columnIndex: number;
  @Input() editMode: boolean = false;

  @Input() cellClicked: BehaviorSubject<CellItemEvent>;
  editingCell: boolean = false;
  get editorName(): string {
    return 'ag_edit_element_cell_' + this.rowIndex + '_' + this.columnIndex;
  }
  get editor(): any{
    return $('#' + this.editorName);
  }
  constructor(private cd: ChangeDetectorRef,private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.cellClicked.subscribe(event => {
      // called when the notifyChildren method is
      // called in the parent component
      
      if (event.column == this.columnIndex && event.row == this.rowIndex) {
        
        this.openEditFocus();
      }
    });
  }

  openEdit() {
    this.editMode = true;
    this.cd.detectChanges();
  }

  closeEdit() {
    
    this.editMode = false;
    this.editingCell = false;
    this.cd.detectChanges();
  }

  openEditFocus() {
    this.openEdit();
    
    this.editor.focus(function () {
    var save_this = $(this);
    window.setTimeout(function () {
        save_this.select();
      }, 0);
      //set flag for preventing MOUSEUP event....
      //$(this).data("preventMouseUp", true);
    });

    //this.editor.mouseup(function (e) {
    //  var preventEvent = $(this).data("preventMouseUp");

    //  //only prevent default if the flag is TRUE
    //  if (preventEvent) {
    //    e.preventDefault();
    //  }

    //  //reset flag so MOUSEUP event deselect the text
    //  $(this).data("preventMouseUp", false);
    //});
    this.editor.focus();
    this.editingCell = true;
    //this.editor.select();
  }

  ngOnDestroy() {
    // needed if child gets re-created (eg on some model changes)
    // note that subsequent subscriptions on the same subject will fail
    // so the parent has to re-create parentSubject on changes
    this.cellClicked.unsubscribe();
  }

}
