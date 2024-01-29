import { NgbDate } from './ngb-date';
import { DatepickerViewModel, MonthViewModel } from './datepicker-view-model';
import { NgbCalendar } from './ngb-calendar';
import { NgbDatepickerI18n } from './datepicker-i18n';
export declare function isChangedDate(prev?: NgbDate | null, next?: NgbDate | null): boolean;
export declare function isChangedMonth(prev?: NgbDate | null, next?: NgbDate | null): boolean;
export declare function dateComparator(prev?: NgbDate | null, next?: NgbDate | null): boolean;
export declare function checkMinBeforeMax(minDate?: NgbDate | null, maxDate?: NgbDate | null): void;
export declare function checkDateInRange(date?: NgbDate | null, minDate?: NgbDate | null, maxDate?: NgbDate | null): NgbDate | null;
export declare function isDateSelectable(date: NgbDate | null | undefined, state: DatepickerViewModel): boolean;
export declare function generateSelectBoxMonths(calendar: NgbCalendar, date: NgbDate, minDate: NgbDate | null, maxDate: NgbDate | null): number[];
export declare function generateSelectBoxYears(date: NgbDate, minDate: NgbDate | null, maxDate: NgbDate | null): any[];
export declare function nextMonthDisabled(calendar: NgbCalendar, date: NgbDate, maxDate: NgbDate | null): boolean;
export declare function prevMonthDisabled(calendar: NgbCalendar, date: NgbDate, minDate: NgbDate | null): boolean;
export declare function buildMonths(calendar: NgbCalendar, date: NgbDate, state: DatepickerViewModel, i18n: NgbDatepickerI18n, force: boolean): MonthViewModel[];
export declare function buildMonth(calendar: NgbCalendar, date: NgbDate, state: DatepickerViewModel, i18n: NgbDatepickerI18n, month?: MonthViewModel): MonthViewModel;
export declare function getFirstViewDate(calendar: NgbCalendar, date: NgbDate, firstDayOfWeek: number): NgbDate;
