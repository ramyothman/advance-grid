import { Component } from '@angular/core';
import { AdvColumn } from './advance-grid/models/adv-column.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  order = {
    userName: "chin",
    password: "123456",
    token: "anything",
    po_id: 1001,
    branch_code: "JETMY",
    supplier_id: "INV",
    supplier_code: 1001,
    reference_no: "20",
    remarks: "200",
    po_date: "Aug 6, 2012 9:58:28 PM",
    order_type: "PENDING",
    itemList: [
      {
        pkids: "1001",
        code_reference: "anything",
        code: "XYZ",
        item_code: "X1000",
        item_type: "INV",
        qty: 1,
        unit_price: 120
      },
      {
        pkids: "1003",
        code_reference: "anything",
        code: "XYZ",
        item_code: "X1010",
        item_type: "INV",
        qty: 10,
        unit_price: 220
      },
      {
        pkids: "1004",
        code_reference: "anything",
        code: "XYZ",
        item_code: "X1002",
        item_type: "INV",
        qty: 2,
        unit_price: 200
      },
      {
        pkids: "1005",
        code_reference: "anything",
        code: "XYZ",
        item_code: "X1003",
        item_type: "INV",
        qty: 3,
        unit_price: 250
      },
      {
        pkids: "1006",
        code_reference: "anything",
        code: "XYZ",
        item_code: "X1004",
        item_type: "INV",
        qty: 5,
        unit_price: 100
      }
    ]
  }

  columns = [
    {
      name: "pkids",
      dataType: "string",
      fieldType: "input",
      
    },
    {
      name: "qty",
      dataType: "number",
      fieldType: "input",
      width: '100px'
    },
    {
      name: "unit_price",
      dataType: "number",
      fieldType: "input",
      width: '100px',
    },
    {
      name: "item_type",
      dataType: "string",
      fieldType: "dropdown",
      width: '100px'
    }
  ];
}
