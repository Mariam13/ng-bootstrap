import { ApplicationRef, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, inject, Inject, Input, Output, TemplateRef, } from '@angular/core';
import { NgbCollapse } from '../collapse/collapse';
import { isString } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "../collapse/collapse";
import * as i2 from "./accordion-config";
let nextId = 0;
/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
export class NgbAccordionBody {
    constructor() {
        this._appRef = inject(ApplicationRef);
        this._element = inject((ElementRef)).nativeElement;
        this._item = inject(NgbAccordionItem);
        this._viewRef = null;
    }
    ngAfterContentChecked() {
        if (this._bodyTpl) {
            if (this._item.animatingBodyCollapse || !this._item.destroyOnHide) {
                this._createViewIfNotExists();
            }
            else {
                this._destroyViewIfExists();
            }
        }
    }
    ngOnDestroy() {
        this._destroyViewIfExists();
    }
    _destroyViewIfExists() {
        if (this._viewRef) {
            this._appRef.detachView(this._viewRef);
            this._viewRef.destroy();
            this._viewRef = null;
        }
    }
    _createViewIfNotExists() {
        if (!this._viewRef) {
            this._viewRef = this._bodyTpl.createEmbeddedView(null);
            this._viewRef.detectChanges();
            this._appRef.attachView(this._viewRef);
            for (const node of this._viewRef.rootNodes) {
                this._element.appendChild(node);
            }
        }
    }
}
NgbAccordionBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionBody, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionBody.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionBody, isStandalone: true, selector: "[ngbAccordionBody]", host: { properties: { "class.accordion-body": "true" } }, queries: [{ propertyName: "_bodyTpl", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionBody, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionBody]',
                    standalone: true,
                    host: { '[class.accordion-body]': 'true' },
                }]
        }], propDecorators: { _bodyTpl: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] } });
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
export class NgbAccordionCollapse {
    constructor(item, ngbCollapse) {
        this.item = item;
        this.ngbCollapse = ngbCollapse;
    }
}
NgbAccordionCollapse.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionCollapse, deps: [{ token: forwardRef(() => NgbAccordionItem) }, { token: i1.NgbCollapse }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionCollapse.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionCollapse, isStandalone: true, selector: "[ngbAccordionCollapse]", host: { attributes: { "role": "region" }, properties: { "class.accordion-collapse": "true", "id": "item.collapseId", "attr.aria-labelledby": "item.toggleId" } }, exportAs: ["ngbAccordionCollapse"], hostDirectives: [{ directive: i1.NgbCollapse }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionCollapse, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'ngbAccordionCollapse',
                    standalone: true,
                    selector: '[ngbAccordionCollapse]',
                    host: {
                        role: 'region',
                        '[class.accordion-collapse]': 'true',
                        '[id]': 'item.collapseId',
                        '[attr.aria-labelledby]': 'item.toggleId',
                    },
                    hostDirectives: [
                        {
                            directive: NgbCollapse,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordionItem, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionItem)]
                }] }, { type: i1.NgbCollapse }]; } });
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
export class NgbAccordionToggle {
    constructor(item, accordion) {
        this.item = item;
        this.accordion = accordion;
    }
}
NgbAccordionToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionToggle, deps: [{ token: forwardRef(() => NgbAccordionItem) }, { token: forwardRef(() => NgbAccordionDirective) }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionToggle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionToggle, isStandalone: true, selector: "[ngbAccordionToggle]", host: { listeners: { "click": "!item.disabled && accordion.toggle(item.id)" }, properties: { "id": "item.toggleId", "class.collapsed": "item.collapsed", "attr.aria-controls": "item.collapseId", "attr.aria-expanded": "!item.collapsed" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionToggle]',
                    standalone: true,
                    host: {
                        '[id]': 'item.toggleId',
                        '[class.collapsed]': 'item.collapsed',
                        '[attr.aria-controls]': 'item.collapseId',
                        '[attr.aria-expanded]': '!item.collapsed',
                        '(click)': '!item.disabled && accordion.toggle(item.id)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordionItem, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionItem)]
                }] }, { type: NgbAccordionDirective, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionDirective)]
                }] }]; } });
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
export class NgbAccordionButton {
    constructor(item) {
        this.item = item;
    }
}
NgbAccordionButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionButton, deps: [{ token: forwardRef(() => NgbAccordionItem) }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionButton.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionButton, isStandalone: true, selector: "button[ngbAccordionButton]", host: { attributes: { "type": "button" }, properties: { "disabled": "item.disabled", "class.accordion-button": "true" } }, hostDirectives: [{ directive: NgbAccordionToggle }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbAccordionButton]',
                    standalone: true,
                    host: {
                        '[disabled]': 'item.disabled',
                        '[class.accordion-button]': 'true',
                        type: 'button',
                    },
                    hostDirectives: [
                        {
                            directive: NgbAccordionToggle,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordionItem, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionItem)]
                }] }]; } });
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
export class NgbAccordionHeader {
    constructor(item) {
        this.item = item;
    }
}
NgbAccordionHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionHeader, deps: [{ token: forwardRef(() => NgbAccordionItem) }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionHeader, isStandalone: true, selector: "[ngbAccordionHeader]", host: { attributes: { "role": "heading" }, properties: { "class.accordion-header": "true", "class.collapsed": "item.collapsed" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionHeader]',
                    standalone: true,
                    host: {
                        role: 'heading',
                        '[class.accordion-header]': 'true',
                        '[class.collapsed]': 'item.collapsed',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordionItem, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionItem)]
                }] }]; } });
