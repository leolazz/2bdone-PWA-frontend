import { Injectable } from '@angular/core';
import { GetMonthGQL } from '../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly getMonthService: GetMonthGQL) {}
  async getMonth(yearMonth: string, yearMonthOverlap?: string) {
    return (
      await this.getMonthService
        .fetch({ yearMonth, yearMonthOverlap }, { fetchPolicy: 'network-only' })
        .toPromise()
    ).data.getMonth;
  }
}
