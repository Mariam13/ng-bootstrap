import { ContentChild, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ngbPositioning } from '../util/positioning';
import { addPopperOffset } from '../util/positioning-util';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { FOCUSABLE_ELEMENTS_SELECTOR } from '../util/focus-trap';
import * as i0 from "@angular/core";
import * as i1 from "./dropdown-config";
/**
 * @deprecated 14.2.0 this directive isn't useful anymore. You can remove it from your imports
 */
export class NgbNavbar {
}
NgbNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbNavbar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NgbNavbar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbNavbar, isStandalone: true, selector: ".navbar", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbNavbar, decorators: [{
            type: Directive,
            args: [{ selector: '.navbar', standalone: true }]
        }] });
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
export class NgbDropdownItem {
    constructor(elementRef, _renderer) {
        this.elementRef = elementRef;
        this._renderer = _renderer;
        this._disabled = false;
    }
    set disabled(value) {
        this._disabled = value === '' || value === true; // accept an empty attribute as true
        // note: we don't use a host binding for disabled because when used on links, it fails because links don't have a
        // disabled property
        // setting the property using the renderer, OTOH, works fine in both cases.
        this._renderer.setProperty(this.elementRef.nativeElement, 'disabled', this._disabled);
    }
    get disabled() {
        return this._disabled;
    }
}
NgbDropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownItem, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDropdownItem, isStandalone: true, selector: "[ngbDropdownItem]", inputs: { disabled: "disabled" }, host: { properties: { "class.disabled": "disabled", "tabIndex": "disabled ? -1 : 0" }, classAttribute: "dropdown-item" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownItem]',
                    standalone: true,
                    host: { class: 'dropdown-item', '[class.disabled]': 'disabled', '[tabIndex]': 'disabled ? -1 : 0' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { disabled: [{
                type: Input
            }] } });
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
export class NgbDropdownMenu {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
        this.nativeElement = _elementRef.nativeElement;
    }
}
NgbDropdownMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownMenu, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownMenu.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDropdownMenu, isStandalone: true, selector: "[ngbDropdownMenu]", host: { listeners: { "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Enter": "dropdown.onKeyDown($event)", "keydown.Space": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "class.dropdown-menu": "true", "class.show": "dropdown.isOpen()" } }, queries: [{ propertyName: "menuItems", predicate: NgbDropdownItem }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownMenu]',
                    standalone: true,
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[class.show]': 'dropdown.isOpen()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                        '(keydown.Space)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { menuItems: [{
                type: ContentChildren,
                args: [NgbDropdownItem]
            }] } });
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
export class NgbDropdownAnchor {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.nativeElement = _elementRef.nativeElement;
    }
}
NgbDropdownAnchor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownAnchor, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownAnchor.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDropdownAnchor, isStandalone: true, selector: "[ngbDropdownAnchor]", host: { properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownAnchor, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownAnchor]',
                    standalone: true,
                    host: { class: 'dropdown-toggle', '[attr.aria-expanded]': 'dropdown.isOpen()' },
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
export class NgbDropdownToggle extends NgbDropdownAnchor {
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
}
NgbDropdownToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownToggle, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdownToggle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDropdownToggle, isStandalone: true, selector: "[ngbDropdownToggle]", host: { listeners: { "click": "dropdown.toggle()", "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownToggle]',
                    standalone: true,
                    host: {
                        class: 'dropdown-toggle',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }],
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
export class NgbDropdown {
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._destroyCloseHandlers$ = new Subject();
        this._bodyContainer = null;
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this._positioning = ngbPositioning();
        this.display = this._elementRef.nativeElement.closest('.navbar') ? 'static' : 'dynamic';
    }
    ngAfterContentInit() {
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this._applyPlacementClasses();
            if (this._open) {
                this._setCloseHandlers();
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.firstChange) {
            this._positioning.setOptions({
                hostElement: this._anchor.nativeElement,
                targetElement: this._bodyContainer || this._menu.nativeElement,
                placement: this.placement,
                appendToBody: this.container === 'body',
            });
            this._applyPlacementClasses();
        }
        if (changes.dropdownClass) {
            const { currentValue, previousValue } = changes.dropdownClass;
            this._applyCustomDropdownClass(currentValue, previousValue);
        }
        if (changes.autoClose && this._open) {
            this.autoClose = changes.autoClose.currentValue;
            this._setCloseHandlers();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen() {
        return this._open;
    }
    /**
     * Opens the dropdown menu.
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
                if (this.display === 'dynamic') {
                    this._ngZone.runOutsideAngular(() => {
                        this._positioning.createPopper({
                            hostElement: this._anchor.nativeElement,
                            targetElement: this._bodyContainer || this._menu.nativeElement,
                            placement: this.placement,
                            appendToBody: this.container === 'body',
                            updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                        });
                        this._applyPlacementClasses();
                        this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positionMenu());
                    });
                }
            }
        }
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next(); // destroy any existing close handlers
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (source) => {
            this.close();
            if (source === 0 /* SOURCE.ESCAPE */) {
                this._anchor.nativeElement.focus();
            }
        }, this._destroyCloseHandlers$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._positioning.destroy();
            this._zoneSubscription?.unsubscribe();
            this._destroyCloseHandlers$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    onKeyDown(event) {
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const itemElements = this._getMenuElements();
        let position = -1;
        let itemElement = null;
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((item, index) => {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === this._document.activeElement) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click')
                    .pipe(take(1))
                    .subscribe(() => this.close());
            }
            return;
        }
        if (key === Key.Tab) {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
               User expects the next focusable element in the dropdown menu to get focus.
               But the menu is not a sibling to anchor/toggle, it is at the end of the body.
               Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
               so that browser will focus the proper element (first one focusable in the menu) */
                        this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    const focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout')
                        .pipe(take(1))
                        .subscribe(({ relatedTarget }) => {
                        if (!this._elementRef.nativeElement.contains(relatedTarget)) {
                            this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case Key.ArrowDown:
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case Key.ArrowUp:
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    _isDropup() {
        return this._elementRef.nativeElement.classList.contains('dropup');
    }
    _isEventFromToggle(event) {
        return this._anchor.nativeElement.contains(event.target);
    }
    _getMenuElements() {
        const menu = this._menu;
        if (menu == null) {
            return [];
        }
        return menu.menuItems.filter((item) => !item.disabled).map((item) => item.elementRef.nativeElement);
    }
    _positionMenu() {
        const menu = this._menu;
        if (this.isOpen() && menu) {
            if (this.display === 'dynamic') {
                this._positioning.update();
                this._applyPlacementClasses();
            }
            else {
                this._applyPlacementClasses(this._getFirstPlacement(this.placement));
            }
        }
    }
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    }
    _resetContainer() {
        const renderer = this._renderer;
        if (this._menu) {
            const dropdownElement = this._elementRef.nativeElement;
            const dropdownMenuElement = this._menu.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            const renderer = this._renderer;
            const dropdownMenuElement = this._menu.nativeElement;
            const bodyContainer = (this._bodyContainer = this._bodyContainer || renderer.createElement('div'));
            // Override some styles to have the positioning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1055');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
        this._applyCustomDropdownClass(this.dropdownClass);
    }
    _applyCustomDropdownClass(newClass, oldClass) {
        const targetElement = this.container === 'body' ? this._bodyContainer : this._elementRef.nativeElement;
        if (targetElement) {
            if (oldClass) {
                this._renderer.removeClass(targetElement, oldClass);
            }
            if (newClass) {
                this._renderer.addClass(targetElement, newClass);
            }
        }
    }
    _applyPlacementClasses(placement) {
        const menu = this._menu;
        if (menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            const renderer = this._renderer;
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            const { nativeElement } = menu;
            if (this.display === 'static') {
                menu.placement = null;
                renderer.setAttribute(nativeElement, 'data-bs-popper', 'static');
            }
            else {
                menu.placement = placement;
                renderer.removeAttribute(nativeElement, 'data-bs-popper');
            }
            /*
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
}
NgbDropdown.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdown, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NgbDropdownConfig }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NgbDropdown.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbDropdown, isStandalone: true, selector: "[ngbDropdown]", inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: ["open", "_open"], placement: "placement", popperOptions: "popperOptions", container: "container", display: "display" }, outputs: { openChange: "openChange" }, host: { properties: { "class.show": "isOpen()" } }, queries: [{ propertyName: "_menu", first: true, predicate: NgbDropdownMenu, descendants: true }, { propertyName: "_anchor", first: true, predicate: NgbDropdownAnchor, descendants: true }], exportAs: ["ngbDropdown"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdown, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdown]',
                    exportAs: 'ngbDropdown',
                    standalone: true,
                    host: { '[class.show]': 'isOpen()' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NgbDropdownConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { _menu: [{
                type: ContentChild,
                args: [NgbDropdownMenu, { static: false }]
            }], _anchor: [{
                type: ContentChild,
                args: [NgbDropdownAnchor, { static: false }]
            }], autoClose: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], _open: [{
                type: Input,
                args: ['open']
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], container: [{
                type: Input
            }], display: [{
                type: Input
            }], openChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLGNBQWMsRUFBNkIsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUVqRTs7R0FFRztBQUVILE1BQU0sT0FBTyxTQUFTOzt1R0FBVCxTQUFTOzJGQUFULFNBQVM7NEZBQVQsU0FBUztrQkFEckIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7QUFHcEQ7Ozs7O0dBS0c7QUFNSCxNQUFNLE9BQU8sZUFBZTtJQWtCM0IsWUFBbUIsVUFBbUMsRUFBVSxTQUFvQjtRQUFqRSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFmNUUsY0FBUyxHQUFHLEtBQUssQ0FBQztJQWU2RCxDQUFDO0lBYnhGLElBQ0ksUUFBUSxDQUFDLEtBQWM7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LGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUVsRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzFDLElBQUksYUFBYSxFQUFFO2dCQUNsQixRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Q7SUFDRixDQUFDOzt5R0FoYlcsV0FBVyxvRkFxRmQsUUFBUTs2RkFyRkwsV0FBVyx5WUFRVCxlQUFlLDBFQUNmLGlCQUFpQjs0RkFUbkIsV0FBVztrQkFOdkIsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFO2lCQUNwQzs7MEJBc0ZFLE1BQU07MkJBQUMsUUFBUTtrSEE3RXlDLEtBQUs7c0JBQTlELFlBQVk7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDWSxPQUFPO3NCQUFsRSxZQUFZO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFVekMsU0FBUztzQkFBakIsS0FBSztnQkFZRyxhQUFhO3NCQUFyQixLQUFLO2dCQUtTLEtBQUs7c0JBQW5CLEtBQUs7dUJBQUMsTUFBTTtnQkFTSixTQUFTO3NCQUFqQixLQUFLO2dCQVFHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBUUcsU0FBUztzQkFBakIsS0FBSztnQkFVRyxPQUFPO3NCQUFmLEtBQUs7Z0JBU0ksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyQ29udGVudEluaXQsXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRDb250ZW50Q2hpbGQsXG5cdENvbnRlbnRDaGlsZHJlbixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdGZvcndhcmRSZWYsXG5cdEluamVjdCxcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25DaGFuZ2VzLFxuXHRPbkRlc3Ryb3ksXG5cdE91dHB1dCxcblx0UXVlcnlMaXN0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG5nYlBvc2l0aW9uaW5nLCBQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5IH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0IHsgYWRkUG9wcGVyT2Zmc2V0IH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZy11dGlsJztcbmltcG9ydCB7IG5nYkF1dG9DbG9zZSwgU09VUkNFIH0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vdXRpbC9rZXknO1xuXG5pbXBvcnQgeyBOZ2JEcm9wZG93bkNvbmZpZyB9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcbmltcG9ydCB7IEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUiB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgMTQuMi4wIHRoaXMgZGlyZWN0aXZlIGlzbid0IHVzZWZ1bCBhbnltb3JlLiBZb3UgY2FuIHJlbW92ZSBpdCBmcm9tIHlvdXIgaW1wb3J0c1xuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICcubmF2YmFyJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdmJhciB7fVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHlvdSBzaG91bGQgcHV0IG9uIGEgZHJvcGRvd24gaXRlbSB0byBlbmFibGUga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqIEFycm93IGtleXMgd2lsbCBtb3ZlIGZvY3VzIGJldHdlZW4gaXRlbXMgbWFya2VkIHdpdGggdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkl0ZW1dJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDogeyBjbGFzczogJ2Ryb3Bkb3duLWl0ZW0nLCAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsICdbdGFiSW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkl0ZW0ge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCAnJztcblxuXHRwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG5cdEBJbnB1dCgpXG5cdHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX2Rpc2FibGVkID0gPGFueT52YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IHRydWU7IC8vIGFjY2VwdCBhbiBlbXB0eSBhdHRyaWJ1dGUgYXMgdHJ1ZVxuXHRcdC8vIG5vdGU6IHdlIGRvbid0IHVzZSBhIGhvc3QgYmluZGluZyBmb3IgZGlzYWJsZWQgYmVjYXVzZSB3aGVuIHVzZWQgb24gbGlua3MsIGl0IGZhaWxzIGJlY2F1c2UgbGlua3MgZG9uJ3QgaGF2ZSBhXG5cdFx0Ly8gZGlzYWJsZWQgcHJvcGVydHlcblx0XHQvLyBzZXR0aW5nIHRoZSBwcm9wZXJ0eSB1c2luZyB0aGUgcmVuZGVyZXIsIE9UT0gsIHdvcmtzIGZpbmUgaW4gYm90aCBjYXNlcy5cblx0XHR0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5fZGlzYWJsZWQpO1xuXHR9XG5cblx0Z2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9kaXNhYmxlZDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGRyb3Bkb3duIG1lbnUgY29udGVudCBhbmQgZHJvcGRvd24gaXRlbXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG5cdFx0JyhrZXlkb3duLkFycm93VXApJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uQXJyb3dEb3duKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkhvbWUpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uRW5kKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkVudGVyKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLlNwYWNlKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLlRhYiknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5TaGlmdC5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcblx0bmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cdHBsYWNlbWVudDogUGxhY2VtZW50IHwgbnVsbCA9ICdib3R0b20nO1xuXHRpc09wZW4gPSBmYWxzZTtcblxuXHRAQ29udGVudENoaWxkcmVuKE5nYkRyb3Bkb3duSXRlbSkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TmdiRHJvcGRvd25JdGVtPjtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd246IE5nYkRyb3Bkb3duLFxuXHRcdF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pixcblx0KSB7XG5cdFx0dGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hcmsgYW4gZWxlbWVudCB0byB3aGljaCBkcm9wZG93biBtZW51IHdpbGwgYmUgYW5jaG9yZWQuXG4gKlxuICogVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIHRoZSBgTmdiRHJvcGRvd25Ub2dnbGVgIGRpcmVjdGl2ZS5cbiAqIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUsIGJ1dCBkb2Vzbid0IGxpc3RlbiB0byBjbGljayBldmVudHMgdG8gdG9nZ2xlIGRyb3Bkb3duIG1lbnUgdGh1cyBlbmFibGluZyBzdXBwb3J0XG4gKiBmb3IgZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXG4gKlxuICogQHNpbmNlIDEuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7IGNsYXNzOiAnZHJvcGRvd24tdG9nZ2xlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XG5cdG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd246IE5nYkRyb3Bkb3duLFxuXHRcdF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pixcblx0KSB7XG5cdFx0dGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hcmsgYW4gZWxlbWVudCB0aGF0IHdpbGwgdG9nZ2xlIGRyb3Bkb3duIHZpYSB0aGUgYGNsaWNrYCBldmVudC5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIGBOZ2JEcm9wZG93bkFuY2hvcmAgYXMgYW4gYWx0ZXJuYXRpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0Y2xhc3M6ICdkcm9wZG93bi10b2dnbGUnLFxuXHRcdCdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG5cdFx0JyhjbGljayknOiAnZHJvcGRvd24udG9nZ2xlKCknLFxuXHRcdCcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uU2hpZnQuVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdH0sXG5cdHByb3ZpZGVyczogW3sgcHJvdmlkZTogTmdiRHJvcGRvd25BbmNob3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duVG9nZ2xlKSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XG5cdGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duOiBOZ2JEcm9wZG93biwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0XHRzdXBlcihkcm9wZG93biwgZWxlbWVudFJlZik7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGNvbnRleHR1YWwgb3ZlcmxheXMgZm9yIGRpc3BsYXlpbmcgbGlzdHMgb2YgbGlua3MgYW5kIG1vcmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLFxuXHRleHBvcnRBczogJ25nYkRyb3Bkb3duJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDogeyAnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc3BsYXk6IHN0cmluZztcblx0cHJpdmF0ZSBfZGVzdHJveUNsb3NlSGFuZGxlcnMkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblx0cHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHRwcml2YXRlIF9ib2R5Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF9wb3NpdGlvbmluZzogUmV0dXJuVHlwZTx0eXBlb2YgbmdiUG9zaXRpb25pbmc+O1xuXG5cdEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBfbWVudTogTmdiRHJvcGRvd25NZW51O1xuXHRAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duQW5jaG9yLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBjbGlja2luZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgb3IgcHJlc3NpbmcgRVNDLlxuXHQgKlxuXHQgKiAqIGB0cnVlYCAtIHRoZSBkcm9wZG93biB3aWxsIGNsb3NlIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIChtZW51KSBjbGlja3MuXG5cdCAqICogYGZhbHNlYCAtIHRoZSBkcm9wZG93biBjYW4gb25seSBiZSBjbG9zZWQgbWFudWFsbHkgdmlhIGBjbG9zZSgpYCBvciBgdG9nZ2xlKClgIG1ldGhvZHMuXG5cdCAqICogYFwiaW5zaWRlXCJgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gaW5zaWRlIG1lbnUgY2xpY2tzLCBidXQgbm90IG91dHNpZGUgY2xpY2tzLlxuXHQgKiAqIGBcIm91dHNpZGVcImAgLSB0aGUgZHJvcGRvd24gd2lsbCBjbG9zZSBvbmx5IG9uIHRoZSBvdXRzaWRlIGNsaWNrcyBhbmQgbm90IG9uIG1lbnUgY2xpY2tzLlxuXHQgKi9cblx0QElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZSc7XG5cblx0LyoqXG5cdCAqIEEgY3VzdG9tIGNsYXNzIHRoYXQgaXMgYXBwbGllZCBvbmx5IHRvIHRoZSBgbmdiRHJvcGRvd25NZW51YCBwYXJlbnQgZWxlbWVudC5cblx0ICogKiBJbiBjYXNlIG9mIHRoZSBpbmxpbmUgZHJvcGRvd24gaXQgd2lsbCBiZSB0aGUgYDxkaXYgbmdiRHJvcGRvd24+YFxuXHQgKiAqIEluIGNhc2Ugb2YgdGhlIGRyb3Bkb3duIHdpdGggIGBjb250YWluZXI9XCJib2R5XCJgIGl0IHdpbGwgYmUgdGhlIGA8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5gIGF0dGFjaGVkIHRvIHRoZSBgPGJvZHk+YFxuXHQgKlxuXHQgKiBVc2VmdWwgbWFpbmx5IHdoZW4gZHJvcGRvd24gaXMgYXR0YWNoZWQgdG8gdGhlIGJvZHkuXG5cdCAqIElmIHRoZSBkcm9wZG93biBpcyBpbmxpbmUganVzdCB1c2UgYDxkaXYgbmdiRHJvcGRvd24gY2xhc3M9XCJjdXN0b20tY2xhc3NcIj5gIGluc3RlYWQuXG5cdCAqXG5cdCAqIEBzaW5jZSA5LjEuMFxuXHQgKi9cblx0QElucHV0KCkgZHJvcGRvd25DbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW5lZCBpbml0aWFsbHkuXG5cdCAqL1xuXHRASW5wdXQoJ29wZW4nKSBfb3BlbiA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgZHJvcGRvd24sIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImJvdHRvbS1zdGFydCBib3R0b20tZW5kIHRvcC1zdGFydCB0b3AtZW5kXCJgXG5cdCAqXG5cdCAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0byBjaGFuZ2UgZGVmYXVsdCBQb3BwZXIgb3B0aW9ucyB3aGVuIHBvc2l0aW9uaW5nIHRoZSBkcm9wZG93bi5cblx0ICogUmVjZWl2ZXMgY3VycmVudCBwb3BwZXIgb3B0aW9ucyBhbmQgcmV0dXJucyBtb2RpZmllZCBvbmVzLlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3BwZXJPcHRpb25zOiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gUGFydGlhbDxPcHRpb25zPjtcblxuXHQvKipcblx0ICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkcm9wZG93biBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG5cdCAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuXHQgKlxuXHQgKiBAc2luY2UgNC4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGNvbnRhaW5lcjogbnVsbCB8ICdib2R5JztcblxuXHQvKipcblx0ICogRW5hYmxlIG9yIGRpc2FibGUgdGhlIGR5bmFtaWMgcG9zaXRpb25pbmcuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGR5bmFtaWMgdW5sZXNzIHRoZSBkcm9wZG93biBpcyB1c2VkXG5cdCAqIGluc2lkZSBhIEJvb3RzdHJhcCBuYXZiYXIuIElmIHlvdSBuZWVkIGN1c3RvbSBwbGFjZW1lbnQgZm9yIGEgZHJvcGRvd24gaW4gYSBuYXZiYXIsIHNldCBpdCB0b1xuXHQgKiBkeW5hbWljIGV4cGxpY2l0bHkuIFNlZSB0aGUgW3Bvc2l0aW9uaW5nIG9mIGRyb3Bkb3duXSgjL3Bvc2l0aW9uaW5nI2Ryb3Bkb3duKVxuXHQgKiBhbmQgdGhlIFtuYXZiYXIgZGVtb10oLyMvY29tcG9uZW50cy9kcm9wZG93bi9leGFtcGxlcyNuYXZiYXIpIGZvciBtb3JlIGRldGFpbHMuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjIuMFxuXHQgKi9cblx0QElucHV0KCkgZGlzcGxheTogJ2R5bmFtaWMnIHwgJ3N0YXRpYyc7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCBvciBjbG9zZWQuXG5cdCAqXG5cdCAqIFRoZSBldmVudCBwYXlsb2FkIGlzIGEgYGJvb2xlYW5gOlxuXHQgKiAqIGB0cnVlYCAtIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkXG5cdCAqICogYGZhbHNlYCAtIHRoZSBkcm9wZG93biB3YXMgY2xvc2VkXG5cdCAqL1xuXHRAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0Y29uZmlnOiBOZ2JEcm9wZG93bkNvbmZpZyxcblx0XHRASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHRcdHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG5cdCkge1xuXHRcdHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblx0XHR0aGlzLnBvcHBlck9wdGlvbnMgPSBjb25maWcucG9wcGVyT3B0aW9ucztcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG5cdFx0dGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25pbmcgPSBuZ2JQb3NpdGlvbmluZygpO1xuXHRcdHRoaXMuZGlzcGxheSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KCcubmF2YmFyJykgPyAnc3RhdGljJyA6ICdkeW5hbWljJztcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG5cdFx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0XHR0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKGNoYW5nZXMuY29udGFpbmVyICYmIHRoaXMuX29wZW4pIHtcblx0XHRcdHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlcy5wbGFjZW1lbnQgJiYgIWNoYW5nZXMucGxhY2VtZW50LmZpcnN0Q2hhbmdlKSB7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5zZXRPcHRpb25zKHtcblx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlcy5kcm9wZG93bkNsYXNzKSB7XG5cdFx0XHRjb25zdCB7IGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSB9ID0gY2hhbmdlcy5kcm9wZG93bkNsYXNzO1xuXHRcdFx0dGhpcy5fYXBwbHlDdXN0b21Ecm9wZG93bkNsYXNzKGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXMuYXV0b0Nsb3NlICYmIHRoaXMuX29wZW4pIHtcblx0XHRcdHRoaXMuYXV0b0Nsb3NlID0gY2hhbmdlcy5hdXRvQ2xvc2UuY3VycmVudFZhbHVlO1xuXHRcdFx0dGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3Blbi5cblx0ICovXG5cdGlzT3BlbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fb3Blbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudS5cblx0ICovXG5cdG9wZW4oKTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLl9vcGVuKSB7XG5cdFx0XHR0aGlzLl9vcGVuID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcblx0XHRcdHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuXHRcdFx0dGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuXHRcdFx0aWYgKHRoaXMuX2FuY2hvcikge1xuXHRcdFx0XHR0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycpIHtcblx0XHRcdFx0XHR0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuY3JlYXRlUG9wcGVyKHtcblx0XHRcdFx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVQb3BwZXJPcHRpb25zOiAob3B0aW9ucykgPT4gdGhpcy5wb3BwZXJPcHRpb25zKGFkZFBvcHBlck9mZnNldChbMCwgMl0pKG9wdGlvbnMpKSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb3NpdGlvbk1lbnUoKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9zZXRDbG9zZUhhbmRsZXJzKCkge1xuXHRcdHRoaXMuX2Rlc3Ryb3lDbG9zZUhhbmRsZXJzJC5uZXh0KCk7IC8vIGRlc3Ryb3kgYW55IGV4aXN0aW5nIGNsb3NlIGhhbmRsZXJzXG5cblx0XHRuZ2JBdXRvQ2xvc2UoXG5cdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHR0aGlzLl9kb2N1bWVudCxcblx0XHRcdHRoaXMuYXV0b0Nsb3NlLFxuXHRcdFx0KHNvdXJjZTogU09VUkNFKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0aWYgKHNvdXJjZSA9PT0gU09VUkNFLkVTQ0FQRSkge1xuXHRcdFx0XHRcdHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQsXG5cdFx0XHR0aGlzLl9tZW51ID8gW3RoaXMuX21lbnUubmF0aXZlRWxlbWVudF0gOiBbXSxcblx0XHRcdHRoaXMuX2FuY2hvciA/IFt0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudF0gOiBbXSxcblx0XHRcdCcuZHJvcGRvd24taXRlbSwuZHJvcGRvd24tZGl2aWRlcicsXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG5cdCAqL1xuXHRjbG9zZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0dGhpcy5fb3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fcmVzZXRDb250YWluZXIoKTtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX3pvbmVTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQubmV4dCgpO1xuXHRcdFx0dGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuXHRcdFx0dGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG5cdCAqL1xuXHR0b2dnbGUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0Y29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cdFx0Y29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XG5cblx0XHRsZXQgcG9zaXRpb24gPSAtMTtcblx0XHRsZXQgaXRlbUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cdFx0Y29uc3QgaXNFdmVudEZyb21Ub2dnbGUgPSB0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCk7XG5cblx0XHRpZiAoIWlzRXZlbnRGcm9tVG9nZ2xlICYmIGl0ZW1FbGVtZW50cy5sZW5ndGgpIHtcblx0XHRcdGl0ZW1FbGVtZW50cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRpZiAoaXRlbS5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0aXRlbUVsZW1lbnQgPSBpdGVtO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpdGVtID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gY2xvc2luZyBvbiBFbnRlciAvIFNwYWNlXG5cdFx0aWYgKGtleSA9PT0gS2V5LlNwYWNlIHx8IGtleSA9PT0gS2V5LkVudGVyKSB7XG5cdFx0XHRpZiAoaXRlbUVsZW1lbnQgJiYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykpIHtcblx0XHRcdFx0Ly8gSXRlbSBpcyBlaXRoZXIgYSBidXR0b24gb3IgYSBsaW5rLCBzbyBjbGljayB3aWxsIGJlIHRyaWdnZXJlZCBieSB0aGUgYnJvd3NlciBvbiBFbnRlciBvciBTcGFjZS5cblx0XHRcdFx0Ly8gU28gd2UgaGF2ZSB0byByZWdpc3RlciBhIG9uZS10aW1lIGNsaWNrIGhhbmRsZXIgdGhhdCB3aWxsIGZpcmUgYWZ0ZXIgYW55IHVzZXIgZGVmaW5lZCBjbGljayBoYW5kbGVyc1xuXHRcdFx0XHQvLyB0byBjbG9zZSB0aGUgZHJvcGRvd25cblx0XHRcdFx0ZnJvbUV2ZW50KGl0ZW1FbGVtZW50LCAnY2xpY2snKVxuXHRcdFx0XHRcdC5waXBlKHRha2UoMSkpXG5cdFx0XHRcdFx0LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgPT09IEtleS5UYWIpIHtcblx0XHRcdGlmIChldmVudC50YXJnZXQgJiYgdGhpcy5pc09wZW4oKSAmJiB0aGlzLmF1dG9DbG9zZSkge1xuXHRcdFx0XHRpZiAodGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknICYmICFldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdFx0LyogVGhpcyBjYXNlIGlzIHNwZWNpYWw6IHVzZXIgaXMgdXNpbmcgW1RhYl0gZnJvbSB0aGUgYW5jaG9yL3RvZ2dsZS5cbiAgICAgICAgICAgICAgIFVzZXIgZXhwZWN0cyB0aGUgbmV4dCBmb2N1c2FibGUgZWxlbWVudCBpbiB0aGUgZHJvcGRvd24gbWVudSB0byBnZXQgZm9jdXMuXG4gICAgICAgICAgICAgICBCdXQgdGhlIG1lbnUgaXMgbm90IGEgc2libGluZyB0byBhbmNob3IvdG9nZ2xlLCBpdCBpcyBhdCB0aGUgZW5kIG9mIHRoZSBib2R5LlxuICAgICAgICAgICAgICAgVHJpY2sgaXMgdG8gc3luY2hyb25vdXNseSBmb2N1cyB0aGUgbWVudSBlbGVtZW50LCBhbmQgbGV0IHRoZSBba2V5ZG93bi5UYWJdIGdvXG4gICAgICAgICAgICAgICBzbyB0aGF0IGJyb3dzZXIgd2lsbCBmb2N1cyB0aGUgcHJvcGVyIGVsZW1lbnQgKGZpcnN0IG9uZSBmb2N1c2FibGUgaW4gdGhlIG1lbnUpICovXG5cdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0XHRcdFx0dGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG5cdFx0XHRcdFx0Y29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xuXHRcdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IGZvY3VzYWJsZUVsZW1lbnRzWzBdKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAnZm9jdXNvdXQnKVxuXHRcdFx0XHRcdFx0LnBpcGUodGFrZSgxKSlcblx0XHRcdFx0XHRcdC5zdWJzY3JpYmUoKHsgcmVsYXRlZFRhcmdldCB9KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHJlbGF0ZWRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIG9wZW5pbmcgLyBuYXZpZ2F0aW5nXG5cdFx0aWYgKGlzRXZlbnRGcm9tVG9nZ2xlIHx8IGl0ZW1FbGVtZW50KSB7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblxuXHRcdFx0aWYgKGl0ZW1FbGVtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0c3dpdGNoIChrZXkpIHtcblx0XHRcdFx0XHRjYXNlIEtleS5BcnJvd0Rvd246XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9IE1hdGgubWluKHBvc2l0aW9uICsgMSwgaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDEpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBLZXkuQXJyb3dVcDpcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9pc0Ryb3B1cCgpICYmIHBvc2l0aW9uID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9IGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHBvc2l0aW9uID0gTWF0aC5tYXgocG9zaXRpb24gLSAxLCAwKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgS2V5LkhvbWU6XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9IDA7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIEtleS5FbmQ6XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9IGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXRlbUVsZW1lbnRzW3Bvc2l0aW9uXS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9pc0Ryb3B1cCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwJyk7XG5cdH1cblxuXHRwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXHRcdHJldHVybiB0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0TWVudUVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuXHRcdGNvbnN0IG1lbnUgPSB0aGlzLl9tZW51O1xuXHRcdGlmIChtZW51ID09IG51bGwpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbnUubWVudUl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uZGlzYWJsZWQpLm1hcCgoaXRlbSkgPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfcG9zaXRpb25NZW51KCkge1xuXHRcdGNvbnN0IG1lbnUgPSB0aGlzLl9tZW51O1xuXHRcdGlmICh0aGlzLmlzT3BlbigpICYmIG1lbnUpIHtcblx0XHRcdGlmICh0aGlzLmRpc3BsYXkgPT09ICdkeW5hbWljJykge1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy51cGRhdGUoKTtcblx0XHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXModGhpcy5fZ2V0Rmlyc3RQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9nZXRGaXJzdFBsYWNlbWVudChwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5KTogUGxhY2VtZW50IHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpID8gcGxhY2VtZW50WzBdIDogKHBsYWNlbWVudC5zcGxpdCgnICcpWzBdIGFzIFBsYWNlbWVudCk7XG5cdH1cblxuXHRwcml2YXRlIF9yZXNldENvbnRhaW5lcigpIHtcblx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuXHRcdGlmICh0aGlzLl9tZW51KSB7XG5cdFx0XHRjb25zdCBkcm9wZG93bkVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0XHRjb25zdCBkcm9wZG93bk1lbnVFbGVtZW50ID0gdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHRyZW5kZXJlci5hcHBlbmRDaGlsZChkcm9wZG93bkVsZW1lbnQsIGRyb3Bkb3duTWVudUVsZW1lbnQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fYm9keUNvbnRhaW5lcikge1xuXHRcdFx0cmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgdGhpcy5fYm9keUNvbnRhaW5lcik7XG5cdFx0XHR0aGlzLl9ib2R5Q29udGFpbmVyID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9hcHBseUNvbnRhaW5lcihjb250YWluZXI6IG51bGwgfCAnYm9keScgPSBudWxsKSB7XG5cdFx0dGhpcy5fcmVzZXRDb250YWluZXIoKTtcblx0XHRpZiAoY29udGFpbmVyID09PSAnYm9keScpIHtcblx0XHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG5cdFx0XHRjb25zdCBkcm9wZG93bk1lbnVFbGVtZW50ID0gdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50O1xuXHRcdFx0Y29uc3QgYm9keUNvbnRhaW5lciA9ICh0aGlzLl9ib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lciB8fCByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG5cblx0XHRcdC8vIE92ZXJyaWRlIHNvbWUgc3R5bGVzIHRvIGhhdmUgdGhlIHBvc2l0aW9uaW5nIHdvcmtpbmdcblx0XHRcdHJlbmRlcmVyLnNldFN0eWxlKGJvZHlDb250YWluZXIsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuXHRcdFx0cmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd25NZW51RWxlbWVudCwgJ3Bvc2l0aW9uJywgJ3N0YXRpYycpO1xuXHRcdFx0cmVuZGVyZXIuc2V0U3R5bGUoYm9keUNvbnRhaW5lciwgJ3otaW5kZXgnLCAnMTA1NScpO1xuXG5cdFx0XHRyZW5kZXJlci5hcHBlbmRDaGlsZChib2R5Q29udGFpbmVyLCBkcm9wZG93bk1lbnVFbGVtZW50KTtcblx0XHRcdHJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIGJvZHlDb250YWluZXIpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FwcGx5Q3VzdG9tRHJvcGRvd25DbGFzcyh0aGlzLmRyb3Bkb3duQ2xhc3MpO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXBwbHlDdXN0b21Ecm9wZG93bkNsYXNzKG5ld0NsYXNzOiBzdHJpbmcsIG9sZENsYXNzPzogc3RyaW5nKSB7XG5cdFx0Y29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXMuY29udGFpbmVyID09PSAnYm9keScgPyB0aGlzLl9ib2R5Q29udGFpbmVyIDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXHRcdGlmICh0YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRpZiAob2xkQ2xhc3MpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGFyZ2V0RWxlbWVudCwgb2xkQ2xhc3MpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG5ld0NsYXNzKSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRhcmdldEVsZW1lbnQsIG5ld0NsYXNzKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9hcHBseVBsYWNlbWVudENsYXNzZXMocGxhY2VtZW50PzogUGxhY2VtZW50IHwgbnVsbCkge1xuXHRcdGNvbnN0IG1lbnUgPSB0aGlzLl9tZW51O1xuXHRcdGlmIChtZW51KSB7XG5cdFx0XHRpZiAoIXBsYWNlbWVudCkge1xuXHRcdFx0XHRwbGFjZW1lbnQgPSB0aGlzLl9nZXRGaXJzdFBsYWNlbWVudCh0aGlzLnBsYWNlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG5cdFx0XHRjb25zdCBkcm9wZG93bkVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRcdC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xuXHRcdFx0cmVuZGVyZXIucmVtb3ZlQ2xhc3MoZHJvcGRvd25FbGVtZW50LCAnZHJvcHVwJyk7XG5cdFx0XHRyZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93bkVsZW1lbnQsICdkcm9wZG93bicpO1xuXHRcdFx0Y29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSBtZW51O1xuXHRcdFx0aWYgKHRoaXMuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0bWVudS5wbGFjZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRBdHRyaWJ1dGUobmF0aXZlRWxlbWVudCwgJ2RhdGEtYnMtcG9wcGVyJywgJ3N0YXRpYycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWVudS5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG5cdFx0XHRcdHJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShuYXRpdmVFbGVtZW50LCAnZGF0YS1icy1wb3BwZXInKTtcblx0XHRcdH1cblxuXHRcdFx0Lypcblx0XHRcdCAqIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XG5cdFx0XHQgKiBpbiBjYXNlIG9mIHRvcCB1c2UgdXAtYXJyb3cgb3IgZG93bi1hcnJvdyBvdGhlcndpc2Vcblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgZHJvcGRvd25DbGFzcyA9IHBsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEgPyAnZHJvcHVwJyA6ICdkcm9wZG93bic7XG5cdFx0XHRyZW5kZXJlci5hZGRDbGFzcyhkcm9wZG93bkVsZW1lbnQsIGRyb3Bkb3duQ2xhc3MpO1xuXG5cdFx0XHRjb25zdCBib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lcjtcblx0XHRcdGlmIChib2R5Q29udGFpbmVyKSB7XG5cdFx0XHRcdHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wdXAnKTtcblx0XHRcdFx0cmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keUNvbnRhaW5lciwgJ2Ryb3Bkb3duJyk7XG5cdFx0XHRcdHJlbmRlcmVyLmFkZENsYXNzKGJvZHlDb250YWluZXIsIGRyb3Bkb3duQ2xhc3MpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl19