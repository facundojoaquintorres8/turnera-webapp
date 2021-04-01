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

    constructor() { }

    getValue(): any {
        if (!this.header.inputName) {
            return null;
        }
        if (this.header.inputWithChildren) {
            const attributes = this.header.inputWithChildren.split('_');
            let result;
            switch (attributes.length) {
                case 1:
                    result = this.item[attributes[0]];
                    break;
                case 2:
                    result = this.item[attributes[0]][attributes[1]];
                    break;
                case 3:
                    result = this.item[attributes[0]][attributes[1]][attributes[2]];
                    break;
            }
            return result;
        } else {
            return this.item[this.header.inputName];
        }
    }
}
