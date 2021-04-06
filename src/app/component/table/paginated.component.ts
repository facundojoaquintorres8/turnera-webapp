import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-paginated',
    templateUrl: './paginated.component.html',
    styleUrls: ['./paginated.component.scss']
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

    goToPage(page: number): void {
        this.page = page;
        this.executeQuery.emit({ page: this.page });
    }

    firstPage(): void {
        this.page = 1;
        this.executeQuery.emit({ page: this.page });
    }

    lastPage(): void {
        this.page = this.totalPages;
        this.executeQuery.emit({ page: this.page });
    }
}