/**
 * A directive that wraps an accordion item: a toggleable header + body that collapses.
 *
 * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
 * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
 *
 * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
 *
 * @since 14.1.0
 */
export class NgbAccordionItem {
    constructor(_accordion, _cd) {
        this._accordion = _accordion;
        this._cd = _cd;
        this._subscriptions = [];
        this._collapsed = true;
        this._id = `ngb-accordion-item-${nextId++}`;
        this.animatingBodyCollapse = false;
        /**
         * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
         *
         * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
         */
        this.destroyOnHide = this._accordion.destroyOnHide;
        /**
         * If `true`, the accordion item will be disabled.
         * It won't react to user's clicks, but still will be toggelable programmatically.
         */
        this.disabled = false;
        /**
         * Event emitted when the expanding animation is finished. It has no payload.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * It has no payload.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id) {
        if (isString(id) && id !== '') {
            this._id = id;
        }
    }
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @param collapsed New state of the accordion item.
     */
    set collapsed(collapsed) {
        if (this.collapsed !== collapsed) {
            // checking if accordion allows to expand the panel in respect to 'closeOthers' flag
            if (this.collapsed && !this._accordion._ensureCanExpand(this)) {
                return;
            }
            this._collapsed = collapsed;
            this._cd.markForCheck(); // need if the accordion is used inside a component having OnPush change detection strategy
            // we need force CD to get template into DOM before starting animation to calculate its height correctly
            if (!this.collapsed) {
                this.animatingBodyCollapse = true;
                this._cd.detectChanges();
            }
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = this.collapsed;
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    get id() {
        return `${this._id}`;
    }
    get toggleId() {
        return `${this.id}-toggle`;
    }
    get collapseId() {
        return `${this.id}-collapse`;
    }
    ngAfterContentInit() {
        const { ngbCollapse } = this._collapse;
        // we need to disable the animation for the first init
        ngbCollapse.animation = false;
        ngbCollapse.collapsed = this.collapsed;
        // we set the animation to the default of the accordion
        ngbCollapse.animation = this._accordion.animation;
        // event forwarding from 'ngbCollapse' to 'ngbAccordion'
        this._subscriptions.push(ngbCollapse.hidden.subscribe(() => {
            // when the animation finishes we can remove the template from DOM
            this.animatingBodyCollapse = false;
            this.hidden.emit();
            this._accordion.hidden.emit(this.id);
        }), ngbCollapse.shown.subscribe(() => {
            this.shown.emit();
            this._accordion.shown.emit(this.id);
        }));
    }
    ngOnDestroy() {
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
    /**
     * Toggles an accordion item.
     */
    toggle() {
        this.collapsed = !this.collapsed;
    }
    /**
     * Expands an accordion item.
     */
    expand() {
        this.collapsed = false;
    }
    /**
     * Collapses an accordion item.
     */
    collapse() {
        this.collapsed = true;
    }
}
NgbAccordionItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionItem, deps: [{ token: forwardRef(() => NgbAccordionDirective) }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionItem, isStandalone: true, selector: "[ngbAccordionItem]", inputs: { id: ["ngbAccordionItem", "id"], destroyOnHide: "destroyOnHide", disabled: "disabled", collapsed: "collapsed" }, outputs: { shown: "shown", hidden: "hidden" }, host: { properties: { "class.accordion-item": "true", "id": "id" } }, queries: [{ propertyName: "_collapse", first: true, predicate: NgbAccordionCollapse, descendants: true, static: true }], exportAs: ["ngbAccordionItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionItem]',
                    exportAs: 'ngbAccordionItem',
                    standalone: true,
                    host: {
                        '[class.accordion-item]': 'true',
                        '[id]': 'id',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordionDirective, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordionDirective)]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _collapse: [{
                type: ContentChild,
                args: [NgbAccordionCollapse, { static: true }]
            }], id: [{
                type: Input,
                args: ['ngbAccordionItem']
            }], destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
export class NgbAccordionDirective {
    constructor(config) {
        /**
         * If `true`, the content of the accordion items body will be removed from the DOM. It will be just hidden otherwise.
         *
         * This property can be overwritten at the [`NgbAccordionItem`](#/components/accordion/api#NgbAccordionItem) level
         */
        this.destroyOnHide = true;
        /**
         * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * The payload is the id of hidden accordion item.
         */
        this.hidden = new EventEmitter();
        this._anItemWasAlreadyExpandedDuringInitialisation = false;
        this.animation = config.animation;
        this.closeOthers = config.closeOthers;
    }
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId) {
        this._getItem(itemId)?.toggle();
    }
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId) {
        this._getItem(itemId)?.expand();
    }
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll() {
        if (this._items) {
            if (this.closeOthers) {
                // we check if there is an item open and if it is not we can expand the first item
                // (otherwise we toggle nothing)
                if (!this._items.find((item) => !item.collapsed)) {
                    this._items.first.expand();
                }
            }
            else {
                this._items.forEach((item) => item.expand());
            }
        }
    }
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId) {
        this._getItem(itemId)?.collapse();
    }
    /**
     * Collapses all items.
     */
    collapseAll() {
        this._items?.forEach((item) => item.collapse());
    }
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId) {
        const item = this._getItem(itemId);
        return item ? !item.collapsed : false;
    }
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand) {
        if (!this.closeOthers) {
            return true;
        }
        // special case during the initialization of the [collapse]="false" inputs
        // `this._items` QueryList is not yet initialized, but we need to ensure only one item can be expanded at a time
        if (!this._items) {
            if (!this._anItemWasAlreadyExpandedDuringInitialisation) {
                this._anItemWasAlreadyExpandedDuringInitialisation = true;
                return true;
            }
            return false;
        }
        // if there is an expanded item, we need to collapse it first
        this._items.find((item) => !item.collapsed && toExpand !== item)?.collapse();
        return true;
    }
    _getItem(itemId) {
        return this._items?.find((item) => item.id === itemId);
    }
}
NgbAccordionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionDirective, deps: [{ token: i2.NgbAccordionConfig }], target: i0.ɵɵFactoryTarget.Directive });
NgbAccordionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NgbAccordionDirective, isStandalone: true, selector: "[ngbAccordion]", inputs: { animation: "animation", closeOthers: "closeOthers", destroyOnHide: "destroyOnHide" }, outputs: { shown: "shown", hidden: "hidden" }, host: { properties: { "class.accordion": "true" } }, queries: [{ propertyName: "_items", predicate: NgbAccordionItem }], exportAs: ["ngbAccordion"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordion]',
                    standalone: true,
                    exportAs: 'ngbAccordion',
                    host: { '[class.accordion]': 'true' },
                }]
        }], ctorParameters: function () { return [{ type: i2.NgbAccordionConfig }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbAccordionItem, { descendants: false }]
            }], animation: [{
                type: Input
            }], closeOthers: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR04sY0FBYyxFQUVkLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFFTixXQUFXLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFFeEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7Ozs7Ozs7R0FPRztBQU1ILE1BQU0sT0FBTyxnQkFBZ0I7SUFMN0I7UUFNUyxZQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pDLGFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQSxVQUF1QixDQUFBLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDekQsVUFBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWpDLGFBQVEsR0FBZ0MsSUFBSSxDQUFDO0tBb0NyRDtJQWhDQSxxQkFBcUI7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1QjtTQUNEO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FB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cnQge1xuXHRBZnRlckNvbnRlbnRDaGVja2VkLFxuXHRBZnRlckNvbnRlbnRJbml0LFxuXHRBcHBsaWNhdGlvblJlZixcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbnRlbnRDaGlsZCxcblx0Q29udGVudENoaWxkcmVuLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEVtYmVkZGVkVmlld1JlZixcblx0RXZlbnRFbWl0dGVyLFxuXHRmb3J3YXJkUmVmLFxuXHRpbmplY3QsXG5cdEluamVjdCxcblx0SW5wdXQsXG5cdE9uRGVzdHJveSxcblx0T3V0cHV0LFxuXHRRdWVyeUxpc3QsXG5cdFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdiQWNjb3JkaW9uQ29uZmlnIH0gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcbmltcG9ydCB7IE5nYkNvbGxhcHNlIH0gZnJvbSAnLi4vY29sbGFwc2UvY29sbGFwc2UnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBjb250ZW50IG9mIGFuIGFjY29yZGlvbiBpdGVtJ3MgY29sbGFwc2libGUgYm9keS5cbiAqXG4gKiBUaGUgYWN0dWFsIGNvbnRlbnQgaXMgcHJvdmlkZWQgaW4gYSBjaGlsZCBgbmctdGVtcGxhdGVgIGVsZW1lbnQuXG4gKiBEZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIHRoZSBhY2NvcmRpb24sIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIGVpdGhlciBpbnNlcnRlZCBvciByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JBY2NvcmRpb25Cb2R5XScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHsgJ1tjbGFzcy5hY2NvcmRpb24tYm9keV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQm9keSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG5cdHByaXZhdGUgX2FwcFJlZiA9IGluamVjdChBcHBsaWNhdGlvblJlZik7XG5cdHByaXZhdGUgX2VsZW1lbnQgPSBpbmplY3QoRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pLm5hdGl2ZUVsZW1lbnQ7XG5cdHByaXZhdGUgX2l0ZW0gPSBpbmplY3QoTmdiQWNjb3JkaW9uSXRlbSk7XG5cblx0cHJpdmF0ZSBfdmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPGFueT4gfCBudWxsID0gbnVsbDtcblxuXHRAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIF9ib2R5VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cdG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fYm9keVRwbCkge1xuXHRcdFx0aWYgKHRoaXMuX2l0ZW0uYW5pbWF0aW5nQm9keUNvbGxhcHNlIHx8ICF0aGlzLl9pdGVtLmRlc3Ryb3lPbkhpZGUpIHtcblx0XHRcdFx0dGhpcy5fY3JlYXRlVmlld0lmTm90RXhpc3RzKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9kZXN0cm95Vmlld0lmRXhpc3RzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0dGhpcy5fZGVzdHJveVZpZXdJZkV4aXN0cygpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZGVzdHJveVZpZXdJZkV4aXN0cygpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fdmlld1JlZikge1xuXHRcdFx0dGhpcy5fYXBwUmVmLmRldGFjaFZpZXcodGhpcy5fdmlld1JlZik7XG5cdFx0XHR0aGlzLl92aWV3UmVmLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX3ZpZXdSZWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZVZpZXdJZk5vdEV4aXN0cygpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuX3ZpZXdSZWYpIHtcblx0XHRcdHRoaXMuX3ZpZXdSZWYgPSB0aGlzLl9ib2R5VHBsLmNyZWF0ZUVtYmVkZGVkVmlldyhudWxsKTtcblx0XHRcdHRoaXMuX3ZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0dGhpcy5fYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5fdmlld1JlZik7XG5cdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5fdmlld1JlZi5yb290Tm9kZXMpIHtcblx0XHRcdFx0dGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBjb2xsYXBzaWJsZSBpdGVtJ3MgY29udGVudCBvZiB0aGUgYWNjb3JkaW9uLlxuICpcbiAqIEludGVybmFsbHkgaXQgcmV1c2VzIHRoZSBbYE5nYkNvbGxhcHNlYCBkaXJlY3RpdmVdKCMvY29tcG9uZW50cy9jb2xsYXBzZSlcbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRleHBvcnRBczogJ25nYkFjY29yZGlvbkNvbGxhcHNlJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0c2VsZWN0b3I6ICdbbmdiQWNjb3JkaW9uQ29sbGFwc2VdJyxcblx0aG9zdDoge1xuXHRcdHJvbGU6ICdyZWdpb24nLFxuXHRcdCdbY2xhc3MuYWNjb3JkaW9uLWNvbGxhcHNlXSc6ICd0cnVlJyxcblx0XHQnW2lkXSc6ICdpdGVtLmNvbGxhcHNlSWQnLFxuXHRcdCdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2l0ZW0udG9nZ2xlSWQnLFxuXHR9LFxuXHRob3N0RGlyZWN0aXZlczogW1xuXHRcdHtcblx0XHRcdGRpcmVjdGl2ZTogTmdiQ29sbGFwc2UsXG5cdFx0fSxcblx0XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29sbGFwc2Uge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiQWNjb3JkaW9uSXRlbSkpIHB1YmxpYyBpdGVtOiBOZ2JBY2NvcmRpb25JdGVtLFxuXHRcdHB1YmxpYyBuZ2JDb2xsYXBzZTogTmdiQ29sbGFwc2UsXG5cdCkge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gYSB0b2dnbGluZyBlbGVtZW50IGluc2lkZSB0aGUgYWNjb3JkaW9uIGl0ZW0ncyBoZWFkZXIuXG4gKiBJdCB3aWxsIHJlZ2lzdGVyIGNsaWNrIGhhbmRsZXJzIHRoYXQgdG9nZ2xlIHRoZSBhc3NvY2lhdGVkIHBhbmVsIGFuZCB3aWxsIGhhbmRsZSBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXMuXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBbYE5nYkFjY29yZGlvbkJ1dHRvbmAgZGlyZWN0aXZlXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JBY2NvcmRpb25CdXR0b24pLlxuICpcbiAqIEBzaW5jZSAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYkFjY29yZGlvblRvZ2dsZV0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0J1tpZF0nOiAnaXRlbS50b2dnbGVJZCcsXG5cdFx0J1tjbGFzcy5jb2xsYXBzZWRdJzogJ2l0ZW0uY29sbGFwc2VkJyxcblx0XHQnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnaXRlbS5jb2xsYXBzZUlkJyxcblx0XHQnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnIWl0ZW0uY29sbGFwc2VkJyxcblx0XHQnKGNsaWNrKSc6ICchaXRlbS5kaXNhYmxlZCAmJiBhY2NvcmRpb24udG9nZ2xlKGl0ZW0uaWQpJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uVG9nZ2xlIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0QEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbkl0ZW0pKSBwdWJsaWMgaXRlbTogTmdiQWNjb3JkaW9uSXRlbSxcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiQWNjb3JkaW9uRGlyZWN0aXZlKSkgcHVibGljIGFjY29yZGlvbjogTmdiQWNjb3JkaW9uRGlyZWN0aXZlLFxuXHQpIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHV0IG9uIGEgYnV0dG9uIGVsZW1lbnQgaW5zaWRlIGFuIGFjY29yZGlvbiBpdGVtJ3MgaGVhZGVyLlxuICpcbiAqIElmIHlvdSB3YW50IGEgY3VzdG9tIG1hcmt1cCBmb3IgdGhlIGhlYWRlciwgeW91IGNhbiBhbHNvIHVzZSB0aGUgW2BOZ2JBY2NvcmRpb25Ub2dnbGVgIGRpcmVjdGl2ZV0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiQWNjb3JkaW9uVG9nZ2xlKS5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ2J1dHRvbltuZ2JBY2NvcmRpb25CdXR0b25dJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbZGlzYWJsZWRdJzogJ2l0ZW0uZGlzYWJsZWQnLFxuXHRcdCdbY2xhc3MuYWNjb3JkaW9uLWJ1dHRvbl0nOiAndHJ1ZScsXG5cdFx0dHlwZTogJ2J1dHRvbicsXG5cdH0sXG5cdGhvc3REaXJlY3RpdmVzOiBbXG5cdFx0e1xuXHRcdFx0ZGlyZWN0aXZlOiBOZ2JBY2NvcmRpb25Ub2dnbGUsXG5cdFx0fSxcblx0XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQnV0dG9uIHtcblx0Y29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbkl0ZW0pKSBwdWJsaWMgaXRlbTogTmdiQWNjb3JkaW9uSXRlbSkge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGFuIGFjY29yZGlvbiBpdGVtJ3MgaGVhZGVyLlxuICpcbiAqIEBzaW5jZSAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYkFjY29yZGlvbkhlYWRlcl0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0cm9sZTogJ2hlYWRpbmcnLFxuXHRcdCdbY2xhc3MuYWNjb3JkaW9uLWhlYWRlcl0nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5jb2xsYXBzZWRdJzogJ2l0ZW0uY29sbGFwc2VkJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uSGVhZGVyIHtcblx0Y29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbkl0ZW0pKSBwdWJsaWMgaXRlbTogTmdiQWNjb3JkaW9uSXRlbSkge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGFuIGFjY29yZGlvbiBpdGVtOiBhIHRvZ2dsZWFibGUgaGVhZGVyICsgYm9keSB0aGF0IGNvbGxhcHNlcy5cbiAqXG4gKiBZb3UgY2FuIGdldCBob2xkIG9mIHRoZSBgTmdiQWNjb3JkaW9uSXRlbWAgaW5zdGFuY2UgaW4gdGhlIHRlbXBsYXRlIHdpdGggYCNpdGVtPVwibmdiQWNjb3JkaW9uSXRlbVwiYC5cbiAqIEl0IGFsbG93cyB0byBjaGVjayBpZiB0aGUgaXRlbSBpcyBjb2xsYXBzZWQgb3Igbm90LCB0b2dnbGUgdGhlIGNvbGxhcHNlIHN0YXRlLCBldGMuXG4gKlxuICogRXZlcnkgYWNjb3JkaW9uIGl0ZW0gaGFzIGEgc3RyaW5nIElEIHRoYXQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgaW4gdGhlIGBuZ2ItYWNjb3JkaW9uLWl0ZW0tWFhgIGZvcm1hdCwgdW5sZXNzIHByb3ZpZGVkIGV4cGxpY2l0bHkuXG4gKlxuICogQHNpbmNlIDE0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbbmdiQWNjb3JkaW9uSXRlbV0nLFxuXHRleHBvcnRBczogJ25nYkFjY29yZGlvbkl0ZW0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0J1tjbGFzcy5hY2NvcmRpb24taXRlbV0nOiAndHJ1ZScsXG5cdFx0J1tpZF0nOiAnaWQnLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBY2NvcmRpb25JdGVtIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblx0Y29uc3RydWN0b3IoXG5cdFx0QEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbkRpcmVjdGl2ZSkpIHByaXZhdGUgX2FjY29yZGlvbjogTmdiQWNjb3JkaW9uRGlyZWN0aXZlLFxuXHRcdHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0KSB7fVxuXG5cdHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cdHByaXZhdGUgX2NvbGxhcHNlZCA9IHRydWU7XG5cdHByaXZhdGUgX2lkID0gYG5nYi1hY2NvcmRpb24taXRlbS0ke25leHRJZCsrfWA7XG5cblx0YW5pbWF0aW5nQm9keUNvbGxhcHNlID0gZmFsc2U7XG5cblx0QENvbnRlbnRDaGlsZChOZ2JBY2NvcmRpb25Db2xsYXBzZSwgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBfY29sbGFwc2U6IE5nYkFjY29yZGlvbkNvbGxhcHNlO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjdXN0b20gSUQgb2YgdGhlIGFjY29yZGlvbiBpdGVtLiBJdCBtdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGRvY3VtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gaWQgVGhlIElEIG9mIHRoZSBhY2NvcmRpb24gaXRlbSwgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcblx0ICovXG5cdEBJbnB1dCgnbmdiQWNjb3JkaW9uSXRlbScpIHNldCBpZChpZDogc3RyaW5nKSB7XG5cdFx0aWYgKGlzU3RyaW5nKGlkKSAmJiBpZCAhPT0gJycpIHtcblx0XHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGNvbnRlbnQgb2YgdGhlIGFjY29yZGlvbiBpdGVtJ3MgYm9keSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NLiBJdCB3aWxsIGJlIGp1c3QgaGlkZGVuIG90aGVyd2lzZS5cblx0ICpcblx0ICogVGhpcyBwcm9wZXJ0eSBjYW4gYWxzbyBiZSBzZXQgdXAgb24gdGhlIHBhcmVudCBbYE5nYkFjY29yZGlvbmAgZGlyZWN0aXZlXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JBY2NvcmRpb25EaXJlY3RpdmUpLlxuXHQgKi9cblx0QElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRoaXMuX2FjY29yZGlvbi5kZXN0cm95T25IaWRlO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBhY2NvcmRpb24gaXRlbSB3aWxsIGJlIGRpc2FibGVkLlxuXHQgKiBJdCB3b24ndCByZWFjdCB0byB1c2VyJ3MgY2xpY2tzLCBidXQgc3RpbGwgd2lsbCBiZSB0b2dnZWxhYmxlIHByb2dyYW1tYXRpY2FsbHkuXG5cdCAqL1xuXHRASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKlx0SWYgYHRydWVgLCB0aGUgYWNjb3JkaW9uIGl0ZW0gd2lsbCBiZSBjb2xsYXBzZWQuIE90aGVyd2lzZSwgaXQgd2lsbCBiZSBleHBhbmRlZC5cblx0ICpcblx0ICogQHBhcmFtIGNvbGxhcHNlZCBOZXcgc3RhdGUgb2YgdGhlIGFjY29yZGlvbiBpdGVtLlxuXHQgKi9cblx0QElucHV0KCkgc2V0IGNvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcblx0XHRpZiAodGhpcy5jb2xsYXBzZWQgIT09IGNvbGxhcHNlZCkge1xuXHRcdFx0Ly8gY2hlY2tpbmcgaWYgYWNjb3JkaW9uIGFsbG93cyB0byBleHBhbmQgdGhlIHBhbmVsIGluIHJlc3BlY3QgdG8gJ2Nsb3NlT3RoZXJzJyBmbGFnXG5cdFx0XHRpZiAodGhpcy5jb2xsYXBzZWQgJiYgIXRoaXMuX2FjY29yZGlvbi5fZW5zdXJlQ2FuRXhwYW5kKHRoaXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fY29sbGFwc2VkID0gY29sbGFwc2VkO1xuXHRcdFx0dGhpcy5fY2QubWFya0ZvckNoZWNrKCk7IC8vIG5lZWQgaWYgdGhlIGFjY29yZGlvbiBpcyB1c2VkIGluc2lkZSBhIGNvbXBvbmVudCBoYXZpbmcgT25QdXNoIGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3lcblx0XHRcdC8vIHdlIG5lZWQgZm9yY2UgQ0QgdG8gZ2V0IHRlbXBsYXRlIGludG8gRE9NIGJlZm9yZSBzdGFydGluZyBhbmltYXRpb24gdG8gY2FsY3VsYXRlIGl0cyBoZWlnaHQgY29ycmVjdGx5XG5cdFx0XHRpZiAoIXRoaXMuY29sbGFwc2VkKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0aW5nQm9keUNvbGxhcHNlID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gd2UgYWxzbyBuZWVkIHRvIG1ha2Ugc3VyZSAnYW5pbWF0aW9uJyBmbGFnIGlzIHVwLXRvLSBkYXRlXG5cdFx0XHR0aGlzLl9jb2xsYXBzZS5uZ2JDb2xsYXBzZS5hbmltYXRpb24gPSB0aGlzLl9hY2NvcmRpb24uYW5pbWF0aW9uO1xuXHRcdFx0dGhpcy5fY29sbGFwc2UubmdiQ29sbGFwc2UuY29sbGFwc2VkID0gdGhpcy5jb2xsYXBzZWQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZXhwYW5kaW5nIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC4gSXQgaGFzIG5vIHBheWxvYWQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0LyoqXG5cdCAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY29sbGFwc2luZyBhbmltYXRpb24gaXMgZmluaXNoZWQgYW5kIGJlZm9yZSB0aGUgY29udGVudCBpcyByZW1vdmVkIGZyb20gRE9NLlxuXHQgKiBJdCBoYXMgbm8gcGF5bG9hZC5cblx0ICovXG5cdEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0Z2V0IGNvbGxhcHNlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xuXHR9XG5cblx0Z2V0IGlkKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLl9pZH1gO1xuXHR9XG5cblx0Z2V0IHRvZ2dsZUlkKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmlkfS10b2dnbGVgO1xuXHR9XG5cblx0Z2V0IGNvbGxhcHNlSWQoKSB7XG5cdFx0cmV0dXJuIGAke3RoaXMuaWR9LWNvbGxhcHNlYDtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHRjb25zdCB7IG5nYkNvbGxhcHNlIH0gPSB0aGlzLl9jb2xsYXBzZTtcblx0XHQvLyB3ZSBuZWVkIHRvIGRpc2FibGUgdGhlIGFuaW1hdGlvbiBmb3IgdGhlIGZpcnN0IGluaXRcblx0XHRuZ2JDb2xsYXBzZS5hbmltYXRpb24gPSBmYWxzZTtcblx0XHRuZ2JDb2xsYXBzZS5jb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZDtcblx0XHQvLyB3ZSBzZXQgdGhlIGFuaW1hdGlvbiB0byB0aGUgZGVmYXVsdCBvZiB0aGUgYWNjb3JkaW9uXG5cdFx0bmdiQ29sbGFwc2UuYW5pbWF0aW9uID0gdGhpcy5fYWNjb3JkaW9uLmFuaW1hdGlvbjtcblx0XHQvLyBldmVudCBmb3J3YXJkaW5nIGZyb20gJ25nYkNvbGxhcHNlJyB0byAnbmdiQWNjb3JkaW9uJ1xuXHRcdHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcblx0XHRcdG5nYkNvbGxhcHNlLmhpZGRlbi5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHQvLyB3aGVuIHRoZSBhbmltYXRpb24gZmluaXNoZXMgd2UgY2FuIHJlbW92ZSB0aGUgdGVtcGxhdGUgZnJvbSBET01cblx0XHRcdFx0dGhpcy5hbmltYXRpbmdCb2R5Q29sbGFwc2UgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5oaWRkZW4uZW1pdCgpO1xuXHRcdFx0XHR0aGlzLl9hY2NvcmRpb24uaGlkZGVuLmVtaXQodGhpcy5pZCk7XG5cdFx0XHR9KSxcblx0XHRcdG5nYkNvbGxhcHNlLnNob3duLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2hvd24uZW1pdCgpO1xuXHRcdFx0XHR0aGlzLl9hY2NvcmRpb24uc2hvd24uZW1pdCh0aGlzLmlkKTtcblx0XHRcdH0pLFxuXHRcdCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG5cdH1cblxuXHQvKipcblx0ICogVG9nZ2xlcyBhbiBhY2NvcmRpb24gaXRlbS5cblx0ICovXG5cdHRvZ2dsZSgpIHtcblx0XHR0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFuIGFjY29yZGlvbiBpdGVtLlxuXHQgKi9cblx0ZXhwYW5kKCkge1xuXHRcdHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGFuIGFjY29yZGlvbiBpdGVtLlxuXHQgKi9cblx0Y29sbGFwc2UoKSB7XG5cdFx0dGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuXHR9XG59XG5cbi8qKlxuICogQWNjb3JkaW9uIGlzIGEgc3RhY2sgb2YgY2FyZHMgdGhhdCBoYXZlIGEgaGVhZGVyIGFuZCBjb2xsYXBzaWJsZSBib2R5LlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGEgY29udGFpbmVyIGZvciB0aGVzZSBpdGVtcyBhbmQgcHJvdmlkZXMgYW4gQVBJIHRvIGhhbmRsZSB0aGVtLlxuICpcbiAqIEBzaW5jZSAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYkFjY29yZGlvbl0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRleHBvcnRBczogJ25nYkFjY29yZGlvbicsXG5cdGhvc3Q6IHsgJ1tjbGFzcy5hY2NvcmRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbkRpcmVjdGl2ZSB7XG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiQWNjb3JkaW9uSXRlbSwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgcHJpdmF0ZSBfaXRlbXM/OiBRdWVyeUxpc3Q8TmdiQWNjb3JkaW9uSXRlbT47XG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIGFjY29yZGlvbiB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKi9cblx0QElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIG9ubHkgb25lIGl0ZW0gYXQgdGhlIHRpbWUgY2FuIHN0YXkgb3Blbi5cblx0ICovXG5cdEBJbnB1dCgpIGNsb3NlT3RoZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBjb250ZW50IG9mIHRoZSBhY2NvcmRpb24gaXRlbXMgYm9keSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NLiBJdCB3aWxsIGJlIGp1c3QgaGlkZGVuIG90aGVyd2lzZS5cblx0ICpcblx0ICogVGhpcyBwcm9wZXJ0eSBjYW4gYmUgb3ZlcndyaXR0ZW4gYXQgdGhlIFtgTmdiQWNjb3JkaW9uSXRlbWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYkFjY29yZGlvbkl0ZW0pIGxldmVsXG5cdCAqL1xuXHRASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBleHBhbmRpbmcgYW5pbWF0aW9uIGlzIGZpbmlzaGVkLiBUaGUgcGF5bG9hZCBpcyB0aGUgaWQgb2Ygc2hvd24gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb2xsYXBzaW5nIGFuaW1hdGlvbiBpcyBmaW5pc2hlZCBhbmQgYmVmb3JlIHRoZSBjb250ZW50IGlzIHJlbW92ZWQgZnJvbSBET00uXG5cdCAqIFRoZSBwYXlsb2FkIGlzIHRoZSBpZCBvZiBoaWRkZW4gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblx0cHJpdmF0ZSBfYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24gPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFjY29yZGlvbkNvbmZpZykge1xuXHRcdHRoaXMuYW5pbWF0aW9uID0gY29uZmlnLmFuaW1hdGlvbjtcblx0XHR0aGlzLmNsb3NlT3RoZXJzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgYW4gaXRlbSB3aXRoIHRoZSBnaXZlbiBpZC5cblx0ICpcblx0ICogSXQgd2lsbCB0b2dnbGUgYW4gaXRlbSwgZXZlbiBpZiBpdCBpcyBkaXNhYmxlZC5cblx0ICpcblx0ICogQHBhcmFtIGl0ZW1JZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gdG9nZ2xlLlxuXHQgKi9cblx0dG9nZ2xlKGl0ZW1JZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fZ2V0SXRlbShpdGVtSWQpPy50b2dnbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFuIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gaWQuXG5cdCAqXG5cdCAqIElmIGBjbG9zZU90aGVyc2AgaXMgYHRydWVgLCBpdCB3aWxsIGNvbGxhcHNlIG90aGVyIHBhbmVscy5cblx0ICpcblx0ICogQHBhcmFtIGl0ZW1JZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gZXhwYW5kLlxuXHQgKi9cblx0ZXhwYW5kKGl0ZW1JZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fZ2V0SXRlbShpdGVtSWQpPy5leHBhbmQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFsbCBpdGVtcy5cblx0ICpcblx0ICogSWYgYGNsb3NlT3RoZXJzYCBpcyBgdHJ1ZWAgYW5kIGFsbCBpdGVtcyBhcmUgY2xvc2VkLCBpdCB3aWxsIG9wZW4gdGhlIGZpcnN0IG9uZS4gT3RoZXJ3aXNlLCBpdCB3aWxsIGtlZXAgdGhlIG9wZW5lZCBvbmUuXG5cdCAqL1xuXHRleHBhbmRBbGwoKSB7XG5cdFx0aWYgKHRoaXMuX2l0ZW1zKSB7XG5cdFx0XHRpZiAodGhpcy5jbG9zZU90aGVycykge1xuXHRcdFx0XHQvLyB3ZSBjaGVjayBpZiB0aGVyZSBpcyBhbiBpdGVtIG9wZW4gYW5kIGlmIGl0IGlzIG5vdCB3ZSBjYW4gZXhwYW5kIHRoZSBmaXJzdCBpdGVtXG5cdFx0XHRcdC8vIChvdGhlcndpc2Ugd2UgdG9nZ2xlIG5vdGhpbmcpXG5cdFx0XHRcdGlmICghdGhpcy5faXRlbXMuZmluZCgoaXRlbSkgPT4gIWl0ZW0uY29sbGFwc2VkKSkge1xuXHRcdFx0XHRcdHRoaXMuX2l0ZW1zLmZpcnN0LmV4cGFuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmV4cGFuZCgpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGFuIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gaWQuXG5cdCAqXG5cdCAqIEhhcyBubyBlZmZlY3QgaWYgdGhlIGBpdGVtSWRgIGRvZXMgbm90IGNvcnJlc3BvbmQgdG8gYW55IGl0ZW0uXG5cdCAqXG5cdCAqIEBwYXJhbSBpdGVtSWQgVGhlIGlkIG9mIHRoZSBpdGVtIHRvIGNvbGxhcHNlLlxuXHQgKi9cblx0Y29sbGFwc2UoaXRlbUlkOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9nZXRJdGVtKGl0ZW1JZCk/LmNvbGxhcHNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGFsbCBpdGVtcy5cblx0ICovXG5cdGNvbGxhcHNlQWxsKCkge1xuXHRcdHRoaXMuX2l0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNvbGxhcHNlKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhbiBpdGVtIHdpdGggdGhlIGdpdmVuIGlkIGlzIGV4cGFuZGVkLlxuXHQgKlxuXHQgKiBJZiB0aGUgYGl0ZW1JZGAgZG9lcyBub3QgY29ycmVzcG9uZCB0byBhbnkgaXRlbSwgaXQgcmV0dXJucyBgZmFsc2VgLlxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlbUlkIFRoZSBpZCBvZiB0aGUgaXRlbSB0byBjaGVjay5cblx0ICovXG5cdGlzRXhwYW5kZWQoaXRlbUlkOiBzdHJpbmcpIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5fZ2V0SXRlbShpdGVtSWQpO1xuXHRcdHJldHVybiBpdGVtID8gIWl0ZW0uY29sbGFwc2VkIDogZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogSXQgY2hlY2tzLCBpZiB0aGUgaXRlbSBjYW4gYmUgZXhwYW5kZWQgaW4gdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFjY29yZGlvbi5cblx0ICogV2l0aCBgY2xvc2VPdGhlcnNgIHRoZXJlIGNhbiBiZSBvbmx5IG9uZSBleHBhbmRlZCBpdGVtIGF0IGEgdGltZS5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRfZW5zdXJlQ2FuRXhwYW5kKHRvRXhwYW5kOiBOZ2JBY2NvcmRpb25JdGVtKSB7XG5cdFx0aWYgKCF0aGlzLmNsb3NlT3RoZXJzKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBzcGVjaWFsIGNhc2UgZHVyaW5nIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgW2NvbGxhcHNlXT1cImZhbHNlXCIgaW5wdXRzXG5cdFx0Ly8gYHRoaXMuX2l0ZW1zYCBRdWVyeUxpc3QgaXMgbm90IHlldCBpbml0aWFsaXplZCwgYnV0IHdlIG5lZWQgdG8gZW5zdXJlIG9ubHkgb25lIGl0ZW0gY2FuIGJlIGV4cGFuZGVkIGF0IGEgdGltZVxuXHRcdGlmICghdGhpcy5faXRlbXMpIHtcblx0XHRcdGlmICghdGhpcy5fYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGVyZSBpcyBhbiBleHBhbmRlZCBpdGVtLCB3ZSBuZWVkIHRvIGNvbGxhcHNlIGl0IGZpcnN0XG5cdFx0dGhpcy5faXRlbXMuZmluZCgoaXRlbSkgPT4gIWl0ZW0uY29sbGFwc2VkICYmIHRvRXhwYW5kICE9PSBpdGVtKT8uY29sbGFwc2UoKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0SXRlbShpdGVtSWQ6IHN0cmluZyk6IE5nYkFjY29yZGlvbkl0ZW0gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLl9pdGVtcz8uZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaXRlbUlkKTtcblx0fVxufVxuIl19