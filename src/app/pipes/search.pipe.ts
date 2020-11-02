import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchUsers' })
export class SearchPipe implements PipeTransform {

    constructor() { }

    transform(items: any[], filter: string): any {
        if (!items) {
            return items;
        }
        if (!filter) {
            return items;
        }
        
        filter = filter.toLowerCase();

        return items.filter(function (item) {
            return JSON.stringify(item).toLowerCase().includes(filter);
        })
    }
}