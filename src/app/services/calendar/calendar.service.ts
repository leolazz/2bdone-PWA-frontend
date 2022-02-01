import { Injectable } from '@angular/core';
import { GetMonthGQL } from '../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly getMonthService: GetMonthGQL) {}
  getMonth(yearMonth: string) {
    return this.getMonthService.watch({ yearMonth });
  }
}
