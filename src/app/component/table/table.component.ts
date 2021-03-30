import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputTypeEnum, ITable } from './table.models';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input() queryItems!: (req?: any) => Observable<HttpResponse<any[]>>;
    @Input() table!: ITable;
    @Input() myForm!: FormGroup;
    @Input() sort!: string[];
    @Input() hasButtons: boolean = false;
    @Input() page: number = 1;

    totalPages: number = 1;
    items: any[] = [];
    inputType: any = InputTypeEnum;

    constructor() {}

    ngOnInit(): void {
        this.executeQuery({ page: 1 });
    }

    executeQuery($event: any): void {
        this.page = $event.page || 1;
        let filters: { [index: string]: [string] } = {};
        this.table.headers.forEach(header => {
            if (header.inputName && this.myForm.get(header.inputName)!.value) {
                filters[header.inputName] = [this.myForm.get(header.inputName)!.value];
            }
        });

        this.queryItems(
            {
                ...filters,
                sort: $event.sort || this.sort,
                page: $event.page - 1
            }
        ).subscribe(
            (res: HttpResponse<any>) => {
                this.items = res.body.content || [];
                this.totalPages = res.body.totalPages;
            }
        );
    }
}
