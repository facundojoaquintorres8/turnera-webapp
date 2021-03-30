import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-paginate',
    templateUrl: './paginate.component.html'
})
export class PaginateComponent {

    @Output() executeQuery: EventEmitter<{ page: number, sort?: string[] }> = new EventEmitter();
    @Input() page: number = 1;
    @Input() totalPages: number = 1;

    constructor() { }

    previousPage(): void {
        this.page--;
        this.executeQuery.emit({ page: this.page });
    }

    nextPage(): void {
        this.page++;
        this.executeQuery.emit({ page: this.page });
    }
}
