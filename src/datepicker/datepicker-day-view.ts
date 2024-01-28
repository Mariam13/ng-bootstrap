import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';

@Component({
	selector: '[ngbDatepickerDayView]',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styleUrl: './datepicker-day-view.scss',
	imports: [CommonModule],
	host: {
		class: 'btn-light',
		'[class.bg-primary]': 'selected',
		'[class.text-white]': 'selected',
		'[class.text-muted]': 'isMuted()',
		'[class.outside]': 'isMuted()',
		'[class.active]': 'focused',
	},
	template: `<div class="date-with-info">
		<span>
			{{ i18n.getDayNumerals(date) }}
		</span>
		<div *ngIf="dots?.length" class="date-with-info-dots">
			<div *ngFor="let dot of dots" [ngStyle]="{ 'background-color': dot }"></div>
		</div>
	</div>`,
})
export class NgbDatepickerDayView {
	i18n = inject(NgbDatepickerI18n);

	@Input() currentMonth: number;
	@Input() date: NgbDate;
	@Input() disabled: boolean;
	@Input() focused: boolean;
	@Input() selected: boolean;
	@Input() dots: string[];

	isMuted() {
		return !this.selected && (this.date.month !== this.currentMonth || this.disabled);
	}
}
