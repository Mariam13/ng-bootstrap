import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Inject, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT, NgIf, NgTemplateOutlet } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { isString } from '../util/util';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./popover-config";
let nextId = 0;
export class NgbPopoverWindow {
    isTitleTemplate() {
        return this.title instanceof TemplateRef;
    }
}
NgbPopoverWindow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgbPopoverWindow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NgbPopoverWindow, isStandalone: true, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id" }, styleAttribute: "position: absolute;" }, ngImport: i0, template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    standalone: true,
                    imports: [NgTemplateOutlet, NgIf],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                        style: 'position: absolute;',
                    },
                    template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`,
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
export class NgbPopover {
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this._windowRef = null;
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._positioning = ngbPositioning();
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
    }
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('title', this.popoverTitle);
            this._windowRef.setInput('context', context);
            this._windowRef.setInput('popoverClass', this.popoverClass);
            this._windowRef.setInput('id', this._ngbPopoverWindowId);
            this._renderer.setAttribute(this._getPositionTargetElement(), 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    appendToBody: this.container === 'body',
                    baseClass: 'bs-popover',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 8])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [
                this._windowRef.location.nativeElement,
            ]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation = this.animation) {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._getPositionTargetElement(), 'aria-describedby');
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._zoneSubscription?.unsubscribe();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.instance.popoverClass = popoverClass.currentValue;
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._elementRef.nativeElement);
    }
}
NgbPopover.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPopover, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i1.NgbPopoverConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbPopover.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbPopover, isStandalone: true, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i1.NgbPopoverConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3BvdmVyL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBRU4sS0FBSyxFQUtMLE1BQU0sRUFHTixXQUFXLEVBRVgsaUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRzNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQXlCZixNQUFNLE9BQU8sZ0JBQWdCO0lBTzVCLGVBQWU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDO0lBQzFDLENBQUM7OzhHQVRXLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLGdaQVZsQjs7Ozs7Ozs7NERBUWlELDREQWxCakQsZ0JBQWdCLG9KQUFFLElBQUk7NEZBb0JwQixnQkFBZ0I7a0JBdkI1QixTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7b0JBQ2pDLGVBQWUsRUFB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QVU7a0JBRHRCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7MEJBNkk5RSxNQUFNOzJCQUFDLFFBQVE7eUdBcElSLFNBQVM7c0JBQWpCLEtBQUs7Z0JBYUcsU0FBUztzQkFBakIsS0FBSztnQkFPRyxVQUFVO3NCQUFsQixLQUFLO2dCQU9HLFlBQVk7c0JBQXBCLEtBQUs7Z0JBU0csU0FBUztzQkFBakIsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQVFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBUUcsY0FBYztzQkFBdEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBT0csWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0ksS0FBSztzQkFBZCxNQUFNO2dCQU9HLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50UmVmLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRJbmplY3Rvcixcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25DaGFuZ2VzLFxuXHRPbkRlc3Ryb3ksXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGxpc3RlblRvVHJpZ2dlcnMgfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcbmltcG9ydCB7IG5nYkF1dG9DbG9zZSB9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7IG5nYlBvc2l0aW9uaW5nLCBQbGFjZW1lbnRBcnJheSB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7IE5nYlBvcG92ZXJDb25maWcgfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5cbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1wb3BvdmVyLXdpbmRvdycsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ1RlbXBsYXRlT3V0bGV0LCBOZ0lmXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJyxcblx0XHQnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsXG5cdFx0cm9sZTogJ3Rvb2x0aXAnLFxuXHRcdCdbaWRdJzogJ2lkJyxcblx0XHRzdHlsZTogJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsnLFxuXHR9LFxuXHR0ZW1wbGF0ZTogYCA8ZGl2IGNsYXNzPVwicG9wb3Zlci1hcnJvd1wiIGRhdGEtcG9wcGVyLWFycm93PjwvZGl2PlxuXHRcdDxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCIgKm5nSWY9XCJ0aXRsZVwiPlxuXHRcdFx0PG5nLXRlbXBsYXRlICNzaW1wbGVUaXRsZT57eyB0aXRsZSB9fTwvbmctdGVtcGxhdGU+XG5cdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwiaXNUaXRsZVRlbXBsYXRlKCkgPyAkYW55KHRpdGxlKSA6IHNpbXBsZVRpdGxlXCJcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIlxuXHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0PC9oMz5cblx0XHQ8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xuXHRASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cdEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblx0QElucHV0KCkgaWQ6IHN0cmluZztcblx0QElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG5cdEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuXHRpc1RpdGxlVGVtcGxhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGl0bGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcblx0fVxufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUG9wb3ZlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHBvcG92ZXIgb3BlbmluZyBhbmQgY2xvc2luZyB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcblx0ICpcblx0ICogKiBgdHJ1ZWAgLSBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgYEVzY2FwZWAgcHJlc3Nlc1xuXHQgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcblx0ICogKiBgXCJpbnNpZGVcImAgLSBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG5cdCAqICogYFwib3V0c2lkZVwiYCAtIGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuXHQgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcblx0ICpcblx0ICogQHNpbmNlIDMuMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyBjb250ZW50IG9yIGEgYFRlbXBsYXRlUmVmYCBmb3IgdGhlIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwb3BvdmVyLlxuXHQgKlxuXHQgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBmYWxzeSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cblx0ICovXG5cdEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGl0bGUgb2YgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIElmIHRoZSB0aXRsZSBhbmQgdGhlIGNvbnRlbnQgYXJlIGZhbHN5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuXHQgKi9cblx0QElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImF1dG9cImAuXG5cdCAqXG5cdCAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0byBjaGFuZ2UgZGVmYXVsdCBQb3BwZXIgb3B0aW9ucyB3aGVuIHBvc2l0aW9uaW5nIHRoZSBwb3BvdmVyLlxuXHQgKiBSZWNlaXZlcyBjdXJyZW50IHBvcHBlciBvcHRpb25zIGFuZCByZXR1cm5zIG1vZGlmaWVkIG9uZXMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHBlck9wdGlvbnM6IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KSA9PiBQYXJ0aWFsPE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIHRvb2x0aXAuXG5cdCAqXG5cdCAqIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG5cdCAqIEZvciBtb3JlIGRldGFpbHMgc2VlIHRoZSBbdHJpZ2dlcnMgZGVtb10oIy9jb21wb25lbnRzL3BvcG92ZXIvZXhhbXBsZXMjdHJpZ2dlcnMpLlxuXHQgKi9cblx0QElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcblxuXHQvKipcblx0ICogQSBjc3Mgc2VsZWN0b3Igb3IgaHRtbCBlbGVtZW50IHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYWdhaW5zdC5cblx0ICogQnkgZGVmYXVsdCwgdGhlIGVsZW1lbnQgYG5nYlBvcG92ZXJgIGRpcmVjdGl2ZSBpcyBhcHBsaWVkIHRvIHdpbGwgYmUgc2V0IGFzIGEgdGFyZ2V0LlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3NpdGlvblRhcmdldD86IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuXHQgKlxuXHQgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBgYm9keWAuXG5cdCAqL1xuXHRASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBwb3BvdmVyIGlzIGRpc2FibGVkIGFuZCB3b24ndCBiZSBkaXNwbGF5ZWQuXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjEuMFxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHBvcG92ZXIgd2luZG93IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBzaW5jZSAyLjIuMFxuXHQgKi9cblx0QElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBvcGVuaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBcIm5vbi1tYW51YWxcIiBvcGVuaW5nIHRyaWdnZXJzIGRlZmluZWQgYnkgdGhlIGB0cmlnZ2Vyc2AgaW5wdXQuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjEuMFxuXHQgKi9cblx0QElucHV0KCkgb3BlbkRlbGF5OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBjbG9zaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBcIm5vbi1tYW51YWxcIiBvcGVuaW5nIHRyaWdnZXJzIGRlZmluZWQgYnkgdGhlIGB0cmlnZ2Vyc2AgaW5wdXQuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjEuMFxuXHQgKi9cblx0QElucHV0KCkgY2xvc2VEZWxheTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgb3BlbmluZyBhbmltYXRpb24gaGFzIGZpbmlzaGVkLiBDb250YWlucyBubyBwYXlsb2FkLlxuXHQgKi9cblx0QE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgY2xvc2luZyBhbmltYXRpb24gaGFzIGZpbmlzaGVkLiBDb250YWlucyBubyBwYXlsb2FkLlxuXHQgKlxuXHQgKiBBdCB0aGlzIHBvaW50IHBvcG92ZXIgaXMgbm90IGluIHRoZSBET00gYW55bW9yZS5cblx0ICovXG5cdEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0cHJpdmF0ZSBfbmdiUG9wb3ZlcldpbmRvd0lkID0gYG5nYi1wb3BvdmVyLSR7bmV4dElkKyt9YDtcblx0cHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz47XG5cdHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlBvcG92ZXJXaW5kb3c+IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbjtcblx0cHJpdmF0ZSBfcG9zaXRpb25pbmc6IFJldHVyblR5cGU8dHlwZW9mIG5nYlBvc2l0aW9uaW5nPjtcblx0cHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHRwcml2YXRlIF9pc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuXHRcdGlmICh0aGlzLmRpc2FibGVQb3BvdmVyKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLm5nYlBvcG92ZXIgJiYgIXRoaXMucG9wb3ZlclRpdGxlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0XHRpbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0dmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcblx0XHRjb25maWc6IE5nYlBvcG92ZXJDb25maWcsXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdFx0QEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcblx0XHRwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0YXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuXHQpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdFx0dGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuXHRcdHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblx0XHR0aGlzLnBvcHBlck9wdGlvbnMgPSBjb25maWcucG9wcGVyT3B0aW9ucztcblx0XHR0aGlzLnRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzO1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcblx0XHR0aGlzLmRpc2FibGVQb3BvdmVyID0gY29uZmlnLmRpc2FibGVQb3BvdmVyO1xuXHRcdHRoaXMucG9wb3ZlckNsYXNzID0gY29uZmlnLnBvcG92ZXJDbGFzcztcblx0XHR0aGlzLm9wZW5EZWxheSA9IGNvbmZpZy5vcGVuRGVsYXk7XG5cdFx0dGhpcy5jbG9zZURlbGF5ID0gY29uZmlnLmNsb3NlRGVsYXk7XG5cdFx0dGhpcy5fcG9zaXRpb25pbmcgPSBuZ2JQb3NpdGlvbmluZygpO1xuXHRcdHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz4oXG5cdFx0XHROZ2JQb3BvdmVyV2luZG93LFxuXHRcdFx0aW5qZWN0b3IsXG5cdFx0XHR2aWV3Q29udGFpbmVyUmVmLFxuXHRcdFx0X3JlbmRlcmVyLFxuXHRcdFx0dGhpcy5fbmdab25lLFxuXHRcdFx0YXBwbGljYXRpb25SZWYsXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVucyB0aGUgcG9wb3Zlci5cblx0ICpcblx0ICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nLlxuXHQgKiBUaGUgYGNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIHZhbHVlIHRvIGJlIGluamVjdGVkIGludG8gdGhlIHBvcG92ZXIgdGVtcGxhdGUgd2hlbiBpdCBpcyBjcmVhdGVkLlxuXHQgKi9cblx0b3Blbihjb250ZXh0PzogYW55KSB7XG5cdFx0aWYgKCF0aGlzLl93aW5kb3dSZWYgJiYgIXRoaXMuX2lzRGlzYWJsZWQoKSkge1xuXHRcdFx0Ly8gdGhpcyB0eXBlIGFzc2VydGlvbiBpcyBzYWZlIGJlY2F1c2Ugb3RoZXJ3aXNlIF9pc0Rpc2FibGVkIHdvdWxkIHJldHVybiB0cnVlXG5cdFx0XHRjb25zdCB7IHdpbmRvd1JlZiwgdHJhbnNpdGlvbiQgfSA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKFxuXHRcdFx0XHR0aGlzLm5nYlBvcG92ZXIgYXMgc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pixcblx0XHRcdFx0Y29udGV4dCxcblx0XHRcdFx0dGhpcy5hbmltYXRpb24sXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmID0gd2luZG93UmVmO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdhbmltYXRpb24nLCB0aGlzLmFuaW1hdGlvbik7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ3RpdGxlJywgdGhpcy5wb3BvdmVyVGl0bGUpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdjb250ZXh0JywgY29udGV4dCk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ3BvcG92ZXJDbGFzcycsIHRoaXMucG9wb3ZlckNsYXNzKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgnaWQnLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xuXG5cdFx0XHR0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZ2V0UG9zaXRpb25UYXJnZXRFbGVtZW50KCksICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkKTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcblx0XHRcdFx0dGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZSBuZWVkIHRvIGRldGVjdCBjaGFuZ2VzLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hlcmUgLm9wZW4oKSBtaWdodCBiZSBjYWxsZWQgZnJvbS5cblx0XHRcdC8vIEV4LiBvcGVuaW5nIHBvcG92ZXIgZnJvbSBvbmUgb2YgbGlmZWN5Y2xlIGhvb2tzIHRoYXQgcnVuIGFmdGVyIHRoZSBDRFxuXHRcdFx0Ly8gKHNheSBmcm9tIG5nQWZ0ZXJWaWV3SW5pdCkgd2lsbCByZXN1bHQgaW4gJ0V4cHJlc3Npb25IYXNDaGFuZ2VkJyBleGNlcHRpb25cblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cblx0XHRcdC8vIFdlIG5lZWQgdG8gbWFyayBmb3IgY2hlY2ssIGJlY2F1c2UgcG9wb3ZlciB3b24ndCB3b3JrIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudC5cblx0XHRcdC8vIEV4LiB3aGVuIHdlIHVzZSBleHByZXNzaW9uIGxpa2UgYHt7IHBvcG92ZXIuaXNPcGVuKCkgOiAnb3BlbmVkJyA6ICdjbG9zZWQnIH19YFxuXHRcdFx0Ly8gaW5zaWRlIHRoZSB0ZW1wbGF0ZSBvZiBhbiBPblB1c2ggY29tcG9uZW50IGFuZCB3ZSBjaGFuZ2UgdGhlIHBvcG92ZXIgZnJvbVxuXHRcdFx0Ly8gb3BlbiAtPiBjbG9zZWQsIHRoZSBleHByZXNzaW9uIGluIHF1ZXN0aW9uIHdvbid0IGJlIHVwZGF0ZWQgdW5sZXNzIHdlIGV4cGxpY2l0bHlcblx0XHRcdC8vIG1hcmsgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gYmUgY2hlY2tlZC5cblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuXHRcdFx0Ly8gU2V0dGluZyB1cCBwb3BwZXIgYW5kIHNjaGVkdWxpbmcgdXBkYXRlcyB3aGVuIHpvbmUgaXMgc3RhYmxlXG5cdFx0XHR0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5jcmVhdGVQb3BwZXIoe1xuXHRcdFx0XHRcdGhvc3RFbGVtZW50OiB0aGlzLl9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKSxcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl93aW5kb3dSZWYhLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRhcHBlbmRUb0JvZHk6IHRoaXMuY29udGFpbmVyID09PSAnYm9keScsXG5cdFx0XHRcdFx0YmFzZUNsYXNzOiAnYnMtcG9wb3ZlcicsXG5cdFx0XHRcdFx0dXBkYXRlUG9wcGVyT3B0aW9uczogKG9wdGlvbnMpID0+IHRoaXMucG9wcGVyT3B0aW9ucyhhZGRQb3BwZXJPZmZzZXQoWzAsIDhdKShvcHRpb25zKSksXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdC8vIFRoaXMgdXBkYXRlIGlzIHJlcXVpcmVkIGZvciBjb3JyZWN0IGFycm93IHBsYWNlbWVudFxuXHRcdFx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLnVwZGF0ZSgpO1xuXHRcdFx0XHRcdHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSB0aGlzLl9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3Bvc2l0aW9uaW5nLnVwZGF0ZSgpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bmdiQXV0b0Nsb3NlKHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuYXV0b0Nsb3NlLCAoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMuaGlkZGVuLCBbXG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XSk7XG5cblx0XHRcdHRyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3duLmVtaXQoKSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlcyB0aGUgcG9wb3Zlci5cblx0ICpcblx0ICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuXHQgKi9cblx0Y2xvc2UoYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb24pIHtcblx0XHRpZiAodGhpcy5fd2luZG93UmVmKSB7XG5cdFx0XHR0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZ2V0UG9zaXRpb25UYXJnZXRFbGVtZW50KCksICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG5cdFx0XHR0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoYW5pbWF0aW9uKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuX3pvbmVTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG5cdFx0XHRcdHRoaXMuaGlkZGVuLmVtaXQoKTtcblx0XHRcdFx0dGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVG9nZ2xlcyB0aGUgcG9wb3Zlci5cblx0ICpcblx0ICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuXHQgKi9cblx0dG9nZ2xlKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl93aW5kb3dSZWYpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYHRydWVgLCBpZiB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgc2hvd24uXG5cdCAqL1xuXHRpc09wZW4oKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2Vycyhcblx0XHRcdHRoaXMuX3JlbmRlcmVyLFxuXHRcdFx0dGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0dGhpcy50cmlnZ2Vycyxcblx0XHRcdHRoaXMuaXNPcGVuLmJpbmQodGhpcyksXG5cdFx0XHR0aGlzLm9wZW4uYmluZCh0aGlzKSxcblx0XHRcdHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcblx0XHRcdCt0aGlzLm9wZW5EZWxheSxcblx0XHRcdCt0aGlzLmNsb3NlRGVsYXksXG5cdFx0KTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKHsgbmdiUG9wb3ZlciwgcG9wb3ZlclRpdGxlLCBkaXNhYmxlUG9wb3ZlciwgcG9wb3ZlckNsYXNzIH06IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAocG9wb3ZlckNsYXNzICYmIHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UucG9wb3ZlckNsYXNzID0gcG9wb3ZlckNsYXNzLmN1cnJlbnRWYWx1ZTtcblx0XHR9XG5cdFx0Ly8gY2xvc2UgcG9wb3ZlciBpZiB0aXRsZSBhbmQgY29udGVudCBiZWNvbWUgZW1wdHksIG9yIGRpc2FibGVQb3BvdmVyIHNldCB0byB0cnVlXG5cdFx0aWYgKChuZ2JQb3BvdmVyIHx8IHBvcG92ZXJUaXRsZSB8fCBkaXNhYmxlUG9wb3ZlcikgJiYgdGhpcy5faXNEaXNhYmxlZCgpKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbG9zZShmYWxzZSk7XG5cdFx0Ly8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxuXHRcdC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjE5OVxuXHRcdHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbj8uKCk7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuXHRcdHJldHVybiAoXG5cdFx0XHQoaXNTdHJpbmcodGhpcy5wb3NpdGlvblRhcmdldCkgPyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucG9zaXRpb25UYXJnZXQpIDogdGhpcy5wb3NpdGlvblRhcmdldCkgfHxcblx0XHRcdHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuXHRcdCk7XG5cdH1cbn1cbiJdfQ==