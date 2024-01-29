import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
import * as i2 from "@angular/common";
export class NgbDatepickerDayView {
    constructor(i18n) {
        this.i18n = i18n;
    }
    isMuted() {
        return !this.selected && (this.date.month !== this.currentMonth || this.disabled);
    }
}
NgbDatepickerDayView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerDayView, deps: [{ token: i1.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepickerDayView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NgbDatepickerDayView, isStandalone: true, selector: "[ngbDatepickerDayView]", inputs: { currentMonth: "currentMonth", date: "date", dots: "dots", disabled: "disabled", focused: "focused", selected: "selected" }, host: { properties: { "class.bg-primary": "selected", "class.text-white": "selected", "class.text-muted": "isMuted()", "class.outside": "isMuted()", "class.active": "focused" }, classAttribute: "btn-light" }, ngImport: i0, template: `<div class="date-with-info">
		<span>
			{{ i18n.getDayNumerals(date) }}
		</span>
		<div *ngIf="dots?.length" class="date-with-info-dots">
			<div *ngFor="let dot of dots" [ngStyle]="{ 'background-color': dot }"></div>
		</div>
	</div>`, isInline: true, styles: ["[ngbDatepickerDayView]{position:relative;text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}[ngbDatepickerDayView] .date-with-info-dots{display:flex;position:absolute;left:50%;margin:auto;transform:translate(-50%,-50%)}[ngbDatepickerDayView] .date-with-info-dots div{height:4px;width:4px;border-radius:50%;margin:0 1px;background-color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDatepickerDayView, decorators: [{
            type: Component,
            args: [{ selector: '[ngbDatepickerDayView]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [CommonModule], host: {
                        class: 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused',
                    }, template: `<div class="date-with-info">
		<span>
			{{ i18n.getDayNumerals(date) }}
		</span>
		<div *ngIf="dots?.length" class="date-with-info-dots">
			<div *ngFor="let dot of dots" [ngStyle]="{ 'background-color': dot }"></div>
		</div>
	</div>`, styles: ["[ngbDatepickerDayView]{position:relative;text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}[ngbDatepickerDayView] .date-with-info-dots{display:flex;position:absolute;left:50%;margin:auto;transform:translate(-50%,-50%)}[ngbDatepickerDayView] .date-with-info-dots div{height:4px;width:4px;border-radius:50%;margin:0 1px;background-color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }]; }, propDecorators: { currentMonth: [{
                type: Input
            }], date: [{
                type: Input
            }], dots: [{
                type: Input
            }], disabled: [{
                type: Input
            }], focused: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItZGF5LXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBNEIvQyxNQUFNLE9BQU8sb0JBQW9CO0lBUWhDLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO0lBQUcsQ0FBQztJQUU5QyxPQUFPO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRixDQUFDOztrSEFaVyxvQkFBb0I7c0dBQXBCLG9CQUFvQix5YUFUdEI7Ozs7Ozs7UUFPSCxxcUJBaEJHLFlBQVk7NEZBa0JWLG9CQUFvQjtrQkF4QmhDLFNBQVM7K0JBQ0Msd0JBQXdCLGNBQ3RCLElBQUksbUJBQ0MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxXQUU1QixDQUFDLFlBQVksQ0FBQyxRQUNqQjt3QkFDTCxLQUFLLEVBQUUsV0FBVzt3QkFDbEIsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsV0FBVzt3QkFDakMsaUJBQWlCLEVBQUUsV0FBVzt3QkFDOUIsZ0JBQWdCLEVBQUUsU0FBUztxQkFDM0IsWUFDUzs7Ozs7OztRQU9IO3dHQUdFLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdiRGF0ZSB9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHsgTmdiRGF0ZXBpY2tlckkxOG4gfSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEYXRlcGlja2VyRGF5Vmlld10nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1kYXktdmlldy5zY3NzJ10sXG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuXHRob3N0OiB7XG5cdFx0Y2xhc3M6ICdidG4tbGlnaHQnLFxuXHRcdCdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxuXHRcdCdbY2xhc3MudGV4dC13aGl0ZV0nOiAnc2VsZWN0ZWQnLFxuXHRcdCdbY2xhc3MudGV4dC1tdXRlZF0nOiAnaXNNdXRlZCgpJyxcblx0XHQnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXG5cdFx0J1tjbGFzcy5hY3RpdmVdJzogJ2ZvY3VzZWQnLFxuXHR9LFxuXHR0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkYXRlLXdpdGgtaW5mb1wiPlxuXHRcdDxzcGFuPlxuXHRcdFx0e3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fVxuXHRcdDwvc3Bhbj5cblx0XHQ8ZGl2ICpuZ0lmPVwiZG90cz8ubGVuZ3RoXCIgY2xhc3M9XCJkYXRlLXdpdGgtaW5mby1kb3RzXCI+XG5cdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c1wiIFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtY29sb3InOiBkb3QgfVwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyRGF5VmlldyB7XG5cdEBJbnB1dCgpIGN1cnJlbnRNb250aDogbnVtYmVyO1xuXHRASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuXHRASW5wdXQoKSBkb3RzOiBzdHJpbmdbXTtcblx0QElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuXHRpc011dGVkKCkge1xuXHRcdHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTtcblx0fVxufVxuIl19