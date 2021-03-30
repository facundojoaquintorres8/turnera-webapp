import { Component, Input } from '@angular/core';
import { IHeader, InputTypeEnum } from './table.models';

@Component({
    selector: 'app-table-body',
    templateUrl: './table-body.component.html'
})
export class TableBodyComponent {

    @Input() header!: IHeader;
    @Input() item!: any;

    inputType: any = InputTypeEnum;

    constructor() {}
}
