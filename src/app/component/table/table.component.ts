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

    page: number = 1;
    totalPages: number = 1;
    items: any[] = [];
    inputType: any = InputTypeEnum;

    constructor() {}

    ngOnInit(): void {
        this.executeQuery(1);
    }

    executeQuery(page: number): void {
        this.page = page;
        let filters: { [index: string]: [string] } = {};
        this.table.headers.forEach(header => {
            if (header.inputName && this.myForm.get(header.inputName)!.value) {
                filters[header.inputName] = [this.myForm.get(header.inputName)!.value];
            }
        });

        this.queryItems(
            {
                ...filters,
                sort: this.sort,
                page: this.page - 1
            }
        ).subscribe(
            (res: HttpResponse<any>) => {
                this.items = res.body.content || [];
                this.totalPages = res.body.totalPages;
            }
        );
    }

    clearInput(field: string): void {
        this.myForm.get(field)?.setValue(null);
        this.executeQuery(1);
    }

    onSortChange(field: string): void {
        let sort = 'ASC';
        if (this.sort[1] === field) {
            if (this.sort[0] !== 'DESC') {
                sort = 'DESC';
            }
        }
        this.sort = [sort, field];
        this.executeQuery(1);
    }

    onChange(): void {
        this.executeQuery(1);
    }

    previousPage(): void {
        this.executeQuery(this.page - 1);
    }

    nextPage(): void {
        this.executeQuery(this.page + 1);
    }
}
