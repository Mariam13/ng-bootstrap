import { Component, ContentChild, Directive, EventEmitter, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./pagination-config";
/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationEllipsis {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationEllipsis.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationEllipsis, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationEllipsis.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationEllipsis, isStandalone: true, selector: "ng-template[ngbPaginationEllipsis]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationEllipsis, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationEllipsis]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationFirst {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationFirst.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationFirst, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationFirst.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationFirst, isStandalone: true, selector: "ng-template[ngbPaginationFirst]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationFirst, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationFirst]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationLast {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationLast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationLast, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationLast.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationLast, isStandalone: true, selector: "ng-template[ngbPaginationLast]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationLast, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationLast]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNext {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationNext, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationNext.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationNext, isStandalone: true, selector: "ng-template[ngbPaginationNext]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationNext, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNext]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNumber {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNumber.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationNumber, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationNumber.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationNumber, isStandalone: true, selector: "ng-template[ngbPaginationNumber]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationNumber, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNumber]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationPrevious {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPrevious.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationPrevious, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationPrevious.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationPrevious, isStandalone: true, selector: "ng-template[ngbPaginationPrevious]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationPrevious, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPrevious]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
export class NgbPaginationPages {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPages.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationPages, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPaginationPages.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPaginationPages, isStandalone: true, selector: "ng-template[ngbPaginationPages]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPaginationPages, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPages]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
export class NgbPagination {
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    hasPrevious() {
        return this.page > 1;
    }
    hasNext() {
        return this.page < this.pageCount;
    }
    nextDisabled() {
        return !this.hasNext() || this.disabled;
    }
    previousDisabled() {
        return !this.hasPrevious() || this.disabled;
    }
    selectPage(pageNumber) {
        this._updatePages(pageNumber);
    }
    ngOnChanges(changes) {
        this._updatePages(this.page);
    }
    isEllipsis(pageNumber) {
        return pageNumber === -1;
    }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < this.pageCount - 2) {
                    this.pages.push(-1);
                }
                else if (end === this.pageCount - 2) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    _applyPagination() {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPagination, deps: [{ token: i1.NgbPaginationConfig }], target: i0.ɵɵFactoryTarget.Component });
NgbPagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NgbPagination, isStandalone: true, selector: "ngb-pagination", inputs: { disabled: "disabled", boundaryLinks: "boundaryLinks", directionLinks: "directionLinks", ellipses: "ellipses", rotate: "rotate", collectionSize: "collectionSize", maxSize: "maxSize", page: "page", pageSize: "pageSize", size: "size" }, outputs: { pageChange: "pageChange" }, host: { attributes: { "role": "navigation" } }, queries: [{ propertyName: "tplEllipsis", first: true, predicate: NgbPaginationEllipsis, descendants: true }, { propertyName: "tplFirst", first: true, predicate: NgbPaginationFirst, descendants: true }, { propertyName: "tplLast", first: true, predicate: NgbPaginationLast, descendants: true }, { propertyName: "tplNext", first: true, predicate: NgbPaginationNext, descendants: true }, { propertyName: "tplNumber", first: true, predicate: NgbPaginationNumber, descendants: true }, { propertyName: "tplPrevious", first: true, predicate: NgbPaginationPrevious, descendants: true }, { propertyName: "tplPages", first: true, predicate: NgbPaginationPages, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			<li
				*ngFor="let pageNumber of pages"
				class="page-item"
				[class.active]="pageNumber === page"
				[class.disabled]="isEllipsis(pageNumber) || disabled"
				[attr.aria-current]="pageNumber === page ? 'page' : null"
			>
				<a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
					<ng-template
						[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
						[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
					></ng-template>
				</a>
				<a
					*ngIf="!isEllipsis(pageNumber)"
					class="page-link"
					href
					(click)="selectPage(pageNumber); $event.preventDefault()"
					[attr.tabindex]="disabled ? '-1' : null"
					[attr.aria-disabled]="disabled ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
						[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="First"
					i18n-aria-label="@@ngb.pagination.first-aria"
					class="page-link"
					href
					(click)="selectPage(1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplFirst?.templateRef || first"
						[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="directionLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="Previous"
					i18n-aria-label="@@ngb.pagination.previous-aria"
					class="page-link"
					href
					(click)="selectPage(page - 1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
						[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
					></ng-template>
				</a>
			</li>
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			>
			</ng-template>
			<li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Next"
					i18n-aria-label="@@ngb.pagination.next-aria"
					class="page-link"
					href
					(click)="selectPage(page + 1); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNext?.templateRef || next"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Last"
					i18n-aria-label="@@ngb.pagination.last-aria"
					class="page-link"
					href
					(click)="selectPage(pageCount); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplLast?.templateRef || last"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ul>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-pagination',
                    standalone: true,
                    imports: [NgIf, NgFor, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { role: 'navigation' },
                    template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			<li
				*ngFor="let pageNumber of pages"
				class="page-item"
				[class.active]="pageNumber === page"
				[class.disabled]="isEllipsis(pageNumber) || disabled"
				[attr.aria-current]="pageNumber === page ? 'page' : null"
			>
				<a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
					<ng-template
						[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
						[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
					></ng-template>
				</a>
				<a
					*ngIf="!isEllipsis(pageNumber)"
					class="page-link"
					href
					(click)="selectPage(pageNumber); $event.preventDefault()"
					[attr.tabindex]="disabled ? '-1' : null"
					[attr.aria-disabled]="disabled ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
						[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="First"
					i18n-aria-label="@@ngb.pagination.first-aria"
					class="page-link"
					href
					(click)="selectPage(1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplFirst?.templateRef || first"
						[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="directionLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="Previous"
					i18n-aria-label="@@ngb.pagination.previous-aria"
					class="page-link"
					href
					(click)="selectPage(page - 1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
						[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
					></ng-template>
				</a>
			</li>
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			>
			</ng-template>
			<li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Next"
					i18n-aria-label="@@ngb.pagination.next-aria"
					class="page-link"
					href
					(click)="selectPage(page + 1); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNext?.templateRef || next"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Last"
					i18n-aria-label="@@ngb.pagination.last-aria"
					class="page-link"
					href
					(click)="selectPage(pageCount); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplLast?.templateRef || last"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ul>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbPaginationConfig }]; }, propDecorators: { tplEllipsis: [{
                type: ContentChild,
                args: [NgbPaginationEllipsis, { static: false }]
            }], tplFirst: [{
                type: ContentChild,
                args: [NgbPaginationFirst, { static: false }]
            }], tplLast: [{
                type: ContentChild,
                args: [NgbPaginationLast, { static: false }]
            }], tplNext: [{
                type: ContentChild,
                args: [NgbPaginationNext, { static: false }]
            }], tplNumber: [{
                type: ContentChild,
                args: [NgbPaginationNumber, { static: false }]
            }], tplPrevious: [{
                type: ContentChild,
                args: [NgbPaginationPrevious, { static: false }]
            }], tplPages: [{
                type: ContentChild,
                args: [NgbPaginationPages, { static: false }]
            }], disabled: [{
                type: Input
            }], boundaryLinks: [{
                type: Input
            }], directionLinks: [{
                type: Input
            }], ellipses: [{
                type: Input
            }], rotate: [{
                type: Input
            }], collectionSize: [{
                type: Input
            }], maxSize: [{
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdpbmF0aW9uL3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLHVCQUF1QixHQUd2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6RCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFnRWhFOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2pDLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7O21IQUQ3RCxxQkFBcUI7dUdBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQURqQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLG9DQUFvQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7O0FBSy9FOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzlCLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7O2dIQUQ3RCxrQkFBa0I7b0dBQWxCLGtCQUFrQjs0RkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7O0FBSzVFOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBQzdCLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7OytHQUQ3RCxpQkFBaUI7bUdBQWpCLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUQ3QixTQUFT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U0ksVUFBVTtzQkFBbkIsTUFBTTtnQkFTRSxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbnRlbnRDaGlsZCxcblx0RGlyZWN0aXZlLFxuXHRFdmVudEVtaXR0ZXIsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdE9uQ2hhbmdlcyxcblx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXIgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgTmdiUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xuaW1wb3J0IHsgTmdGb3IsIE5nSWYsIE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlXG4gKiAqIGBOZ2JQYWdpbmF0aW9uRmlyc3RgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uUHJldmlvdXNgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uTmV4dGBcbiAqICogYE5nYlBhZ2luYXRpb25MYXN0YFxuICogKiBgTmdiUGFnaW5hdGlvbkVsbGlwc2lzYFxuICogKiBgTmdiUGFnaW5hdGlvblBhZ2VzYFxuICpcbiAqIGxpbmsgdGVtcGxhdGVzIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dCB7XG5cdC8qKlxuXHQgKiBQYWdlIG51bWJlciBkaXNwbGF5ZWQgYnkgdGhlIGN1cnJlbnQgbGluay5cblx0ICovXG5cdGN1cnJlbnRQYWdlOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbGluayBpcyBkaXNhYmxlZC5cblx0ICovXG5cdGRpc2FibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYWdpbmF0aW9uTnVtYmVyYCBsaW5rIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lLlxuICpcbiAqIEV4dGVuZHMgYE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dGAuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvbk51bWJlckNvbnRleHQgZXh0ZW5kcyBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQge1xuXHQvKipcblx0ICogVGhlIHBhZ2UgbnVtYmVyLCBkaXNwbGF5ZWQgYnkgdGhlIGN1cnJlbnQgcGFnZSBsaW5rLlxuXHQgKi9cblx0JGltcGxpY2l0OiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBjb250ZXh0IGZvciB0aGUgYE5nYlBhZ2luYXRpb25QYWdlc2AgcGFnZXMgdGVtcGxhdGUgaW4gY2FzZSB5b3Ugd2FudCB0byBvdmVycmlkZVxuICogdGhlIHdheSBhbGwgcGFnZXMgYXJlIGRpc3BsYXllZC5cbiAqXG4gKiBAc2luY2UgOS4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uUGFnZXNDb250ZXh0IHtcblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBudW1iZXIuXG5cdCAqL1xuXHQkaW1wbGljaXQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBwYWdpbmF0aW9uIGlzIGRpc2FibGVkLlxuXHQgKi9cblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFBhZ2VzIG51bWJlcnMgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQgc3RhcnRpbmcgd2l0aCAxLlxuXHQgKi9cblx0cGFnZXM6IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnZWxsaXBzaXMnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkVsbGlwc2lzXScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdmaXJzdCcgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uRmlyc3RdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25GaXJzdCB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2xhc3QnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkxhc3RdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25MYXN0IHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnbmV4dCcgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTmV4dF0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbk5leHQge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlIHBhZ2UgJ251bWJlcicgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTnVtYmVyXScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTnVtYmVyIHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTnVtYmVyQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdwcmV2aW91cycgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uUHJldmlvdXNdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25QcmV2aW91cyB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ3BhZ2VzJyB3aG9sZSBjb250ZW50XG4gKlxuICogQHNpbmNlIDkuMS4wXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25QYWdlc10nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvblBhZ2VzIHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uUGFnZXNDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIHBhZ2UgbnVtYmVycyBhbmQgYWxsb3dzIHRvIGN1c3RvbWl6ZSB0aGVtIGluIHNldmVyYWwgd2F5cy5cbiAqL1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLXBhZ2luYXRpb24nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIE5nVGVtcGxhdGVPdXRsZXRdLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0aG9zdDogeyByb2xlOiAnbmF2aWdhdGlvbicgfSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8bmctdGVtcGxhdGUgI2ZpcnN0PjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLmZpcnN0XCI+JmxhcXVvOyZsYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgI3ByZXZpb3VzPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzXCI+JmxhcXVvOzwvc3Bhbj48L25nLXRlbXBsYXRlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbmV4dD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0XCI+JnJhcXVvOzwvc3Bhbj48L25nLXRlbXBsYXRlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbGFzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0XCI+JnJhcXVvOyZyYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgI2VsbGlwc2lzPi4uLjwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlICNkZWZhdWx0TnVtYmVyIGxldC1wYWdlIGxldC1jdXJyZW50UGFnZT1cImN1cnJlbnRQYWdlXCI+e3sgcGFnZSB9fTwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlICNkZWZhdWx0UGFnZXMgbGV0LXBhZ2UgbGV0LXBhZ2VzPVwicGFnZXNcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPlxuXHRcdFx0PGxpXG5cdFx0XHRcdCpuZ0Zvcj1cImxldCBwYWdlTnVtYmVyIG9mIHBhZ2VzXCJcblx0XHRcdFx0Y2xhc3M9XCJwYWdlLWl0ZW1cIlxuXHRcdFx0XHRbY2xhc3MuYWN0aXZlXT1cInBhZ2VOdW1iZXIgPT09IHBhZ2VcIlxuXHRcdFx0XHRbY2xhc3MuZGlzYWJsZWRdPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKSB8fCBkaXNhYmxlZFwiXG5cdFx0XHRcdFthdHRyLmFyaWEtY3VycmVudF09XCJwYWdlTnVtYmVyID09PSBwYWdlID8gJ3BhZ2UnIDogbnVsbFwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxhICpuZ0lmPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtZGlzYWJsZWQ9XCJ0cnVlXCI+XG5cdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxFbGxpcHNpcz8udGVtcGxhdGVSZWYgfHwgZWxsaXBzaXNcIlxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGlzYWJsZWQ6IHRydWUsIGN1cnJlbnRQYWdlOiBwYWdlIH1cIlxuXHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0Km5nSWY9XCIhaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiXG5cdFx0XHRcdFx0Y2xhc3M9XCJwYWdlLWxpbmtcIlxuXHRcdFx0XHRcdGhyZWZcblx0XHRcdFx0XHQoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlTnVtYmVyKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gJy0xJyA6IG51bGxcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWQgPyAndHJ1ZScgOiBudWxsXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTnVtYmVyPy50ZW1wbGF0ZVJlZiB8fCBkZWZhdWx0TnVtYmVyXCJcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRpc2FibGVkOiBkaXNhYmxlZCwgJGltcGxpY2l0OiBwYWdlTnVtYmVyLCBjdXJyZW50UGFnZTogcGFnZSB9XCJcblx0XHRcdFx0XHQ+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PC9hPlxuXHRcdFx0PC9saT5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXHRcdDx1bCBbY2xhc3NdPVwiJ3BhZ2luYXRpb24nICsgKHNpemUgPyAnIHBhZ2luYXRpb24tJyArIHNpemUgOiAnJylcIj5cblx0XHRcdDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCJwcmV2aW91c0Rpc2FibGVkKClcIj5cblx0XHRcdFx0PGFcblx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiRmlyc3RcIlxuXHRcdFx0XHRcdGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3QtYXJpYVwiXG5cdFx0XHRcdFx0Y2xhc3M9XCJwYWdlLWxpbmtcIlxuXHRcdFx0XHRcdGhyZWZcblx0XHRcdFx0XHQoY2xpY2spPVwic2VsZWN0UGFnZSgxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFthdHRyLnRhYmluZGV4XT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcblx0XHRcdFx0XHRbYXR0ci5hcmlhLWRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxGaXJzdD8udGVtcGxhdGVSZWYgfHwgZmlyc3RcIlxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGlzYWJsZWQ6IHByZXZpb3VzRGlzYWJsZWQoKSwgY3VycmVudFBhZ2U6IHBhZ2UgfVwiXG5cdFx0XHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cblx0XHRcdDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpXCI+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0YXJpYS1sYWJlbD1cIlByZXZpb3VzXCJcblx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzLWFyaWFcIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFnZS1saW5rXCJcblx0XHRcdFx0XHRocmVmXG5cdFx0XHRcdFx0KGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSAtIDEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG5cdFx0XHRcdFx0W2F0dHIudGFiaW5kZXhdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJ3RydWUnIDogbnVsbFwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbFByZXZpb3VzPy50ZW1wbGF0ZVJlZiB8fCBwcmV2aW91c1wiXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkaXNhYmxlZDogcHJldmlvdXNEaXNhYmxlZCgpIH1cIlxuXHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2xpPlxuXHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbFBhZ2VzPy50ZW1wbGF0ZVJlZiB8fCBkZWZhdWx0UGFnZXNcIlxuXHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHBhZ2UsIHBhZ2VzOiBwYWdlcywgZGlzYWJsZWQ6IGRpc2FibGVkIH1cIlxuXHRcdFx0PlxuXHRcdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHRcdDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKClcIj5cblx0XHRcdFx0PGFcblx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiTmV4dFwiXG5cdFx0XHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0LWFyaWFcIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFnZS1saW5rXCJcblx0XHRcdFx0XHRocmVmXG5cdFx0XHRcdFx0KGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSArIDEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG5cdFx0XHRcdFx0W2F0dHIudGFiaW5kZXhdPVwibmV4dERpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXG5cdFx0XHRcdFx0W2F0dHIuYXJpYS1kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxOZXh0Py50ZW1wbGF0ZVJlZiB8fCBuZXh0XCJcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRpc2FibGVkOiBuZXh0RGlzYWJsZWQoKSwgY3VycmVudFBhZ2U6IHBhZ2UgfVwiXG5cdFx0XHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cblx0XHRcdDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKVwiPlxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJMYXN0XCJcblx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3QtYXJpYVwiXG5cdFx0XHRcdFx0Y2xhc3M9XCJwYWdlLWxpbmtcIlxuXHRcdFx0XHRcdGhyZWZcblx0XHRcdFx0XHQoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlQ291bnQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG5cdFx0XHRcdFx0W2F0dHIudGFiaW5kZXhdPVwibmV4dERpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXG5cdFx0XHRcdFx0W2F0dHIuYXJpYS1kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxMYXN0Py50ZW1wbGF0ZVJlZiB8fCBsYXN0XCJcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRpc2FibGVkOiBuZXh0RGlzYWJsZWQoKSwgY3VycmVudFBhZ2U6IHBhZ2UgfVwiXG5cdFx0XHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cdFx0PC91bD5cblx0YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cdHBhZ2VDb3VudCA9IDA7XG5cdHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkVsbGlwc2lzLCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsRWxsaXBzaXM/OiBOZ2JQYWdpbmF0aW9uRWxsaXBzaXM7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkZpcnN0LCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsRmlyc3Q/OiBOZ2JQYWdpbmF0aW9uRmlyc3Q7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkxhc3QsIHsgc3RhdGljOiBmYWxzZSB9KSB0cGxMYXN0PzogTmdiUGFnaW5hdGlvbkxhc3Q7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk5leHQsIHsgc3RhdGljOiBmYWxzZSB9KSB0cGxOZXh0PzogTmdiUGFnaW5hdGlvbk5leHQ7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk51bWJlciwgeyBzdGF0aWM6IGZhbHNlIH0pIHRwbE51bWJlcj86IE5nYlBhZ2luYXRpb25OdW1iZXI7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvblByZXZpb3VzLCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsUHJldmlvdXM/OiBOZ2JQYWdpbmF0aW9uUHJldmlvdXM7XG5cdEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvblBhZ2VzLCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsUGFnZXM/OiBOZ2JQYWdpbmF0aW9uUGFnZXM7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgcGFnaW5hdGlvbiBsaW5rcyB3aWxsIGJlIGRpc2FibGVkLlxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIFwiRmlyc3RcIiBhbmQgXCJMYXN0XCIgcGFnZSBsaW5rcyBhcmUgc2hvd24uXG5cdCAqL1xuXHRASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIHBhZ2UgbGlua3MgYXJlIHNob3duLlxuXHQgKi9cblx0QElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGVsbGlwc2lzIHN5bWJvbHMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXJzIHdpbGwgYmUgc2hvd24gd2hlbiBgbWF4U2l6ZWAgPiBudW1iZXIgb2YgcGFnZXMuXG5cdCAqL1xuXHRASW5wdXQoKSBlbGxpcHNlczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogV2hldGhlciB0byByb3RhdGUgcGFnZXMgd2hlbiBgbWF4U2l6ZWAgPiBudW1iZXIgb2YgcGFnZXMuXG5cdCAqXG5cdCAqIFRoZSBjdXJyZW50IHBhZ2UgYWx3YXlzIHN0YXlzIGluIHRoZSBtaWRkbGUgaWYgYHRydWVgLlxuXHQgKi9cblx0QElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiAgVGhlIG51bWJlciBvZiBpdGVtcyBpbiB5b3VyIHBhZ2luYXRlZCBjb2xsZWN0aW9uLlxuXHQgKlxuXHQgKiAgTm90ZSwgdGhhdCB0aGlzIGlzIG5vdCB0aGUgbnVtYmVyIG9mIHBhZ2VzLiBQYWdlIG51bWJlcnMgYXJlIGNhbGN1bGF0ZWQgZHluYW1pY2FsbHkgYmFzZWQgb25cblx0ICogIGBjb2xsZWN0aW9uU2l6ZWAgYW5kIGBwYWdlU2l6ZWAuIEV4LiBpZiB5b3UgaGF2ZSAxMDAgaXRlbXMgaW4geW91ciBjb2xsZWN0aW9uIGFuZCBkaXNwbGF5aW5nIDIwIGl0ZW1zIHBlciBwYWdlLFxuXHQgKiAgeW91J2xsIGVuZCB1cCB3aXRoIDUgcGFnZXMuXG5cdCAqL1xuXHRASW5wdXQoKSBjb2xsZWN0aW9uU2l6ZTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiAgVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhZ2VzIHRvIGRpc3BsYXkuXG5cdCAqL1xuXHRASW5wdXQoKSBtYXhTaXplOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqICBUaGUgY3VycmVudCBwYWdlLlxuXHQgKlxuXHQgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggYDFgLlxuXHQgKi9cblx0QElucHV0KCkgcGFnZSA9IDE7XG5cblx0LyoqXG5cdCAqICBUaGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuXHQgKi9cblx0QElucHV0KCkgcGFnZVNpemU6IG51bWJlcjtcblxuXHQvKipcblx0ICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHBhZ2UgaXMgY2hhbmdlZC4gV2lsbCBmaXJlIG9ubHkgaWYgY29sbGVjdGlvbiBzaXplIGlzIHNldCBhbmQgYWxsIHZhbHVlcyBhcmUgdmFsaWQuXG5cdCAqXG5cdCAqICBFdmVudCBwYXlsb2FkIGlzIHRoZSBudW1iZXIgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHBhZ2UuXG5cdCAqXG5cdCAqICBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCBgMWAuXG5cdCAqL1xuXHRAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcblxuXHQvKipcblx0ICogVGhlIHBhZ2luYXRpb24gZGlzcGxheSBzaXplLlxuXHQgKlxuXHQgKiBCb290c3RyYXAgY3VycmVudGx5IHN1cHBvcnRzIHNtYWxsIGFuZCBsYXJnZSBzaXplcy5cblx0ICpcblx0ICogSWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIHN0cmluZyAoZXguICdjdXN0b20nKSwgaXQgd2lsbCBqdXN0IGFkZCB0aGUgYHBhZ2luYXRpb24tY3VzdG9tYCBjc3MgY2xhc3Ncblx0ICovXG5cdEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbGcnIHwgc3RyaW5nIHwgbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlBhZ2luYXRpb25Db25maWcpIHtcblx0XHR0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xuXHRcdHRoaXMuYm91bmRhcnlMaW5rcyA9IGNvbmZpZy5ib3VuZGFyeUxpbmtzO1xuXHRcdHRoaXMuZGlyZWN0aW9uTGlua3MgPSBjb25maWcuZGlyZWN0aW9uTGlua3M7XG5cdFx0dGhpcy5lbGxpcHNlcyA9IGNvbmZpZy5lbGxpcHNlcztcblx0XHR0aGlzLm1heFNpemUgPSBjb25maWcubWF4U2l6ZTtcblx0XHR0aGlzLnBhZ2VTaXplID0gY29uZmlnLnBhZ2VTaXplO1xuXHRcdHRoaXMucm90YXRlID0gY29uZmlnLnJvdGF0ZTtcblx0XHR0aGlzLnNpemUgPSBjb25maWcuc2l6ZTtcblx0fVxuXG5cdGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnBhZ2UgPiAxO1xuXHR9XG5cblx0aGFzTmV4dCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5wYWdlIDwgdGhpcy5wYWdlQ291bnQ7XG5cdH1cblxuXHRuZXh0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICF0aGlzLmhhc05leHQoKSB8fCB0aGlzLmRpc2FibGVkO1xuXHR9XG5cblx0cHJldmlvdXNEaXNhYmxlZCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzUHJldmlvdXMoKSB8fCB0aGlzLmRpc2FibGVkO1xuXHR9XG5cblx0c2VsZWN0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcblx0XHR0aGlzLl91cGRhdGVQYWdlcyhwYWdlTnVtYmVyKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblx0XHR0aGlzLl91cGRhdGVQYWdlcyh0aGlzLnBhZ2UpO1xuXHR9XG5cblx0aXNFbGxpcHNpcyhwYWdlTnVtYmVyKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHBhZ2VOdW1iZXIgPT09IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZHMgZWxsaXBzZXMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXIgdG8gdGhlIGRpc3BsYXllZCBwYWdlc1xuXHQgKi9cblx0cHJpdmF0ZSBfYXBwbHlFbGxpcHNlcyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuXHRcdGlmICh0aGlzLmVsbGlwc2VzKSB7XG5cdFx0XHRpZiAoc3RhcnQgPiAwKSB7XG5cdFx0XHRcdC8vIFRoZSBmaXJzdCBwYWdlIHdpbGwgYWx3YXlzIGJlIGluY2x1ZGVkLiBJZiB0aGUgZGlzcGxheWVkIHJhbmdlXG5cdFx0XHRcdC8vIHN0YXJ0cyBhZnRlciB0aGUgdGhpcmQgcGFnZSwgdGhlbiBhZGQgZWxsaXBzaXMuIEJ1dCBpZiB0aGUgcmFuZ2Vcblx0XHRcdFx0Ly8gc3RhcnRzIG9uIHRoZSB0aGlyZCBwYWdlLCB0aGVuIGFkZCB0aGUgc2Vjb25kIHBhZ2UgaW5zdGVhZCBvZlxuXHRcdFx0XHQvLyBhbiBlbGxpcHNpcywgYmVjYXVzZSB0aGUgZWxsaXBzaXMgd291bGQgb25seSBoaWRlIGEgc2luZ2xlIHBhZ2UuXG5cdFx0XHRcdGlmIChzdGFydCA+IDIpIHtcblx0XHRcdFx0XHR0aGlzLnBhZ2VzLnVuc2hpZnQoLTEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHN0YXJ0ID09PSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5wYWdlcy51bnNoaWZ0KDIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMucGFnZXMudW5zaGlmdCgxKTtcblx0XHRcdH1cblx0XHRcdGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCkge1xuXHRcdFx0XHQvLyBUaGUgbGFzdCBwYWdlIHdpbGwgYWx3YXlzIGJlIGluY2x1ZGVkLiBJZiB0aGUgZGlzcGxheWVkIHJhbmdlXG5cdFx0XHRcdC8vIGVuZHMgYmVmb3JlIHRoZSB0aGlyZC1sYXN0IHBhZ2UsIHRoZW4gYWRkIGVsbGlwc2lzLiBCdXQgaWYgdGhlIHJhbmdlXG5cdFx0XHRcdC8vIGVuZHMgb24gdGhpcmQtbGFzdCBwYWdlLCB0aGVuIGFkZCB0aGUgc2Vjb25kLWxhc3QgcGFnZSBpbnN0ZWFkIG9mXG5cdFx0XHRcdC8vIGFuIGVsbGlwc2lzLCBiZWNhdXNlIHRoZSBlbGxpcHNpcyB3b3VsZCBvbmx5IGhpZGUgYSBzaW5nbGUgcGFnZS5cblx0XHRcdFx0aWYgKGVuZCA8IHRoaXMucGFnZUNvdW50IC0gMikge1xuXHRcdFx0XHRcdHRoaXMucGFnZXMucHVzaCgtMSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZW5kID09PSB0aGlzLnBhZ2VDb3VudCAtIDIpIHtcblx0XHRcdFx0XHR0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHZpc2libGUuXG5cdCAqIEN1cnJlbnRseSBzZWxlY3RlZCBwYWdlIHN0YXlzIGluIHRoZSBtaWRkbGU6XG5cdCAqXG5cdCAqIEV4LiBmb3Igc2VsZWN0ZWQgcGFnZSA9IDY6XG5cdCAqIFs1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDNcblx0ICogWzQsNSwqNiosN10gZm9yIG1heFNpemUgPSA0XG5cdCAqL1xuXHRwcml2YXRlIF9hcHBseVJvdGF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuXHRcdGxldCBzdGFydCA9IDA7XG5cdFx0bGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xuXHRcdGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKTtcblx0XHRsZXQgcmlnaHRPZmZzZXQgPSB0aGlzLm1heFNpemUgJSAyID09PSAwID8gbGVmdE9mZnNldCAtIDEgOiBsZWZ0T2Zmc2V0O1xuXG5cdFx0aWYgKHRoaXMucGFnZSA8PSBsZWZ0T2Zmc2V0KSB7XG5cdFx0XHQvLyB2ZXJ5IGJlZ2lubmluZywgbm8gcm90YXRpb24gLT4gWzAuLm1heFNpemVdXG5cdFx0XHRlbmQgPSB0aGlzLm1heFNpemU7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnBhZ2VDb3VudCAtIHRoaXMucGFnZSA8IGxlZnRPZmZzZXQpIHtcblx0XHRcdC8vIHZlcnkgZW5kLCBubyByb3RhdGlvbiAtPiBbbGVuLW1heFNpemUuLmxlbl1cblx0XHRcdHN0YXJ0ID0gdGhpcy5wYWdlQ291bnQgLSB0aGlzLm1heFNpemU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHJvdGF0ZVxuXHRcdFx0c3RhcnQgPSB0aGlzLnBhZ2UgLSBsZWZ0T2Zmc2V0IC0gMTtcblx0XHRcdGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdHJldHVybiBbc3RhcnQsIGVuZF07XG5cdH1cblxuXHQvKipcblx0ICogUGFnaW5hdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHBlciBwYWdlLlxuXHQgKi9cblx0cHJpdmF0ZSBfYXBwbHlQYWdpbmF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuXHRcdGxldCBwYWdlID0gTWF0aC5jZWlsKHRoaXMucGFnZSAvIHRoaXMubWF4U2l6ZSkgLSAxO1xuXHRcdGxldCBzdGFydCA9IHBhZ2UgKiB0aGlzLm1heFNpemU7XG5cdFx0bGV0IGVuZCA9IHN0YXJ0ICsgdGhpcy5tYXhTaXplO1xuXG5cdFx0cmV0dXJuIFtzdGFydCwgZW5kXTtcblx0fVxuXG5cdHByaXZhdGUgX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2VObykge1xuXHRcdGNvbnN0IHByZXZQYWdlTm8gPSB0aGlzLnBhZ2U7XG5cdFx0dGhpcy5wYWdlID0gZ2V0VmFsdWVJblJhbmdlKG5ld1BhZ2VObywgdGhpcy5wYWdlQ291bnQsIDEpO1xuXG5cdFx0aWYgKHRoaXMucGFnZSAhPT0gcHJldlBhZ2VObyAmJiBpc051bWJlcih0aGlzLmNvbGxlY3Rpb25TaXplKSkge1xuXHRcdFx0dGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVQYWdlcyhuZXdQYWdlOiBudW1iZXIpIHtcblx0XHR0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLmNvbGxlY3Rpb25TaXplIC8gdGhpcy5wYWdlU2l6ZSk7XG5cblx0XHRpZiAoIWlzTnVtYmVyKHRoaXMucGFnZUNvdW50KSkge1xuXHRcdFx0dGhpcy5wYWdlQ291bnQgPSAwO1xuXHRcdH1cblxuXHRcdC8vIGZpbGwtaW4gbW9kZWwgbmVlZGVkIHRvIHJlbmRlciBwYWdlc1xuXHRcdHRoaXMucGFnZXMubGVuZ3RoID0gMDtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnBhZ2VDb3VudDsgaSsrKSB7XG5cdFx0XHR0aGlzLnBhZ2VzLnB1c2goaSk7XG5cdFx0fVxuXG5cdFx0Ly8gc2V0IHBhZ2Ugd2l0aGluIDEuLm1heCByYW5nZVxuXHRcdHRoaXMuX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2UpO1xuXG5cdFx0Ly8gYXBwbHkgbWF4U2l6ZSBpZiBuZWNlc3Nhcnlcblx0XHRpZiAodGhpcy5tYXhTaXplID4gMCAmJiB0aGlzLnBhZ2VDb3VudCA+IHRoaXMubWF4U2l6ZSkge1xuXHRcdFx0bGV0IHN0YXJ0ID0gMDtcblx0XHRcdGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcblxuXHRcdFx0Ly8gZWl0aGVyIHBhZ2luYXRpbmcgb3Igcm90YXRpbmcgcGFnZSBudW1iZXJzXG5cdFx0XHRpZiAodGhpcy5yb3RhdGUpIHtcblx0XHRcdFx0W3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlSb3RhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0W3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlQYWdpbmF0aW9uKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGFnZXMgPSB0aGlzLnBhZ2VzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG5cdFx0XHQvLyBhZGRpbmcgZWxsaXBzZXNcblx0XHRcdHRoaXMuX2FwcGx5RWxsaXBzZXMoc3RhcnQsIGVuZCk7XG5cdFx0fVxuXHR9XG59XG4iXX0=