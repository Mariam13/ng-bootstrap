import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, EventEmitter, forwardRef, inject, Inject, Injector, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NavigationEvent } from './datepicker-view-model';
import { isChangedDate, isChangedMonth } from './datepicker-tools';
import { hasClassName } from '../util/util';
import { NgbDatepickerDayView } from './datepicker-day-view';
import { NgbDatepickerNavigation } from './datepicker-navigation';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
import * as i2 from "./datepicker-keyboard-service";
import * as i3 from "./datepicker-service";
import * as i4 from "./ngb-calendar";
import * as i5 from "./datepicker-config";
import * as i6 from "./adapters/ngb-date-adapter";
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
export class NgbDatepickerContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbDatepickerContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDatepickerContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDatepickerContent, isStandalone: true, selector: "ng-template[ngbDatepickerContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbDatepickerContent]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
export class NgbDatepickerMonth {
    constructor(i18n, datepicker, _keyboardService, _service) {
        this.i18n = i18n;
        this.datepicker = datepicker;
        this._keyboardService = _keyboardService;
        this._service = _service;
    }
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    onKeyDown(event) {
        this._keyboardService.processKey(event, this.datepicker);
    }
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
}
NgbDatepickerMonth.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerMonth, deps: [{ token: i1.NgbDatepickerI18n }, { token: forwardRef(() => NgbDatepicker) }, { token: i2.NgbDatepickerKeyboardService }, { token: i3.NgbDatepickerService }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepickerMonth.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NgbDatepickerMonth, isStandalone: true, selector: "ngb-datepicker-month", inputs: { month: "month" }, host: { attributes: { "role": "grid" }, listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0, template: `
		<div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
			<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{
				i18n.getWeekLabel()
			}}</div>
			<div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{
				weekday
			}}</div>
		</div>
		<ng-template ngFor let-week [ngForOf]="viewModel.weeks">
			<div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
				<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{
					i18n.getWeekNumerals(week.number)
				}}</div>
				<div
					*ngFor="let day of week.days"
					(click)="doSelect(day); $event.preventDefault()"
					class="ngb-dp-day"
					role="gridcell"
					[class.disabled]="day.context.disabled"
					[tabindex]="day.tabindex"
					[class.hidden]="day.hidden"
					[class.ngb-dp-today]="day.context.today"
					[attr.aria-label]="day.ariaLabel"
				>
					<ng-template [ngIf]="!day.hidden">
						<ng-template
							[ngTemplateOutlet]="datepicker.dayTemplate"
							[ngTemplateOutletContext]="day.context"
						></ng-template>
					</ng-template>
				</div>
			</div>
		</ng-template>
	`, isInline: true, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerMonth, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-month', standalone: true, imports: [NgIf, NgFor, NgTemplateOutlet], host: { role: 'grid', '(keydown)': 'onKeyDown($event)' }, encapsulation: ViewEncapsulation.None, template: `
		<div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
			<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{
				i18n.getWeekLabel()
			}}</div>
			<div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{
				weekday
			}}</div>
		</div>
		<ng-template ngFor let-week [ngForOf]="viewModel.weeks">
			<div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
				<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{
					i18n.getWeekNumerals(week.number)
				}}</div>
				<div
					*ngFor="let day of week.days"
					(click)="doSelect(day); $event.preventDefault()"
					class="ngb-dp-day"
					role="gridcell"
					[class.disabled]="day.context.disabled"
					[tabindex]="day.tabindex"
					[class.hidden]="day.hidden"
					[class.ngb-dp-today]="day.context.today"
					[attr.aria-label]="day.ariaLabel"
				>
					<ng-template [ngIf]="!day.hidden">
						<ng-template
							[ngTemplateOutlet]="datepicker.dayTemplate"
							[ngTemplateOutletContext]="day.context"
						></ng-template>
					</ng-template>
				</div>
			</div>
		</ng-template>
	`, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }, { type: NgbDatepicker, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDatepicker)]
                }] }, { type: i2.NgbDatepickerKeyboardService }, { type: i3.NgbDatepickerService }]; }, propDecorators: { month: [{
                type: Input
            }] } });
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
export class NgbDatepicker {
    constructor(_service, _calendar, _i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._service = _service;
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this.injector = inject(Injector);
        this._controlValue = null;
        this._destroyed$ = new Subject();
        this._publicState = {};
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        [
            'contentTemplate',
            'dayTemplate',
            'dayTemplateData',
            'displayMonths',
            'firstDayOfWeek',
            'footerTemplate',
            'markDisabled',
            'minDate',
            'maxDate',
            'navigation',
            'outsideDays',
            'showWeekNumbers',
            'startDate',
            'weekdays',
        ].forEach((input) => (this[input] = config[input]));
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe((date) => {
            this.dateSelect.emit(date);
        });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe((model) => {
            const newDate = model.firstDate;
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((viewModel) => viewModel.firstDate),
            };
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => (navigationPrevented = true),
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            const newSelectedDate = model.selectedDate;
            const newFocusedDate = model.focusDate;
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        });
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state() {
        return this._publicState;
    }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar() {
        return this._calendar;
    }
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n() {
        return this._i18n;
    }
    /**
     *  Focuses on given date.
     */
    focusDate(date) {
        this._service.focus(NgbDate.from(date));
    }
    /**
     *  Selects focused date.
     */
    focusSelect() {
        this._service.focusSelect();
    }
    focus() {
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? (date.day ? date : { ...date, day: 1 }) : null));
    }
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            const { nativeElement } = this._elementRef;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter(({ target, relatedTarget }) => !(hasClassName(target, 'ngb-dp-day') &&
                hasClassName(relatedTarget, 'ngb-dp-day') &&
                nativeElement.contains(target) &&
                nativeElement.contains(relatedTarget))), takeUntil(this._destroyed$))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.set({ focusVisible: type === 'focusin' })));
        });
    }
    ngOnDestroy() {
        this._destroyed$.next();
    }
    ngOnInit() {
        if (this.model === undefined) {
            const inputs = {};
            [
                'dayTemplateData',
                'displayMonths',
                'markDisabled',
                'firstDayOfWeek',
                'navigation',
                'minDate',
                'maxDate',
                'outsideDays',
                'weekdays',
            ].forEach((name) => (inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    }
    ngOnChanges(changes) {
        const inputs = {};
        [
            'dayTemplateData',
            'displayMonths',
            'markDisabled',
            'firstDayOfWeek',
            'navigation',
            'minDate',
            'maxDate',
            'outsideDays',
            'weekdays',
        ]
            .filter((name) => name in changes)
            .forEach((name) => (inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    onNavigateDateSelect(date) {
        this._service.open(date);
    }
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this._service.set({ disabled });
    }
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
    getDotsForDay(day) {
        return this.dots?.[`${day.year}-${day.month}-${day.day}`];
    }
}
NgbDatepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepicker, deps: [{ token: i3.NgbDatepickerService }, { token: i4.NgbCalendar }, { token: i1.NgbDatepickerI18n }, { token: i5.NgbDatepickerConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i6.NgbDateAdapter }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepicker.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NgbDatepicker, isStandalone: true, selector: "ngb-datepicker", inputs: { contentTemplate: "contentTemplate", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", maxDate: "maxDate", minDate: "minDate", navigation: "navigation", outsideDays: "outsideDays", showWeekNumbers: "showWeekNumbers", startDate: "startDate", dots: "dots", weekdays: "weekdays" }, outputs: { navigate: "navigate", dateSelect: "dateSelect" }, host: { properties: { "class.disabled": "model.disabled" } }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
        NgbDatepickerService,
    ], queries: [{ propertyName: "contentTemplateFromContent", first: true, predicate: NgbDatepickerContent, descendants: true, static: true }], viewQueries: [{ propertyName: "_defaultDayTemplate", first: true, predicate: ["defaultDayTemplate"], descendants: true, static: true }, { propertyName: "_contentEl", first: true, predicate: ["content"], descendants: true, static: true }], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[dots]="getDotsForDay(date)"
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			<div *ngFor="let month of model.months; let i = index" class="ngb-dp-month">
				<div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				<ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
			</div>
		</ng-template>

		<div class="ngb-dp-header">
			<ngb-datepicker-navigation
				*ngIf="navigation !== 'none'"
				[date]="model.firstDate!"
				[months]="model.months"
				[disabled]="model.disabled"
				[showSelect]="model.navigation === 'select'"
				[prevDisabled]="model.prevDisabled"
				[nextDisabled]="model.nextDisabled"
				[selectBoxes]="model.selectBoxes"
				(navigate)="onNavigateEvent($event)"
				(select)="onNavigateDateSelect($event)"
			>
			</ngb-datepicker-navigation>
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			></ng-template>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
	`, isInline: true, styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NgbDatepickerDayView, selector: "[ngbDatepickerDayView]", inputs: ["currentMonth", "date", "dots", "disabled", "focused", "selected"] }, { kind: "component", type: NgbDatepickerMonth, selector: "ngb-datepicker-month", inputs: ["month"] }, { kind: "component", type: NgbDatepickerNavigation, selector: "ngb-datepicker-navigation", inputs: ["date", "disabled", "months", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"], outputs: ["navigate", "select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbDatepicker', selector: 'ngb-datepicker', standalone: true, imports: [NgIf, NgFor, NgTemplateOutlet, NgbDatepickerDayView, NgbDatepickerMonth, NgbDatepickerNavigation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { '[class.disabled]': 'model.disabled' }, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[dots]="getDotsForDay(date)"
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			<div *ngFor="let month of model.months; let i = index" class="ngb-dp-month">
				<div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				<ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
			</div>
		</ng-template>

		<div class="ngb-dp-header">
			<ngb-datepicker-navigation
				*ngIf="navigation !== 'none'"
				[date]="model.firstDate!"
				[months]="model.months"
				[disabled]="model.disabled"
				[showSelect]="model.navigation === 'select'"
				[prevDisabled]="model.prevDisabled"
				[nextDisabled]="model.nextDisabled"
				[selectBoxes]="model.selectBoxes"
				(navigate)="onNavigateEvent($event)"
				(select)="onNavigateDateSelect($event)"
			>
			</ngb-datepicker-navigation>
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			></ng-template>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
	`, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
                        NgbDatepickerService,
                    ], styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.NgbDatepickerService }, { type: i4.NgbCalendar }, { type: i1.NgbDatepickerI18n }, { type: i5.NgbDatepickerConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i6.NgbDateAdapter }, { type: i0.NgZone }]; }, propDecorators: { _defaultDayTemplate: [{
                type: ViewChild,
                args: ['defaultDayTemplate', { static: true }]
            }], _contentEl: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], contentTemplate: [{
                type: Input
            }], contentTemplateFromContent: [{
                type: ContentChild,
                args: [NgbDatepickerContent, { static: true }]
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], dots: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], navigate: [{
                type: Output
            }], dateSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFFTix1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBS0wsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFvQixNQUFNLGlCQUFpQixDQUFDO0FBR2xGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUEyQixvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JGLE9BQU8sRUFBcUQsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFPN0csT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQWtFbEU7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxvQkFBb0I7SUFDaEMsWUFB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QixLQUFLO2dCQUNnRCwwQkFBMEI7c0JBQS9FLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQVMzQyxXQUFXO3NCQUFuQixLQUFLO2dCQVVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQU9HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBU0csWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxPQUFPO3NCQUFmLEtBQUs7Z0JBT0csT0FBTztzQkFBZixLQUFLO2dCQVNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBV0csV0FBVztzQkFBbkIsS0FBSztnQkFLRyxlQUFlO3NCQUF2QixLQUFLO2dCQVVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQVdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0ksUUFBUTtzQkFBakIsTUFBTTtnQkFTRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29udGVudENoaWxkLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0aW5qZWN0LFxuXHRJbmplY3QsXG5cdEluamVjdG9yLFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRPbkNoYW5nZXMsXG5cdE9uRGVzdHJveSxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q2hpbGQsXG5cdFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmLCBOZ1RlbXBsYXRlT3V0bGV0LCBUcmFuc2xhdGlvbldpZHRoIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmdiQ2FsZW5kYXIgfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQgeyBOZ2JEYXRlIH0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyU2VydmljZUlucHV0cywgTmdiRGF0ZXBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsLCBOYXZpZ2F0aW9uRXZlbnQgfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQgeyBEYXlUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHsgTmdiRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7IE5nYkRhdGVwaWNrZXJJMThuIH0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlcktleWJvYXJkU2VydmljZSB9IGZyb20gJy4vZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlJztcbmltcG9ydCB7IGlzQ2hhbmdlZERhdGUsIGlzQ2hhbmdlZE1vbnRoIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcbmltcG9ydCB7IGhhc0NsYXNzTmFtZSB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VyRGF5VmlldyB9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdmlldyc7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJztcbmltcG9ydCB7IENvbnRlbnRUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2RhdGVwaWNrZXItY29udGVudC10ZW1wbGF0ZS1jb250ZXh0JztcblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCB0aGUgbW9udGggZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyIGNoYW5nZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQge1xuXHQvKipcblx0ICogVGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGguXG5cdCAqL1xuXHRjdXJyZW50OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9IHwgbnVsbDtcblxuXHQvKipcblx0ICogVGhlIG1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG8uXG5cdCAqL1xuXHRuZXh0OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9O1xuXG5cdC8qKlxuXHQgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IG5hdmlnYXRpb24gZnJvbSBoYXBwZW5pbmcuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjEuMFxuXHQgKi9cblx0cHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyB0aGUgcmVhZG9ubHkgcHVibGljIHN0YXRlIG9mIHRoZSBkYXRlcGlja2VyLlxuICpcbiAqIEFjY2Vzc2libGUgdmlhIHRoZSBgZGF0ZXBpY2tlci5zdGF0ZWAgZ2V0dGVyXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlclN0YXRlIHtcblx0LyoqXG5cdCAqIFRoZSBlYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZFxuXHQgKi9cblx0cmVhZG9ubHkgbWluRGF0ZTogTmdiRGF0ZSB8IG51bGw7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWRcblx0ICovXG5cdHJlYWRvbmx5IG1heERhdGU6IE5nYkRhdGUgfCBudWxsO1xuXG5cdC8qKlxuXHQgKiBUaGUgZmlyc3QgdmlzaWJsZSBkYXRlIG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhzXG5cdCAqL1xuXHRyZWFkb25seSBmaXJzdERhdGU6IE5nYkRhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBsYXN0IHZpc2libGUgZGF0ZSBvZiBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoc1xuXHQgKi9cblx0cmVhZG9ubHkgbGFzdERhdGU6IE5nYkRhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBkYXRlIGN1cnJlbnRseSBmb2N1c2VkIGJ5IHRoZSBkYXRlcGlja2VyXG5cdCAqL1xuXHRyZWFkb25seSBmb2N1c2VkRGF0ZTogTmdiRGF0ZTtcblxuXHQvKipcblx0ICogRmlyc3QgZGF0ZXMgb2YgbW9udGhzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXJcblx0ICpcblx0ICogQHNpbmNlIDUuMy4wXG5cdCAqL1xuXHRyZWFkb25seSBtb250aHM6IE5nYkRhdGVbXTtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1hcmtzIHRoZSBjb250ZW50IHRlbXBsYXRlIHRoYXQgY3VzdG9taXplcyB0aGUgd2F5IGRhdGVwaWNrZXIgbW9udGhzIGFyZSBkaXNwbGF5ZWRcbiAqXG4gKiBAc2luY2UgNS4zLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiRGF0ZXBpY2tlckNvbnRlbnRdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb250ZW50IHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgcmVuZGVycyBvbmUgbW9udGggaW5jbHVkaW5nIGFsbCB0aGUgZGF5cywgd2Vla2RheXMgYW5kIHdlZWsgbnVtYmVycy4gQ2FuIGJlIHVzZWQgaW5zaWRlXG4gKiB0aGUgYDxuZy10ZW1wbGF0ZSBuZ2JEYXRlcGlja2VyTW9udGhzPjwvbmctdGVtcGxhdGU+YCB3aGVuIHlvdSB3YW50IHRvIGN1c3RvbWl6ZSBtb250aHMgbGF5b3V0LlxuICpcbiAqIEZvciBhIHVzYWdlIGV4YW1wbGUsIHNlZSBbY3VzdG9tIG1vbnRoIGxheW91dCBkZW1vXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9leGFtcGxlcyNjdXN0b21tb250aClcbiAqXG4gKiBAc2luY2UgNS4zLjBcbiAqL1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbW9udGgnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIE5nVGVtcGxhdGVPdXRsZXRdLFxuXHRob3N0OiB7IHJvbGU6ICdncmlkJywgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScgfSxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1tb250aC5zY3NzJ10sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiAqbmdJZj1cInZpZXdNb2RlbC53ZWVrZGF5cy5sZW5ndGggPiAwXCIgY2xhc3M9XCJuZ2ItZHAtd2VlayBuZ2ItZHAtd2Vla2RheXNcIiByb2xlPVwicm93XCI+XG5cdFx0XHQ8ZGl2ICpuZ0lmPVwiZGF0ZXBpY2tlci5zaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrZGF5IG5nYi1kcC1zaG93d2VlayBzbWFsbFwiPnt7XG5cdFx0XHRcdGkxOG4uZ2V0V2Vla0xhYmVsKClcblx0XHRcdH19PC9kaXY+XG5cdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCB3ZWVrZGF5IG9mIHZpZXdNb2RlbC53ZWVrZGF5c1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgc21hbGxcIiByb2xlPVwiY29sdW1uaGVhZGVyXCI+e3tcblx0XHRcdFx0d2Vla2RheVxuXHRcdFx0fX08L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXdlZWsgW25nRm9yT2ZdPVwidmlld01vZGVsLndlZWtzXCI+XG5cdFx0XHQ8ZGl2ICpuZ0lmPVwiIXdlZWsuY29sbGFwc2VkXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla1wiIHJvbGU9XCJyb3dcIj5cblx0XHRcdFx0PGRpdiAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1dlZWtOdW1iZXJzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vlay1udW1iZXIgc21hbGwgdGV4dC1tdXRlZFwiPnt7XG5cdFx0XHRcdFx0aTE4bi5nZXRXZWVrTnVtZXJhbHMod2Vlay5udW1iZXIpXG5cdFx0XHRcdH19PC9kaXY+XG5cdFx0XHRcdDxkaXZcblx0XHRcdFx0XHQqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiXG5cdFx0XHRcdFx0KGNsaWNrKT1cImRvU2VsZWN0KGRheSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcblx0XHRcdFx0XHRjbGFzcz1cIm5nYi1kcC1kYXlcIlxuXHRcdFx0XHRcdHJvbGU9XCJncmlkY2VsbFwiXG5cdFx0XHRcdFx0W2NsYXNzLmRpc2FibGVkXT1cImRheS5jb250ZXh0LmRpc2FibGVkXCJcblx0XHRcdFx0XHRbdGFiaW5kZXhdPVwiZGF5LnRhYmluZGV4XCJcblx0XHRcdFx0XHRbY2xhc3MuaGlkZGVuXT1cImRheS5oaWRkZW5cIlxuXHRcdFx0XHRcdFtjbGFzcy5uZ2ItZHAtdG9kYXldPVwiZGF5LmNvbnRleHQudG9kYXlcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5LmFyaWFMYWJlbFwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8bmctdGVtcGxhdGUgW25nSWZdPVwiIWRheS5oaWRkZW5cIj5cblx0XHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJkYXRlcGlja2VyLmRheVRlbXBsYXRlXCJcblx0XHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImRheS5jb250ZXh0XCJcblx0XHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHRcdDwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck1vbnRoIHtcblx0LyoqXG5cdCAqIFRoZSBmaXJzdCBkYXRlIG9mIG1vbnRoIHRvIGJlIHJlbmRlcmVkLlxuXHQgKlxuXHQgKiBUaGlzIG1vbnRoIG11c3Qgb25lIG9mIHRoZSBtb250aHMgcHJlc2VudCBpbiB0aGVcblx0ICogW2RhdGVwaWNrZXIgc3RhdGVdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JEYXRlcGlja2VyU3RhdGUpLlxuXHQgKi9cblx0QElucHV0KClcblx0c2V0IG1vbnRoKG1vbnRoOiBOZ2JEYXRlU3RydWN0KSB7XG5cdFx0dGhpcy52aWV3TW9kZWwgPSB0aGlzLl9zZXJ2aWNlLmdldE1vbnRoKG1vbnRoKTtcblx0fVxuXG5cdHZpZXdNb2RlbDogTW9udGhWaWV3TW9kZWw7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLFxuXHRcdEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEYXRlcGlja2VyKSkgcHVibGljIGRhdGVwaWNrZXI6IE5nYkRhdGVwaWNrZXIsXG5cdFx0cHJpdmF0ZSBfa2V5Ym9hcmRTZXJ2aWNlOiBOZ2JEYXRlcGlja2VyS2V5Ym9hcmRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLFxuXHQpIHt9XG5cblx0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0dGhpcy5fa2V5Ym9hcmRTZXJ2aWNlLnByb2Nlc3NLZXkoZXZlbnQsIHRoaXMuZGF0ZXBpY2tlcik7XG5cdH1cblxuXHRkb1NlbGVjdChkYXk6IERheVZpZXdNb2RlbCkge1xuXHRcdGlmICghZGF5LmNvbnRleHQuZGlzYWJsZWQgJiYgIWRheS5oaWRkZW4pIHtcblx0XHRcdHRoaXMuZGF0ZXBpY2tlci5vbkRhdGVTZWxlY3QoZGF5LmRhdGUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEEgaGlnaGx5IGNvbmZpZ3VyYWJsZSBjb21wb25lbnQgdGhhdCBoZWxwcyB5b3Ugd2l0aCBzZWxlY3RpbmcgY2FsZW5kYXIgZGF0ZXMuXG4gKlxuICogYE5nYkRhdGVwaWNrZXJgIGlzIG1lYW50IHRvIGJlIGRpc3BsYXllZCBpbmxpbmUgb24gYSBwYWdlIG9yIHB1dCBpbnNpZGUgYSBwb3B1cC5cbiAqL1xuQENvbXBvbmVudCh7XG5cdGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG5cdHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXInLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIE5nVGVtcGxhdGVPdXRsZXQsIE5nYkRhdGVwaWNrZXJEYXlWaWV3LCBOZ2JEYXRlcGlja2VyTW9udGgsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXIuc2NzcyddLFxuXHRob3N0OiB7ICdbY2xhc3MuZGlzYWJsZWRdJzogJ21vZGVsLmRpc2FibGVkJyB9LFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0I2RlZmF1bHREYXlUZW1wbGF0ZVxuXHRcdFx0bGV0LWRhdGU9XCJkYXRlXCJcblx0XHRcdGxldC1jdXJyZW50TW9udGg9XCJjdXJyZW50TW9udGhcIlxuXHRcdFx0bGV0LXNlbGVjdGVkPVwic2VsZWN0ZWRcIlxuXHRcdFx0bGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIlxuXHRcdFx0bGV0LWZvY3VzZWQ9XCJmb2N1c2VkXCJcblx0XHQ+XG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdG5nYkRhdGVwaWNrZXJEYXlWaWV3XG5cdFx0XHRcdFtkb3RzXT1cImdldERvdHNGb3JEYXkoZGF0ZSlcIlxuXHRcdFx0XHRbZGF0ZV09XCJkYXRlXCJcblx0XHRcdFx0W2N1cnJlbnRNb250aF09XCJjdXJyZW50TW9udGhcIlxuXHRcdFx0XHRbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuXHRcdFx0XHRbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuXHRcdFx0XHRbZm9jdXNlZF09XCJmb2N1c2VkXCJcblx0XHRcdD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvbmctdGVtcGxhdGU+XG5cblx0XHQ8bmctdGVtcGxhdGUgI2RlZmF1bHRDb250ZW50VGVtcGxhdGU+XG5cdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb2RlbC5tb250aHM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cIm5nYi1kcC1tb250aFwiPlxuXHRcdFx0XHQ8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIiBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lXCI+XG5cdFx0XHRcdFx0e3sgaTE4bi5nZXRNb250aExhYmVsKG1vbnRoLmZpcnN0RGF0ZSkgfX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxuZ2ItZGF0ZXBpY2tlci1tb250aCBbbW9udGhdPVwibW9udGguZmlyc3REYXRlXCI+PC9uZ2ItZGF0ZXBpY2tlci1tb250aD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvbmctdGVtcGxhdGU+XG5cblx0XHQ8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlclwiPlxuXHRcdFx0PG5nYi1kYXRlcGlja2VyLW5hdmlnYXRpb25cblx0XHRcdFx0Km5nSWY9XCJuYXZpZ2F0aW9uICE9PSAnbm9uZSdcIlxuXHRcdFx0XHRbZGF0ZV09XCJtb2RlbC5maXJzdERhdGUhXCJcblx0XHRcdFx0W21vbnRoc109XCJtb2RlbC5tb250aHNcIlxuXHRcdFx0XHRbZGlzYWJsZWRdPVwibW9kZWwuZGlzYWJsZWRcIlxuXHRcdFx0XHRbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXG5cdFx0XHRcdFtwcmV2RGlzYWJsZWRdPVwibW9kZWwucHJldkRpc2FibGVkXCJcblx0XHRcdFx0W25leHREaXNhYmxlZF09XCJtb2RlbC5uZXh0RGlzYWJsZWRcIlxuXHRcdFx0XHRbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxuXHRcdFx0XHQobmF2aWdhdGUpPVwib25OYXZpZ2F0ZUV2ZW50KCRldmVudClcIlxuXHRcdFx0XHQoc2VsZWN0KT1cIm9uTmF2aWdhdGVEYXRlU2VsZWN0KCRldmVudClcIlxuXHRcdFx0PlxuXHRcdFx0PC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uPlxuXHRcdDwvZGl2PlxuXG5cdFx0PGRpdiBjbGFzcz1cIm5nYi1kcC1jb250ZW50XCIgW2NsYXNzLm5nYi1kcC1tb250aHNdPVwiIWNvbnRlbnRUZW1wbGF0ZVwiICNjb250ZW50PlxuXHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZSB8fCBjb250ZW50VGVtcGxhdGVGcm9tQ29udGVudD8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdENvbnRlbnRUZW1wbGF0ZVwiXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCJcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRJbmplY3Rvcl09XCJpbmplY3RvclwiXG5cdFx0XHQ+PC9uZy10ZW1wbGF0ZT5cblx0XHQ8L2Rpdj5cblxuXHRcdDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG5cdGAsXG5cdHByb3ZpZGVyczogW1xuXHRcdHsgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpLCBtdWx0aTogdHJ1ZSB9LFxuXHRcdE5nYkRhdGVwaWNrZXJTZXJ2aWNlLFxuXHRdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbmF2aWdhdGlvbjogc3RyaW5nO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3V0c2lkZURheXM6IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3dlZWtkYXlzOiBib29sZWFuIHwgbnVtYmVyO1xuXG5cdG1vZGVsOiBEYXRlcGlja2VyVmlld01vZGVsO1xuXG5cdEBWaWV3Q2hpbGQoJ2RlZmF1bHREYXlUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgX2RlZmF1bHREYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0Pjtcblx0QFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgX2NvbnRlbnRFbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cblx0cHJvdGVjdGVkIGluamVjdG9yID0gaW5qZWN0KEluamVjdG9yKTtcblxuXHRwcml2YXRlIF9jb250cm9sVmFsdWU6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX3B1YmxpY1N0YXRlOiBOZ2JEYXRlcGlja2VyU3RhdGUgPSA8YW55Pnt9O1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVmZXJlbmNlIHRvIGEgY3VzdG9tIGNvbnRlbnQgdGVtcGxhdGUuXG5cdCAqXG5cdCAqIEFsbG93cyB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB3YXkgZGF0ZXBpY2tlciBkaXNwbGF5cyBtb250aHMuXG5cdCAqXG5cdCAqIFNlZSBbYE5nYkRhdGVwaWNrZXJDb250ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJDb250ZW50KSBhbmRcblx0ICogW2BDb250ZW50VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0NvbnRlbnRUZW1wbGF0ZUNvbnRleHQpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxNC4yLjBcblx0ICovXG5cdEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8Q29udGVudFRlbXBsYXRlQ29udGV4dD47XG5cdEBDb250ZW50Q2hpbGQoTmdiRGF0ZXBpY2tlckNvbnRlbnQsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnRUZW1wbGF0ZUZyb21Db250ZW50PzogTmdiRGF0ZXBpY2tlckNvbnRlbnQ7XG5cblx0LyoqXG5cdCAqIFRoZSByZWZlcmVuY2UgdG8gYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkuXG5cdCAqXG5cdCAqIEFsbG93cyB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB3YXkgYSBkYXkgJ2NlbGwnIGluIHRoZSBjYWxlbmRhciBpcyBkaXNwbGF5ZWQuXG5cdCAqXG5cdCAqIFNlZSBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgZGF0YSB5b3UgZ2V0IGluc2lkZS5cblx0ICovXG5cdEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuXG5cdC8qKlxuXHQgKiBUaGUgY2FsbGJhY2sgdG8gcGFzcyBhbnkgYXJiaXRyYXJ5IGRhdGEgdG8gdGhlIHRlbXBsYXRlIGNlbGwgdmlhIHRoZVxuXHQgKiBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpJ3MgYGRhdGFgIHBhcmFtZXRlci5cblx0ICpcblx0ICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG5cdCAqXG5cdCAqIEBzaW5jZSAzLjMuMFxuXHQgKi9cblx0QElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudD86IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyIH0pID0+IGFueTtcblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheS5cblx0ICovXG5cdEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cblx0ICpcblx0ICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1bi5cblx0ICovXG5cdEBJbnB1dCgpIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSByZWZlcmVuY2UgdG8gdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRhdGVwaWNrZXIgZm9vdGVyLlxuXHQgKlxuXHQgKiBAc2luY2UgMy4zLjBcblx0ICovXG5cdEBJbnB1dCgpIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cdC8qKlxuXHQgKiBUaGUgY2FsbGJhY2sgdG8gbWFyayBzb21lIGRhdGVzIGFzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBJdCBpcyBjYWxsZWQgZm9yIGVhY2ggbmV3IGRhdGUgd2hlbiBuYXZpZ2F0aW5nIHRvIGEgZGlmZmVyZW50IG1vbnRoLlxuXHQgKlxuXHQgKiBgY3VycmVudGAgaXMgdGhlIG1vbnRoIHRoYXQgaXMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cblx0ICovXG5cdEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9KSA9PiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkLlxuXHQgKlxuXHQgKiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBhZnRlciB0aGUgY3VycmVudCBtb250aC5cblx0ICovXG5cdEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBlYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZC5cblx0ICpcblx0ICogSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIHRoZSBjdXJyZW50IG1vbnRoLlxuXHQgKi9cblx0QElucHV0KCkgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuXHQvKipcblx0ICogTmF2aWdhdGlvbiB0eXBlLlxuXHQgKlxuXHQgKiAqIGBcInNlbGVjdFwiYCAtIHNlbGVjdCBib3hlcyBmb3IgbW9udGggYW5kIG5hdmlnYXRpb24gYXJyb3dzXG5cdCAqICogYFwiYXJyb3dzXCJgIC0gb25seSBuYXZpZ2F0aW9uIGFycm93c1xuXHQgKiAqIGBcIm5vbmVcImAgLSBubyBuYXZpZ2F0aW9uIHZpc2libGUgYXQgYWxsXG5cdCAqL1xuXHRASW5wdXQoKSBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnO1xuXG5cdC8qKlxuXHQgKiBUaGUgd2F5IG9mIGRpc3BsYXlpbmcgZGF5cyB0aGF0IGRvbid0IGJlbG9uZyB0byB0aGUgY3VycmVudCBtb250aC5cblx0ICpcblx0ICogKiBgXCJ2aXNpYmxlXCJgIC0gZGF5cyBhcmUgdmlzaWJsZVxuXHQgKiAqIGBcImhpZGRlblwiYCAtIGRheXMgYXJlIGhpZGRlbiwgd2hpdGUgc3BhY2UgcHJlc2VydmVkXG5cdCAqICogYFwiY29sbGFwc2VkXCJgIC0gZGF5cyBhcmUgY29sbGFwc2VkLCBzbyB0aGUgZGF0ZXBpY2tlciBoZWlnaHQgbWlnaHQgY2hhbmdlIGJldHdlZW4gbW9udGhzXG5cdCAqXG5cdCAqIEZvciB0aGUgMisgbW9udGhzIHZpZXcsIGRheXMgaW4gYmV0d2VlbiBtb250aHMgYXJlIG5ldmVyIHNob3duLlxuXHQgKi9cblx0QElucHV0KCkgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgd2VlayBudW1iZXJzIHdpbGwgYmUgZGlzcGxheWVkLlxuXHQgKi9cblx0QElucHV0KCkgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXG5cdCAqXG5cdCAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG5cdCAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIGlzIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxuXHQgKlxuXHQgKiBZb3UgY291bGQgdXNlIGBuYXZpZ2F0ZVRvKGRhdGUpYCBtZXRob2QgYXMgYW4gYWx0ZXJuYXRpdmUuXG5cdCAqL1xuXHRASW5wdXQoKSBzdGFydERhdGU6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk/OiBudW1iZXIgfTtcblxuXHQvKipcblx0ICogRG90cyB0byBzaG93IGJlbG93IGV2ZXJ5IGRheS5cblx0ICovXG5cdEBJbnB1dCgpIGRvdHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfTtcblxuXHQvKipcblx0ICogVGhlIHdheSB3ZWVrZGF5cyBzaG91bGQgYmUgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiAqIGB0cnVlYCAtIHdlZWtkYXlzIGFyZSBkaXNwbGF5ZWQgdXNpbmcgZGVmYXVsdCB3aWR0aFxuXHQgKiAqIGBmYWxzZWAgLSB3ZWVrZGF5cyBhcmUgbm90IGRpc3BsYXllZFxuXHQgKiAqIGBUcmFuc2xhdGlvbldpZHRoYCAtIHdlZWtkYXlzIGFyZSBkaXNwbGF5ZWQgdXNpbmcgc3BlY2lmaWVkIHdpZHRoXG5cdCAqXG5cdCAqIEBzaW5jZSA5LjEuMFxuXHQgKi9cblx0QElucHV0KCkgd2Vla2RheXM6IFRyYW5zbGF0aW9uV2lkdGggfCBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBkaXNwbGF5ZWQgbW9udGggY2hhbmdlcy5cblx0ICpcblx0ICogU2VlIFtgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnRgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQpIGZvciB0aGUgcGF5bG9hZCBpbmZvLlxuXHQgKi9cblx0QE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudD4oKTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG5cdCAqXG5cdCAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgYE5nYkRhdGVgLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4yLjBcblx0ICovXG5cdEBPdXRwdXQoKSBkYXRlU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG5cdG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cdG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhcixcblx0XHRwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bixcblx0XHRjb25maWc6IE5nYkRhdGVwaWNrZXJDb25maWcsXG5cdFx0Y2Q6IENoYW5nZURldGVjdG9yUmVmLFxuXHRcdHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX25nYkRhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHQpIHtcblx0XHRbXG5cdFx0XHQnY29udGVudFRlbXBsYXRlJyxcblx0XHRcdCdkYXlUZW1wbGF0ZScsXG5cdFx0XHQnZGF5VGVtcGxhdGVEYXRhJyxcblx0XHRcdCdkaXNwbGF5TW9udGhzJyxcblx0XHRcdCdmaXJzdERheU9mV2VlaycsXG5cdFx0XHQnZm9vdGVyVGVtcGxhdGUnLFxuXHRcdFx0J21hcmtEaXNhYmxlZCcsXG5cdFx0XHQnbWluRGF0ZScsXG5cdFx0XHQnbWF4RGF0ZScsXG5cdFx0XHQnbmF2aWdhdGlvbicsXG5cdFx0XHQnb3V0c2lkZURheXMnLFxuXHRcdFx0J3Nob3dXZWVrTnVtYmVycycsXG5cdFx0XHQnc3RhcnREYXRlJyxcblx0XHRcdCd3ZWVrZGF5cycsXG5cdFx0XS5mb3JFYWNoKChpbnB1dCkgPT4gKHRoaXNbaW5wdXRdID0gY29uZmlnW2lucHV0XSkpO1xuXG5cdFx0X3NlcnZpY2UuZGF0ZVNlbGVjdCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoZGF0ZSkgPT4ge1xuXHRcdFx0dGhpcy5kYXRlU2VsZWN0LmVtaXQoZGF0ZSk7XG5cdFx0fSk7XG5cblx0XHRfc2VydmljZS5tb2RlbCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZSgobW9kZWwpID0+IHtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBtb2RlbC5maXJzdERhdGUhO1xuXHRcdFx0Y29uc3Qgb2xkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZpcnN0RGF0ZSA6IG51bGw7XG5cblx0XHRcdC8vIHVwZGF0ZSBwdWJsaWMgc3RhdGVcblx0XHRcdHRoaXMuX3B1YmxpY1N0YXRlID0ge1xuXHRcdFx0XHRtYXhEYXRlOiBtb2RlbC5tYXhEYXRlLFxuXHRcdFx0XHRtaW5EYXRlOiBtb2RlbC5taW5EYXRlLFxuXHRcdFx0XHRmaXJzdERhdGU6IG1vZGVsLmZpcnN0RGF0ZSEsXG5cdFx0XHRcdGxhc3REYXRlOiBtb2RlbC5sYXN0RGF0ZSEsXG5cdFx0XHRcdGZvY3VzZWREYXRlOiBtb2RlbC5mb2N1c0RhdGUhLFxuXHRcdFx0XHRtb250aHM6IG1vZGVsLm1vbnRocy5tYXAoKHZpZXdNb2RlbCkgPT4gdmlld01vZGVsLmZpcnN0RGF0ZSksXG5cdFx0XHR9O1xuXG5cdFx0XHRsZXQgbmF2aWdhdGlvblByZXZlbnRlZCA9IGZhbHNlO1xuXHRcdFx0Ly8gZW1pdHRpbmcgbmF2aWdhdGlvbiBldmVudCBpZiB0aGUgZmlyc3QgbW9udGggY2hhbmdlc1xuXHRcdFx0aWYgKCFuZXdEYXRlLmVxdWFscyhvbGREYXRlKSkge1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlLmVtaXQoe1xuXHRcdFx0XHRcdGN1cnJlbnQ6IG9sZERhdGUgPyB7IHllYXI6IG9sZERhdGUueWVhciwgbW9udGg6IG9sZERhdGUubW9udGggfSA6IG51bGwsXG5cdFx0XHRcdFx0bmV4dDogeyB5ZWFyOiBuZXdEYXRlLnllYXIsIG1vbnRoOiBuZXdEYXRlLm1vbnRoIH0sXG5cdFx0XHRcdFx0cHJldmVudERlZmF1bHQ6ICgpID0+IChuYXZpZ2F0aW9uUHJldmVudGVkID0gdHJ1ZSksXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGNhbid0IHByZXZlbnQgdGhlIHZlcnkgZmlyc3QgbmF2aWdhdGlvblxuXHRcdFx0XHRpZiAobmF2aWdhdGlvblByZXZlbnRlZCAmJiBvbGREYXRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy5fc2VydmljZS5vcGVuKG9sZERhdGUpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBuZXdTZWxlY3RlZERhdGUgPSBtb2RlbC5zZWxlY3RlZERhdGU7XG5cdFx0XHRjb25zdCBuZXdGb2N1c2VkRGF0ZSA9IG1vZGVsLmZvY3VzRGF0ZTtcblx0XHRcdGNvbnN0IG9sZEZvY3VzZWREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZm9jdXNEYXRlIDogbnVsbDtcblxuXHRcdFx0dGhpcy5tb2RlbCA9IG1vZGVsO1xuXG5cdFx0XHQvLyBoYW5kbGluZyBzZWxlY3Rpb24gY2hhbmdlXG5cdFx0XHRpZiAoaXNDaGFuZ2VkRGF0ZShuZXdTZWxlY3RlZERhdGUsIHRoaXMuX2NvbnRyb2xWYWx1ZSkpIHtcblx0XHRcdFx0dGhpcy5fY29udHJvbFZhbHVlID0gbmV3U2VsZWN0ZWREYXRlO1xuXHRcdFx0XHR0aGlzLm9uVG91Y2hlZCgpO1xuXHRcdFx0XHR0aGlzLm9uQ2hhbmdlKHRoaXMuX25nYkRhdGVBZGFwdGVyLnRvTW9kZWwobmV3U2VsZWN0ZWREYXRlKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGhhbmRsaW5nIGZvY3VzIGNoYW5nZVxuXHRcdFx0aWYgKGlzQ2hhbmdlZERhdGUobmV3Rm9jdXNlZERhdGUsIG9sZEZvY3VzZWREYXRlKSAmJiBvbGRGb2N1c2VkRGF0ZSAmJiBtb2RlbC5mb2N1c1Zpc2libGUpIHtcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0fVxuXG5cdFx0XHRjZC5tYXJrRm9yQ2hlY2soKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiAgUmV0dXJucyB0aGUgcmVhZG9ubHkgcHVibGljIHN0YXRlIG9mIHRoZSBkYXRlcGlja2VyXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjIuMFxuXHQgKi9cblx0Z2V0IHN0YXRlKCk6IE5nYkRhdGVwaWNrZXJTdGF0ZSB7XG5cdFx0cmV0dXJuIHRoaXMuX3B1YmxpY1N0YXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqICBSZXR1cm5zIHRoZSBjYWxlbmRhciBzZXJ2aWNlIHVzZWQgaW4gdGhlIHNwZWNpZmljIGRhdGVwaWNrZXIgaW5zdGFuY2UuXG5cdCAqXG5cdCAqICBAc2luY2UgNS4zLjBcblx0ICovXG5cdGdldCBjYWxlbmRhcigpOiBOZ2JDYWxlbmRhciB7XG5cdFx0cmV0dXJuIHRoaXMuX2NhbGVuZGFyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGkxOG4gc2VydmljZSB1c2VkIGluIHRoZSBzcGVjaWZpYyBkYXRlcGlja2VyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAc2luY2UgMTQuMi4wXG5cdCAqL1xuXHRnZXQgaTE4bigpOiBOZ2JEYXRlcGlja2VySTE4biB7XG5cdFx0cmV0dXJuIHRoaXMuX2kxOG47XG5cdH1cblxuXHQvKipcblx0ICogIEZvY3VzZXMgb24gZ2l2ZW4gZGF0ZS5cblx0ICovXG5cdGZvY3VzRGF0ZShkYXRlPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXJ2aWNlLmZvY3VzKE5nYkRhdGUuZnJvbShkYXRlKSk7XG5cdH1cblxuXHQvKipcblx0ICogIFNlbGVjdHMgZm9jdXNlZCBkYXRlLlxuXHQgKi9cblx0Zm9jdXNTZWxlY3QoKTogdm9pZCB7XG5cdFx0dGhpcy5fc2VydmljZS5mb2N1c1NlbGVjdCgpO1xuXHR9XG5cblx0Zm9jdXMoKSB7XG5cdFx0dGhpcy5fbmdab25lLm9uU3RhYmxlXG5cdFx0XHQuYXNPYnNlcnZhYmxlKClcblx0XHRcdC5waXBlKHRha2UoMSkpXG5cdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudFRvRm9jdXMgPVxuXHRcdFx0XHRcdHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignZGl2Lm5nYi1kcC1kYXlbdGFiaW5kZXg9XCIwXCJdJyk7XG5cdFx0XHRcdGlmIChlbGVtZW50VG9Gb2N1cykge1xuXHRcdFx0XHRcdGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRlcyB0byB0aGUgcHJvdmlkZWQgZGF0ZS5cblx0ICpcblx0ICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cblx0ICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXG5cdCAqXG5cdCAqIFVzZSB0aGUgYFtzdGFydERhdGVdYCBpbnB1dCBhcyBhbiBhbHRlcm5hdGl2ZS5cblx0ICovXG5cdG5hdmlnYXRlVG8oZGF0ZT86IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk/OiBudW1iZXIgfSkge1xuXHRcdHRoaXMuX3NlcnZpY2Uub3BlbihOZ2JEYXRlLmZyb20oZGF0ZSA/IChkYXRlLmRheSA/IChkYXRlIGFzIE5nYkRhdGVTdHJ1Y3QpIDogeyAuLi5kYXRlLCBkYXk6IDEgfSkgOiBudWxsKSk7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdGNvbnN0IGZvY3VzSW5zJCA9IGZyb21FdmVudDxGb2N1c0V2ZW50Pih0aGlzLl9jb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2ZvY3VzaW4nKTtcblx0XHRcdGNvbnN0IGZvY3VzT3V0cyQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4odGhpcy5fY29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdmb2N1c291dCcpO1xuXHRcdFx0Y29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSB0aGlzLl9lbGVtZW50UmVmO1xuXG5cdFx0XHQvLyB3ZSdyZSBjaGFuZ2luZyAnZm9jdXNWaXNpYmxlJyBvbmx5IHdoZW4gZW50ZXJpbmcgb3IgbGVhdmluZyBtb250aHMgdmlld1xuXHRcdFx0Ly8gYW5kIGlnbm9yaW5nIGFsbCBmb2N1cyBldmVudHMgd2hlcmUgYm90aCAndGFyZ2V0JyBhbmQgJ3JlbGF0ZWQnIHRhcmdldCBhcmUgZGF5IGNlbGxzXG5cdFx0XHRtZXJnZShmb2N1c0lucyQsIGZvY3VzT3V0cyQpXG5cdFx0XHRcdC5waXBlKFxuXHRcdFx0XHRcdGZpbHRlcihcblx0XHRcdFx0XHRcdCh7IHRhcmdldCwgcmVsYXRlZFRhcmdldCB9KSA9PlxuXHRcdFx0XHRcdFx0XHQhKFxuXHRcdFx0XHRcdFx0XHRcdGhhc0NsYXNzTmFtZSh0YXJnZXQsICduZ2ItZHAtZGF5JykgJiZcblx0XHRcdFx0XHRcdFx0XHRoYXNDbGFzc05hbWUocmVsYXRlZFRhcmdldCwgJ25nYi1kcC1kYXknKSAmJlxuXHRcdFx0XHRcdFx0XHRcdG5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0IGFzIE5vZGUpICYmXG5cdFx0XHRcdFx0XHRcdFx0bmF0aXZlRWxlbWVudC5jb250YWlucyhyZWxhdGVkVGFyZ2V0IGFzIE5vZGUpXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHR0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCksXG5cdFx0XHRcdClcblx0XHRcdFx0LnN1YnNjcmliZSgoeyB0eXBlIH0pID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fc2VydmljZS5zZXQoeyBmb2N1c1Zpc2libGU6IHR5cGUgPT09ICdmb2N1c2luJyB9KSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG5cdFx0XHRbXG5cdFx0XHRcdCdkYXlUZW1wbGF0ZURhdGEnLFxuXHRcdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHRcdCdtYXJrRGlzYWJsZWQnLFxuXHRcdFx0XHQnZmlyc3REYXlPZldlZWsnLFxuXHRcdFx0XHQnbmF2aWdhdGlvbicsXG5cdFx0XHRcdCdtaW5EYXRlJyxcblx0XHRcdFx0J21heERhdGUnLFxuXHRcdFx0XHQnb3V0c2lkZURheXMnLFxuXHRcdFx0XHQnd2Vla2RheXMnLFxuXHRcdFx0XS5mb3JFYWNoKChuYW1lKSA9PiAoaW5wdXRzW25hbWVdID0gdGhpc1tuYW1lXSkpO1xuXHRcdFx0dGhpcy5fc2VydmljZS5zZXQoaW5wdXRzKTtcblxuXHRcdFx0dGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmRheVRlbXBsYXRlKSB7XG5cdFx0XHR0aGlzLmRheVRlbXBsYXRlID0gdGhpcy5fZGVmYXVsdERheVRlbXBsYXRlO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG5cdFx0W1xuXHRcdFx0J2RheVRlbXBsYXRlRGF0YScsXG5cdFx0XHQnZGlzcGxheU1vbnRocycsXG5cdFx0XHQnbWFya0Rpc2FibGVkJyxcblx0XHRcdCdmaXJzdERheU9mV2VlaycsXG5cdFx0XHQnbmF2aWdhdGlvbicsXG5cdFx0XHQnbWluRGF0ZScsXG5cdFx0XHQnbWF4RGF0ZScsXG5cdFx0XHQnb3V0c2lkZURheXMnLFxuXHRcdFx0J3dlZWtkYXlzJyxcblx0XHRdXG5cdFx0XHQuZmlsdGVyKChuYW1lKSA9PiBuYW1lIGluIGNoYW5nZXMpXG5cdFx0XHQuZm9yRWFjaCgobmFtZSkgPT4gKGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pKTtcblx0XHR0aGlzLl9zZXJ2aWNlLnNldChpbnB1dHMpO1xuXG5cdFx0aWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcblx0XHRcdGNvbnN0IHsgY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlIH0gPSBjaGFuZ2VzLnN0YXJ0RGF0ZTtcblx0XHRcdGlmIChpc0NoYW5nZWRNb250aChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25EYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHtcblx0XHR0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xuXHRcdHRoaXMuX3NlcnZpY2Uuc2VsZWN0KGRhdGUsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuXHR9XG5cblx0b25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkge1xuXHRcdHRoaXMuX3NlcnZpY2Uub3BlbihkYXRlKTtcblx0fVxuXG5cdG9uTmF2aWdhdGVFdmVudChldmVudDogTmF2aWdhdGlvbkV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudCkge1xuXHRcdFx0Y2FzZSBOYXZpZ2F0aW9uRXZlbnQuUFJFVjpcblx0XHRcdFx0dGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldFByZXYodGhpcy5tb2RlbC5maXJzdERhdGUhLCAnbScsIDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIE5hdmlnYXRpb25FdmVudC5ORVhUOlxuXHRcdFx0XHR0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLm1vZGVsLmZpcnN0RGF0ZSEsICdtJywgMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vbkNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fc2VydmljZS5zZXQoeyBkaXNhYmxlZCB9KTtcblx0fVxuXG5cdHdyaXRlVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLl9jb250cm9sVmFsdWUgPSBOZ2JEYXRlLmZyb20odGhpcy5fbmdiRGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG5cdFx0dGhpcy5fc2VydmljZS5zZWxlY3QodGhpcy5fY29udHJvbFZhbHVlKTtcblx0fVxuXG5cdGdldERvdHNGb3JEYXkoZGF5OiBOZ2JEYXRlKSB7XG5cdFx0cmV0dXJuIHRoaXMuZG90cz8uW2Ake2RheS55ZWFyfS0ke2RheS5tb250aH0tJHtkYXkuZGF5fWBdO1xuXHR9XG59XG4iXX0=