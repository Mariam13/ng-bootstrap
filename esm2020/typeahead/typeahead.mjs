import { Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { PopupService } from '../util/popup';
import { ngbPositioning } from '../util/positioning';
import { isDefined, toString } from '../util/util';
import { NgbTypeaheadWindow } from './typeahead-window';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./typeahead-config";
import * as i2 from "../util/accessibility/live";
let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
export class NgbTypeahead {
    constructor(_elementRef, viewContainerRef, _renderer, injector, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._subscription = null;
        this._closed$ = new Subject();
        this._inputValueBackup = null;
        this._inputValueForSelectOnExact = null;
        this._windowRef = null;
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * @since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = 'bottom-start';
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.activeDescendant = null;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.selectOnExact = config.selectOnExact;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input').pipe(map(($event) => $event.target.value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._positioning = ngbPositioning();
    }
    ngOnInit() {
        this._subscribeToUserInput();
    }
    ngOnChanges({ ngbTypeahead }) {
        if (ngbTypeahead && !ngbTypeahead.firstChange) {
            this._unsubscribeFromUserInput();
            this._subscribeToUserInput();
        }
    }
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() {
        return this._windowRef != null;
    }
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab: {
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
            }
        }
    }
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            const { windowRef } = this._popupService.open();
            this._windowRef = windowRef;
            this._windowRef.setInput('id', this.popupId);
            this._windowRef.setInput('popupClass', this.popupClass);
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => (this.activeDescendant = activeId));
            if (this.container === 'body') {
                this._renderer.setStyle(this._windowRef.location.nativeElement, 'z-index', '1055');
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._windowRef) {
                    this._positioning.createPopper({
                        hostElement: this._elementRef.nativeElement,
                        targetElement: this._windowRef.location.nativeElement,
                        placement: this.placement,
                        appendToBody: this.container === 'body',
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                }
            });
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [
                this._elementRef.nativeElement,
                this._windowRef.location.nativeElement,
            ]);
        }
    }
    _closePopup() {
        this._popupService.close().subscribe(() => {
            this._positioning.destroy();
            this._zoneSubscription?.unsubscribe();
            this._closed$.next();
            this._windowRef = null;
            this.activeDescendant = null;
        });
    }
    _selectResult(result) {
        let defaultPrevented = false;
        this.selectItem.emit({
            item: result,
            preventDefault: () => {
                defaultPrevented = true;
            },
        });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    _showHint() {
        if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substring(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substring(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [
                    this._inputValueBackup.length,
                    formattedVal.length,
                ]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    _subscribeToUserInput() {
        const results$ = this._valueChanges.pipe(tap((value) => {
            this._inputValueBackup = this.showHint ? value : null;
            this._inputValueForSelectOnExact = this.selectOnExact ? value : null;
            this._onChange(this.editable ? value : undefined);
        }), this.ngbTypeahead ? this.ngbTypeahead : () => of([]));
        this._subscription = this._resubscribeTypeahead.pipe(switchMap(() => results$)).subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                // when there is only one result and this matches the input value
                if (this.selectOnExact &&
                    results.length === 1 &&
                    this._formatItemForInput(results[0]) === this._inputValueForSelectOnExact) {
                    this._selectResult(results[0]);
                    this._closePopup();
                }
                else {
                    this._openPopup();
                    this._windowRef.instance.focusFirst = this.focusFirst;
                    this._windowRef.instance.results = results;
                    this._windowRef.instance.term = this._elementRef.nativeElement.value;
                    if (this.resultFormatter) {
                        this._windowRef.instance.formatter = this.resultFormatter;
                    }
                    if (this.resultTemplate) {
                        this._windowRef.instance.resultTemplate = this.resultTemplate;
                    }
                    this._windowRef.instance.resetActive();
                    // The observable stream we are subscribing to might have async steps
                    // and if a component containing typeahead is using the OnPush strategy
                    // the change detection turn wouldn't be invoked automatically.
                    this._windowRef.changeDetectorRef.detectChanges();
                    this._showHint();
                }
            }
            // live announcer
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
NgbTypeahead.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbTypeahead, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i1.NgbTypeaheadConfig }, { token: i0.NgZone }, { token: i2.Live }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbTypeahead.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbTypeahead, isStandalone: true, selector: "input[ngbTypeahead]", inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", selectOnExact: "selectOnExact", showHint: "showHint", placement: "placement", popperOptions: "popperOptions", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, host: { attributes: { "autocapitalize": "off", "autocorrect": "off", "role": "combobox" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)" }, properties: { "class.open": "isPopupOpen()", "autocomplete": "autocomplete", "attr.aria-autocomplete": "showHint ? \"both\" : \"list\"", "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isPopupOpen() ? popupId : null", "attr.aria-expanded": "isPopupOpen()" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }], exportAs: ["ngbTypeahead"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbTypeahead, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    standalone: true,
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        role: 'combobox',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()',
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i1.NgbTypeaheadConfig }, { type: i0.NgZone }, { type: i2.Live }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { autocomplete: [{
                type: Input
            }], container: [{
                type: Input
            }], editable: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], inputFormatter: [{
                type: Input
            }], ngbTypeahead: [{
                type: Input
            }], resultFormatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], selectOnExact: [{
                type: Input
            }], showHint: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlOLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFFTixLQUFLLEVBS0wsTUFBTSxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQWMsRUFBRSxFQUFvQixPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUUsa0JBQWtCLEVBQXlCLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBaUIzRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7O0dBRUc7QUFvQkgsTUFBTSxPQUFPLFlBQVk7SUFrSXhCLFlBQ1MsV0FBeUMsRUFDakQsZ0JBQWtDLEVBQzFCLFNBQW9CLEVBQzVCLFFBQWtCLEVBQ2xCLE1BQTBCLEVBQzFCLE1BQWMsRUFD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QWpCLEtBQUs7Z0JBUUcsYUFBYTtzQkFBckIsS0FBSztnQkFXRyxVQUFVO3NCQUFsQixLQUFLO2dCQU9JLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBcHBsaWNhdGlvblJlZixcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudFJlZixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdGZvcndhcmRSZWYsXG5cdEluamVjdCxcblx0SW5qZWN0b3IsXG5cdElucHV0LFxuXHROZ1pvbmUsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIyLFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRUZW1wbGF0ZVJlZixcblx0Vmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgb2YsIE9wZXJhdG9yRnVuY3Rpb24sIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTGl2ZSB9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcbmltcG9ydCB7IG5nYkF1dG9DbG9zZSB9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgbmdiUG9zaXRpb25pbmcsIFBsYWNlbWVudEFycmF5IH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0IHsgaXNEZWZpbmVkLCB0b1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7IE5nYlR5cGVhaGVhZENvbmZpZyB9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ2JUeXBlYWhlYWRXaW5kb3csIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XG5pbXBvcnQgeyBhZGRQb3BwZXJPZmZzZXQgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nLXV0aWwnO1xuXG4vKipcbiAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIGFuIGl0ZW0gaXMgc2VsZWN0ZWQgZnJvbSB0aGUgcmVzdWx0IGxpc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PFQgPSBhbnk+IHtcblx0LyoqXG5cdCAqIFRoZSBpdGVtIGZyb20gdGhlIHJlc3VsdCBsaXN0IGFib3V0IHRvIGJlIHNlbGVjdGVkLlxuXHQgKi9cblx0aXRlbTogVDtcblxuXHQvKipcblx0ICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBmcm9tIGhhcHBlbmluZy5cblx0ICovXG5cdHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBwcm92aWRpbmcgYSBzaW1wbGUgd2F5IG9mIGNyZWF0aW5nIHBvd2VyZnVsIHR5cGVhaGVhZHMgZnJvbSBhbnkgdGV4dCBpbnB1dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXG5cdGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcblx0XHQnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxuXHRcdCcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcblx0XHQnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcblx0XHRhdXRvY2FwaXRhbGl6ZTogJ29mZicsXG5cdFx0YXV0b2NvcnJlY3Q6ICdvZmYnLFxuXHRcdHJvbGU6ICdjb21ib2JveCcsXG5cdFx0J1thdHRyLmFyaWEtYXV0b2NvbXBsZXRlXSc6ICdzaG93SGludCA/IFwiYm90aFwiIDogXCJsaXN0XCInLFxuXHRcdCdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ2FjdGl2ZURlc2NlbmRhbnQnLFxuXHRcdCdbYXR0ci5hcmlhLW93bnNdJzogJ2lzUG9wdXBPcGVuKCkgPyBwb3B1cElkIDogbnVsbCcsXG5cdFx0J1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzUG9wdXBPcGVuKCknLFxuXHR9LFxuXHRwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUeXBlYWhlYWQpLCBtdWx0aTogdHJ1ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXHRwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuXHRwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblx0cHJpdmF0ZSBfaW5wdXRWYWx1ZUJhY2t1cDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX2lucHV0VmFsdWVGb3JTZWxlY3RPbkV4YWN0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cdHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55Pjtcblx0cHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiVHlwZWFoZWFkV2luZG93PiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgX3Bvc2l0aW9uaW5nOiBSZXR1cm5UeXBlPHR5cGVvZiBuZ2JQb3NpdGlvbmluZz47XG5cblx0LyoqXG5cdCAqIFRoZSB2YWx1ZSBmb3IgdGhlIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZSBmb3IgdGhlIGA8aW5wdXQ+YCBlbGVtZW50LlxuXHQgKlxuXHQgKiBEZWZhdWx0cyB0byBgXCJvZmZcImAgdG8gZGlzYWJsZSB0aGUgbmF0aXZlIGJyb3dzZXIgYXV0b2NvbXBsZXRlLCBidXQgeW91IGNhbiBvdmVycmlkZSBpdCBpZiBuZWNlc3NhcnkuXG5cdCAqXG5cdCAqIEBzaW5jZSAyLjEuMFxuXHQgKi9cblx0QElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cblx0LyoqXG5cdCAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbGwgYmUgYXBwZW5kZWQgdG8uXG5cdCAqXG5cdCAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIGBcImJvZHlcImAuXG5cdCAqL1xuXHRASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBtb2RlbCB2YWx1ZXMgd2lsbCBub3QgYmUgcmVzdHJpY3RlZCBvbmx5IHRvIGl0ZW1zIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwLlxuXHQgKi9cblx0QElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHJlc3VsdCBsaXN0IHdpbGwgYWx3YXlzIHN0YXkgZm9jdXNlZCB3aGlsZSB0eXBpbmcuXG5cdCAqL1xuXHRASW5wdXQoKSBmb2N1c0ZpcnN0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBhbiBpdGVtIGZyb20gdGhlIHJlc3VsdCBsaXN0IHRvIGEgYHN0cmluZ2AgdG8gZGlzcGxheSBpbiB0aGUgYDxpbnB1dD5gIGZpZWxkLlxuXHQgKlxuXHQgKiBJdCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIHNvbWV0aGluZyBpbiB0aGUgcG9wdXAgb3IgdGhlIG1vZGVsIHZhbHVlIGNoYW5nZXMsIHNvIHRoZSBpbnB1dCBuZWVkcyB0b1xuXHQgKiBiZSB1cGRhdGVkLlxuXHQgKi9cblx0QElucHV0KCkgaW5wdXRGb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYSBzdHJlYW0gb2YgdGV4dCB2YWx1ZXMgZnJvbSB0aGUgYDxpbnB1dD5gIGVsZW1lbnQgdG8gdGhlIHN0cmVhbSBvZiB0aGUgYXJyYXkgb2YgaXRlbXNcblx0ICogdG8gZGlzcGxheSBpbiB0aGUgdHlwZWFoZWFkIHBvcHVwLlxuXHQgKlxuXHQgKiBJZiB0aGUgcmVzdWx0aW5nIG9ic2VydmFibGUgZW1pdHMgYSBub24tZW1wdHkgYXJyYXkgLSB0aGUgcG9wdXAgd2lsbCBiZSBzaG93bi4gSWYgaXQgZW1pdHMgYW4gZW1wdHkgYXJyYXkgLSB0aGVcblx0ICogcG9wdXAgd2lsbCBiZSBjbG9zZWQuXG5cdCAqXG5cdCAqIFNlZSB0aGUgW2Jhc2ljIGV4YW1wbGVdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvZXhhbXBsZXMjYmFzaWMpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqXG5cdCAqIE5vdGUgdGhhdCB0aGUgYHRoaXNgIGFyZ3VtZW50IGlzIGB1bmRlZmluZWRgIHNvIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHkgYmluZCBpdCB0byBhIGRlc2lyZWQgXCJ0aGlzXCIgdGFyZ2V0LlxuXHQgKi9cblx0QElucHV0KCkgbmdiVHlwZWFoZWFkOiBPcGVyYXRvckZ1bmN0aW9uPHN0cmluZywgcmVhZG9ubHkgYW55W10+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYW4gaXRlbSBmcm9tIHRoZSByZXN1bHQgbGlzdCB0byBhIGBzdHJpbmdgIHRvIGRpc3BsYXkgaW4gdGhlIHBvcHVwLlxuXHQgKlxuXHQgKiBNdXN0IGJlIHByb3ZpZGVkLCBpZiB5b3VyIGBuZ2JUeXBlYWhlYWRgIHJldHVybnMgc29tZXRoaW5nIG90aGVyIHRoYW4gYE9ic2VydmFibGU8c3RyaW5nW10+YC5cblx0ICpcblx0ICogQWx0ZXJuYXRpdmVseSBmb3IgbW9yZSBjb21wbGV4IG1hcmt1cCBpbiB0aGUgcG9wdXAgeW91IHNob3VsZCB1c2UgYHJlc3VsdFRlbXBsYXRlYC5cblx0ICovXG5cdEBJbnB1dCgpIHJlc3VsdEZvcm1hdHRlcjogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSByZXN1bHRpbmcgaXRlbXMgYXJlIGRpc3BsYXllZCBpbiB0aGUgcG9wdXAuXG5cdCAqXG5cdCAqIFNlZSB0aGUgW1Jlc3VsdFRlbXBsYXRlQ29udGV4dF0oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9hcGkjUmVzdWx0VGVtcGxhdGVDb250ZXh0KSBmb3IgdGhlIHRlbXBsYXRlIGNvbnRleHQuXG5cdCAqXG5cdCAqIEFsc28gc2VlIHRoZSBbdGVtcGxhdGUgZm9yIHJlc3VsdHMgZGVtb10oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9leGFtcGxlcyN0ZW1wbGF0ZSkgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIGF1dG9tYXRpY2FsbHkgc2VsZWN0cyB0aGUgaXRlbSB3aGVuIGl0IGlzIHRoZSBvbmx5IG9uZSB0aGF0IGV4YWN0bHkgbWF0Y2hlcyB0aGUgdXNlciBpbnB1dFxuXHQgKlxuXHQgKiBAc2luY2UgMTQuMi4wXG5cdCAqL1xuXHRASW5wdXQoKSBzZWxlY3RPbkV4YWN0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHdpbGwgc2hvdyB0aGUgaGludCBpbiB0aGUgYDxpbnB1dD5gIHdoZW4gYW4gaXRlbSBpbiB0aGUgcmVzdWx0IGxpc3QgbWF0Y2hlcy5cblx0ICovXG5cdEBJbnB1dCgpIHNob3dIaW50OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgdHlwZWFoZWFkLCBhbW9uZyB0aGUgW3Bvc3NpYmxlIHZhbHVlc10oIy9ndWlkZXMvcG9zaXRpb25pbmcjYXBpKS5cblx0ICpcblx0ICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tc3RhcnQgYm90dG9tLWVuZCB0b3Atc3RhcnQgdG9wLWVuZFwiYFxuXHQgKlxuXHQgKiBQbGVhc2Ugc2VlIHRoZSBbcG9zaXRpb25pbmcgb3ZlcnZpZXddKCMvcG9zaXRpb25pbmcpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqL1xuXHRASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1zdGFydCc7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0byBjaGFuZ2UgZGVmYXVsdCBQb3BwZXIgb3B0aW9ucyB3aGVuIHBvc2l0aW9uaW5nIHRoZSB0eXBlYWhlYWQuXG5cdCAqIFJlY2VpdmVzIGN1cnJlbnQgcG9wcGVyIG9wdGlvbnMgYW5kIHJldHVybnMgbW9kaWZpZWQgb25lcy5cblx0ICpcblx0ICogQHNpbmNlIDEzLjEuMFxuXHQgKi9cblx0QElucHV0KCkgcG9wcGVyT3B0aW9uczogKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4pID0+IFBhcnRpYWw8T3B0aW9ucz47XG5cblx0LyoqXG5cdCAqIEEgY3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuXHQgKlxuXHQgKiBBY2NlcHRzIGEgc3RyaW5nIGNvbnRhaW5pbmcgQ1NTIGNsYXNzIHRvIGJlIGFwcGxpZWQgb24gdGhlIGBuZ2ItdHlwZWFoZWFkLXdpbmRvd2AuXG5cdCAqXG5cdCAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBpbnN0YW5jZS1zcGVjaWZpYyBzdHlsaW5nLCBleC4geW91IGNhbiBvdmVycmlkZSBwb3B1cCB3aW5kb3cgYHotaW5kZXhgXG5cdCAqXG5cdCAqIEBzaW5jZSA5LjEuMFxuXHQgKi9cblx0QElucHV0KCkgcG9wdXBDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSBhbiBpdGVtIGlzIHNlbGVjdGVkIGZyb20gdGhlIHJlc3VsdCBsaXN0LlxuXHQgKlxuXHQgKiBFdmVudCBwYXlsb2FkIGlzIG9mIHR5cGUgW2BOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnRgXSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2FwaSNOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQpLlxuXHQgKi9cblx0QE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcblxuXHRhY3RpdmVEZXNjZW5kYW50OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblx0cG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcblxuXHRwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblx0cHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuXHRcdHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0XHRpbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0Y29uZmlnOiBOZ2JUeXBlYWhlYWRDb25maWcsXG5cdFx0bmdab25lOiBOZ1pvbmUsXG5cdFx0cHJpdmF0ZSBfbGl2ZTogTGl2ZSxcblx0XHRASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHRcdHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG5cdCkge1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcblx0XHR0aGlzLmVkaXRhYmxlID0gY29uZmlnLmVkaXRhYmxlO1xuXHRcdHRoaXMuZm9jdXNGaXJzdCA9IGNvbmZpZy5mb2N1c0ZpcnN0O1xuXHRcdHRoaXMuc2VsZWN0T25FeGFjdCA9IGNvbmZpZy5zZWxlY3RPbkV4YWN0O1xuXHRcdHRoaXMuc2hvd0hpbnQgPSBjb25maWcuc2hvd0hpbnQ7XG5cdFx0dGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xuXHRcdHRoaXMucG9wcGVyT3B0aW9ucyA9IGNvbmZpZy5wb3BwZXJPcHRpb25zO1xuXG5cdFx0dGhpcy5fdmFsdWVDaGFuZ2VzID0gZnJvbUV2ZW50PEV2ZW50PihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKS5waXBlKFxuXHRcdFx0bWFwKCgkZXZlbnQpID0+ICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSxcblx0XHQpO1xuXG5cdFx0dGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG5cdFx0dGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxuXHRcdFx0TmdiVHlwZWFoZWFkV2luZG93LFxuXHRcdFx0aW5qZWN0b3IsXG5cdFx0XHR2aWV3Q29udGFpbmVyUmVmLFxuXHRcdFx0X3JlbmRlcmVyLFxuXHRcdFx0dGhpcy5fbmdab25lLFxuXHRcdFx0YXBwbGljYXRpb25SZWYsXG5cdFx0KTtcblx0XHR0aGlzLl9wb3NpdGlvbmluZyA9IG5nYlBvc2l0aW9uaW5nKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLl9zdWJzY3JpYmVUb1VzZXJJbnB1dCgpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoeyBuZ2JUeXBlYWhlYWQgfTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXHRcdGlmIChuZ2JUeXBlYWhlYWQgJiYgIW5nYlR5cGVhaGVhZC5maXJzdENoYW5nZSkge1xuXHRcdFx0dGhpcy5fdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCk7XG5cdFx0XHR0aGlzLl9zdWJzY3JpYmVUb1VzZXJJbnB1dCgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCk6IHZvaWQge1xuXHRcdHRoaXMuX2Nsb3NlUG9wdXAoKTtcblx0XHR0aGlzLl91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLl9vbkNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0d3JpdGVWYWx1ZSh2YWx1ZSkge1xuXHRcdHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodmFsdWUpKTtcblx0XHRpZiAodGhpcy5zaG93SGludCkge1xuXHRcdFx0dGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuXHRcdHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzbWlzc2VzIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3dcblx0ICovXG5cdGRpc21pc3NQb3B1cCgpIHtcblx0XHRpZiAodGhpcy5pc1BvcHVwT3BlbigpKSB7XG5cdFx0XHR0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuXHRcdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHRcdFx0aWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCAhPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSB0eXBlYWhlYWQgcG9wdXAgd2luZG93IGlzIGRpc3BsYXllZFxuXHQgKi9cblx0aXNQb3B1cE9wZW4oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsO1xuXHR9XG5cblx0aGFuZGxlQmx1cigpIHtcblx0XHR0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuXHRcdHRoaXMuX29uVG91Y2hlZCgpO1xuXHR9XG5cblx0aGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXHRcdGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0c3dpdGNoIChldmVudC53aGljaCkge1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dEb3duOlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLm5leHQoKTtcblx0XHRcdFx0dGhpcy5fc2hvd0hpbnQoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5BcnJvd1VwOlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLnByZXYoKTtcblx0XHRcdFx0dGhpcy5fc2hvd0hpbnQoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5FbnRlcjpcblx0XHRcdGNhc2UgS2V5LlRhYjoge1xuXHRcdFx0XHRjb25zdCByZXN1bHQgPSB0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLmdldEFjdGl2ZSgpO1xuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKHJlc3VsdCkpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2Nsb3NlUG9wdXAoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfb3BlblBvcHVwKCkge1xuXHRcdGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG5cdFx0XHR0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuXHRcdFx0Y29uc3QgeyB3aW5kb3dSZWYgfSA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYgPSB3aW5kb3dSZWY7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ2lkJywgdGhpcy5wb3B1cElkKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgncG9wdXBDbGFzcycsIHRoaXMucG9wdXBDbGFzcyk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+ICh0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBhY3RpdmVJZCkpO1xuXG5cdFx0XHRpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAnMTA1NScpO1xuXHRcdFx0XHR0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG5cdFx0XHQvLyBTZXR0aW5nIHVwIHBvcHBlciBhbmQgc2NoZWR1bGluZyB1cGRhdGVzIHdoZW4gem9uZSBpcyBzdGFibGVcblx0XHRcdHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl93aW5kb3dSZWYpIHtcblx0XHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5jcmVhdGVQb3BwZXIoe1xuXHRcdFx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnQ6IHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRcdGFwcGVuZFRvQm9keTogdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyxcblx0XHRcdFx0XHRcdHVwZGF0ZVBvcHBlck9wdGlvbnM6IChvcHRpb25zKSA9PiB0aGlzLnBvcHBlck9wdGlvbnMoYWRkUG9wcGVyT2Zmc2V0KFswLCAyXSkob3B0aW9ucykpLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0bmdiQXV0b0Nsb3NlKHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsICdvdXRzaWRlJywgKCkgPT4gdGhpcy5kaXNtaXNzUG9wdXAoKSwgdGhpcy5fY2xvc2VkJCwgW1xuXHRcdFx0XHR0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfY2xvc2VQb3B1cCgpIHtcblx0XHR0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmID0gbnVsbDtcblx0XHRcdHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IG51bGw7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcblx0XHRsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXHRcdHRoaXMuc2VsZWN0SXRlbS5lbWl0KHtcblx0XHRcdGl0ZW06IHJlc3VsdCxcblx0XHRcdHByZXZlbnREZWZhdWx0OiAoKSA9PiB7XG5cdFx0XHRcdGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0XHR0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuXG5cdFx0aWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHR0aGlzLndyaXRlVmFsdWUocmVzdWx0KTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlKHJlc3VsdCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQ6IGFueSkge1xuXHRcdHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHQpO1xuXHRcdHRoaXMuX2Nsb3NlUG9wdXAoKTtcblx0fVxuXG5cdHByaXZhdGUgX3Nob3dIaW50KCkge1xuXHRcdGlmICh0aGlzLnNob3dIaW50ICYmIHRoaXMuX3dpbmRvd1JlZj8uaW5zdGFuY2UuaGFzQWN0aXZlKCkgJiYgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCAhPSBudWxsKSB7XG5cdFx0XHRjb25zdCB1c2VySW5wdXRMb3dlckNhc2UgPSB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjb25zdCBmb3JtYXR0ZWRWYWwgPSB0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcblxuXHRcdFx0aWYgKHVzZXJJbnB1dExvd2VyQ2FzZSA9PT0gZm9ybWF0dGVkVmFsLnN1YnN0cmluZygwLCB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHR0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCArIGZvcm1hdHRlZFZhbC5zdWJzdHJpbmcodGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpKTtcblx0XHRcdFx0dGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50WydzZXRTZWxlY3Rpb25SYW5nZSddLmFwcGx5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW1xuXHRcdFx0XHRcdHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLFxuXHRcdFx0XHRcdGZvcm1hdHRlZFZhbC5sZW5ndGgsXG5cdFx0XHRcdF0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fd3JpdGVJbnB1dFZhbHVlKGZvcm1hdHRlZFZhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZm9ybWF0SXRlbUZvcklucHV0KGl0ZW06IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGl0ZW0gIT0gbnVsbCAmJiB0aGlzLmlucHV0Rm9ybWF0dGVyID8gdGhpcy5pbnB1dEZvcm1hdHRlcihpdGVtKSA6IHRvU3RyaW5nKGl0ZW0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfd3JpdGVJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblx0XHR0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRvU3RyaW5nKHZhbHVlKSk7XG5cdH1cblxuXHRwcml2YXRlIF9zdWJzY3JpYmVUb1VzZXJJbnB1dCgpOiB2b2lkIHtcblx0XHRjb25zdCByZXN1bHRzJCA9IHRoaXMuX3ZhbHVlQ2hhbmdlcy5waXBlKFxuXHRcdFx0dGFwKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5zaG93SGludCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdFx0dGhpcy5faW5wdXRWYWx1ZUZvclNlbGVjdE9uRXhhY3QgPSB0aGlzLnNlbGVjdE9uRXhhY3QgPyB2YWx1ZSA6IG51bGw7XG5cdFx0XHRcdHRoaXMuX29uQ2hhbmdlKHRoaXMuZWRpdGFibGUgPyB2YWx1ZSA6IHVuZGVmaW5lZCk7XG5cdFx0XHR9KSxcblx0XHRcdHRoaXMubmdiVHlwZWFoZWFkID8gdGhpcy5uZ2JUeXBlYWhlYWQgOiAoKSA9PiBvZihbXSksXG5cdFx0KTtcblxuXHRcdHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHJlc3VsdHMkKSkuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG5cdFx0XHRpZiAoIXJlc3VsdHMgfHwgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSByZXN1bHQgYW5kIHRoaXMgbWF0Y2hlcyB0aGUgaW5wdXQgdmFsdWVcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0T25FeGFjdCAmJlxuXHRcdFx0XHRcdHJlc3VsdHMubGVuZ3RoID09PSAxICYmXG5cdFx0XHRcdFx0dGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHJlc3VsdHNbMF0pID09PSB0aGlzLl9pbnB1dFZhbHVlRm9yU2VsZWN0T25FeGFjdFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0c1swXSk7XG5cdFx0XHRcdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX29wZW5Qb3B1cCgpO1xuXHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UuZm9jdXNGaXJzdCA9IHRoaXMuZm9jdXNGaXJzdDtcblx0XHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLnJlc3VsdHMgPSByZXN1bHRzO1xuXHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UudGVybSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcblx0XHRcdFx0XHRpZiAodGhpcy5yZXN1bHRGb3JtYXR0ZXIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UuZm9ybWF0dGVyID0gdGhpcy5yZXN1bHRGb3JtYXR0ZXI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLnJlc3VsdFRlbXBsYXRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLnJlc3VsdFRlbXBsYXRlID0gdGhpcy5yZXN1bHRUZW1wbGF0ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fd2luZG93UmVmIS5pbnN0YW5jZS5yZXNldEFjdGl2ZSgpO1xuXG5cdFx0XHRcdFx0Ly8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXG5cdFx0XHRcdFx0Ly8gYW5kIGlmIGEgY29tcG9uZW50IGNvbnRhaW5pbmcgdHlwZWFoZWFkIGlzIHVzaW5nIHRoZSBPblB1c2ggc3RyYXRlZ3lcblx0XHRcdFx0XHQvLyB0aGUgY2hhbmdlIGRldGVjdGlvbiB0dXJuIHdvdWxkbid0IGJlIGludm9rZWQgYXV0b21hdGljYWxseS5cblx0XHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuXHRcdFx0XHRcdHRoaXMuX3Nob3dIaW50KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGl2ZSBhbm5vdW5jZXJcblx0XHRcdGNvbnN0IGNvdW50ID0gcmVzdWx0cyA/IHJlc3VsdHMubGVuZ3RoIDogMDtcblx0XHRcdHRoaXMuX2xpdmUuc2F5KGNvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgYXZhaWxhYmxlJyA6IGAke2NvdW50fSByZXN1bHQke2NvdW50ID09PSAxID8gJycgOiAncyd9IGF2YWlsYWJsZWApO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCkge1xuXHRcdGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcblx0XHRcdHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0XHR0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xuXHR9XG59XG4iXX0=