import { DOCUMENT } from '@angular/common';
import { createComponent, EnvironmentInjector, EventEmitter, Inject, Injectable, Injector, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../util/scrollbar";
export class NgbModalStack {
    constructor(_applicationRef, _injector, _environmentInjector, _document, _scrollBar, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._environmentInjector = _environmentInjector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._scrollBarRestoreFn = null;
        this._modalRefs = [];
        this._windowCmpts = [];
        this._activeInstances = new EventEmitter();
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        });
    }
    _restoreScrollBar() {
        const scrollBarRestoreFn = this._scrollBarRestoreFn;
        if (scrollBarRestoreFn) {
            this._scrollBarRestoreFn = null;
            scrollBarRestoreFn();
        }
    }
    _hideScrollBar() {
        if (!this._scrollBarRestoreFn) {
            this._scrollBarRestoreFn = this._scrollBar.hide();
        }
    }
    open(contentInjector, content, options) {
        const containerEl = options.container instanceof HTMLElement
            ? options.container
            : isDefined(options.container)
                ? this._document.querySelector(options.container)
                : this._document.body;
        const renderer = this._rendererFactory.createRenderer(null, null);
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        this._hideScrollBar();
        const activeModal = new NgbActiveModal();
        contentInjector = options.injector || contentInjector;
        const environmentInjector = contentInjector.get(EnvironmentInjector, null) || this._environmentInjector;
        const contentRef = this._getContentRef(contentInjector, environmentInjector, content, activeModal, options);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : undefined;
        let windowCmptRef = this._attachWindowComponent(containerEl, contentRef.nodes);
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        // We have to cleanup DOM after the last modal when BOTH 'hidden' was emitted and 'result' promise was resolved:
        // - with animations OFF, 'hidden' emits synchronously, then 'result' is resolved asynchronously
        // - with animations ON, 'result' is resolved asynchronously, then 'hidden' emits asynchronously
        ngbModalRef.hidden.pipe(take(1)).subscribe(() => Promise.resolve(true).then(() => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._restoreScrollBar();
                this._revertAriaHidden();
            }
        }));
        activeModal.close = (result) => {
            ngbModalRef.close(result);
        };
        activeModal.dismiss = (reason) => {
            ngbModalRef.dismiss(reason);
        };
        activeModal.update = (options) => {
            ngbModalRef.update(options);
        };
        ngbModalRef.update(options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            backdropCmptRef.changeDetectorRef.detectChanges();
        }
        windowCmptRef.changeDetectorRef.detectChanges();
        return ngbModalRef;
    }
    get activeInstances() {
        return this._activeInstances;
    }
    dismissAll(reason) {
        this._modalRefs.forEach((ngbModalRef) => ngbModalRef.dismiss(reason));
    }
    hasOpenModals() {
        return this._modalRefs.length > 0;
    }
    _attachBackdrop(containerEl) {
        let backdropCmptRef = createComponent(NgbModalBackdrop, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
        });
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(containerEl, projectableNodes) {
        let windowCmptRef = createComponent(NgbModalWindow, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
            projectableNodes,
        });
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    _getContentRef(contentInjector, environmentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(contentInjector, environmentInjector, content, activeModal, options);
        }
    }
    _createFromTemplateRef(templateRef, activeModal) {
        const context = {
            $implicit: activeModal,
            close(result) {
                activeModal.close(result);
            },
            dismiss(reason) {
                activeModal.dismiss(reason);
            },
        };
        const viewRef = templateRef.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    _createFromString(content) {
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    _createFromComponent(contentInjector, environmentInjector, componentType, context, options) {
        const elementInjector = Injector.create({
            providers: [{ provide: NgbActiveModal, useValue: context }],
            parent: contentInjector,
        });
        const componentRef = createComponent(componentType, {
            environmentInjector,
            elementInjector,
        });
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            componentNativeEl.classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _setAriaHidden(element) {
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((sibling) => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            });
            this._setAriaHidden(parent);
        }
    }
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        });
        this._ariaHiddenValues.clear();
    }
    _registerModalRef(ngbModalRef) {
        const unregisterModalRef = () => {
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
                this._activeInstances.emit(this._modalRefs);
            }
        };
        this._modalRefs.push(ngbModalRef);
        this._activeInstances.emit(this._modalRefs);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
}
NgbModalStack.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbModalStack, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }, { token: i0.EnvironmentInjector }, { token: DOCUMENT }, { token: i1.ScrollBar }, { token: i0.RendererFactory2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
NgbModalStack.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbModalStack, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbModalStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: i0.Injector }, { type: i0.EnvironmentInjector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.ScrollBar }, { type: i0.RendererFactory2 }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFHUixXQUFXLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFHdEMsTUFBTSxPQUFPLGFBQWE7SUFRekIsWUFDUyxlQUErQixFQUMvQixTQUFtQixFQUNuQixvQkFBeUMsRUFDdkIsU0FBYyxFQUNoQyxVQUFxQixFQUNyQixnQkFBa0MsRUFDbEMsT0FBZTtRQU5mLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLHFCQUFnQixHQUFoQixn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QUFDLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7MkdBNVBXLGFBQWEsMkdBWWhCLFFBQVE7K0dBWkwsYUFBYSxjQURBLE1BQU07NEZBQ25CLGFBQWE7a0JBRHpCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFhL0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcblx0QXBwbGljYXRpb25SZWYsXG5cdENvbXBvbmVudFJlZixcblx0Y3JlYXRlQ29tcG9uZW50LFxuXHRFbnZpcm9ubWVudEluamVjdG9yLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdCxcblx0SW5qZWN0YWJsZSxcblx0SW5qZWN0b3IsXG5cdE5nWm9uZSxcblx0UmVuZGVyZXJGYWN0b3J5Mixcblx0VGVtcGxhdGVSZWYsXG5cdFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBuZ2JGb2N1c1RyYXAgfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHsgQ29udGVudFJlZiB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgU2Nyb2xsQmFyIH0gZnJvbSAnLi4vdXRpbC9zY3JvbGxiYXInO1xuaW1wb3J0IHsgaXNEZWZpbmVkLCBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JNb2RhbEJhY2tkcm9wIH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQgeyBOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsVXBkYXRhYmxlT3B0aW9ucyB9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsLCBOZ2JNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7IE5nYk1vZGFsV2luZG93IH0gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFN0YWNrIHtcblx0cHJpdmF0ZSBfYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRwcml2YXRlIF9hcmlhSGlkZGVuVmFsdWVzOiBNYXA8RWxlbWVudCwgc3RyaW5nIHwgbnVsbD4gPSBuZXcgTWFwKCk7XG5cdHByaXZhdGUgX3Njcm9sbEJhclJlc3RvcmVGbjogbnVsbCB8ICgoKSA9PiB2b2lkKSA9IG51bGw7XG5cdHByaXZhdGUgX21vZGFsUmVmczogTmdiTW9kYWxSZWZbXSA9IFtdO1xuXHRwcml2YXRlIF93aW5kb3dDbXB0czogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PltdID0gW107XG5cdHByaXZhdGUgX2FjdGl2ZUluc3RhbmNlczogRXZlbnRFbWl0dGVyPE5nYk1vZGFsUmVmW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcblx0XHRwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0cHJpdmF0ZSBfZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3Rvcixcblx0XHRASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuXHRcdHByaXZhdGUgX3Njcm9sbEJhcjogU2Nyb2xsQmFyLFxuXHRcdHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mixcblx0XHRwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcblx0KSB7XG5cdFx0Ly8gVHJhcCBmb2N1cyBvbiBhY3RpdmUgV2luZG93Q21wdFxuXHRcdHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fd2luZG93Q21wdHMubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZVdpbmRvd0NtcHQgPSB0aGlzLl93aW5kb3dDbXB0c1t0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGggLSAxXTtcblx0XHRcdFx0bmdiRm9jdXNUcmFwKHRoaXMuX25nWm9uZSwgYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCk7XG5cdFx0XHRcdHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcblx0XHRcdFx0dGhpcy5fc2V0QXJpYUhpZGRlbihhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfcmVzdG9yZVNjcm9sbEJhcigpIHtcblx0XHRjb25zdCBzY3JvbGxCYXJSZXN0b3JlRm4gPSB0aGlzLl9zY3JvbGxCYXJSZXN0b3JlRm47XG5cdFx0aWYgKHNjcm9sbEJhclJlc3RvcmVGbikge1xuXHRcdFx0dGhpcy5fc2Nyb2xsQmFyUmVzdG9yZUZuID0gbnVsbDtcblx0XHRcdHNjcm9sbEJhclJlc3RvcmVGbigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2hpZGVTY3JvbGxCYXIoKSB7XG5cdFx0aWYgKCF0aGlzLl9zY3JvbGxCYXJSZXN0b3JlRm4pIHtcblx0XHRcdHRoaXMuX3Njcm9sbEJhclJlc3RvcmVGbiA9IHRoaXMuX3Njcm9sbEJhci5oaWRlKCk7XG5cdFx0fVxuXHR9XG5cblx0b3Blbihjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyk6IE5nYk1vZGFsUmVmIHtcblx0XHRjb25zdCBjb250YWluZXJFbCA9XG5cdFx0XHRvcHRpb25zLmNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG5cdFx0XHRcdD8gb3B0aW9ucy5jb250YWluZXJcblx0XHRcdFx0OiBpc0RlZmluZWQob3B0aW9ucy5jb250YWluZXIpXG5cdFx0XHRcdD8gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcilcblx0XHRcdFx0OiB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXHRcdGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuXG5cdFx0aWYgKCFjb250YWluZXJFbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcblx0XHR9XG5cblx0XHR0aGlzLl9oaWRlU2Nyb2xsQmFyKCk7XG5cblx0XHRjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xuXG5cdFx0Y29udGVudEluamVjdG9yID0gb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3I7XG5cdFx0Y29uc3QgZW52aXJvbm1lbnRJbmplY3RvciA9IGNvbnRlbnRJbmplY3Rvci5nZXQoRW52aXJvbm1lbnRJbmplY3RvciwgbnVsbCkgfHwgdGhpcy5fZW52aXJvbm1lbnRJbmplY3Rvcjtcblx0XHRjb25zdCBjb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihjb250ZW50SW5qZWN0b3IsIGVudmlyb25tZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsLCBvcHRpb25zKTtcblxuXHRcdGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiB8IHVuZGVmaW5lZCA9XG5cdFx0XHRvcHRpb25zLmJhY2tkcm9wICE9PSBmYWxzZSA/IHRoaXMuX2F0dGFjaEJhY2tkcm9wKGNvbnRhaW5lckVsKSA6IHVuZGVmaW5lZDtcblx0XHRsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChjb250YWluZXJFbCwgY29udGVudFJlZi5ub2Rlcyk7XG5cdFx0bGV0IG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZiA9IG5ldyBOZ2JNb2RhbFJlZih3aW5kb3dDbXB0UmVmLCBjb250ZW50UmVmLCBiYWNrZHJvcENtcHRSZWYsIG9wdGlvbnMuYmVmb3JlRGlzbWlzcyk7XG5cblx0XHR0aGlzLl9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmKTtcblx0XHR0aGlzLl9yZWdpc3RlcldpbmRvd0NtcHQod2luZG93Q21wdFJlZik7XG5cblx0XHQvLyBXZSBoYXZlIHRvIGNsZWFudXAgRE9NIGFmdGVyIHRoZSBsYXN0IG1vZGFsIHdoZW4gQk9USCAnaGlkZGVuJyB3YXMgZW1pdHRlZCBhbmQgJ3Jlc3VsdCcgcHJvbWlzZSB3YXMgcmVzb2x2ZWQ6XG5cdFx0Ly8gLSB3aXRoIGFuaW1hdGlvbnMgT0ZGLCAnaGlkZGVuJyBlbWl0cyBzeW5jaHJvbm91c2x5LCB0aGVuICdyZXN1bHQnIGlzIHJlc29sdmVkIGFzeW5jaHJvbm91c2x5XG5cdFx0Ly8gLSB3aXRoIGFuaW1hdGlvbnMgT04sICdyZXN1bHQnIGlzIHJlc29sdmVkIGFzeW5jaHJvbm91c2x5LCB0aGVuICdoaWRkZW4nIGVtaXRzIGFzeW5jaHJvbm91c2x5XG5cdFx0bmdiTW9kYWxSZWYuaGlkZGVuLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+XG5cdFx0XHRQcm9taXNlLnJlc29sdmUodHJ1ZSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmICghdGhpcy5fbW9kYWxSZWZzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG5cdFx0XHRcdFx0dGhpcy5fcmVzdG9yZVNjcm9sbEJhcigpO1xuXHRcdFx0XHRcdHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSksXG5cdFx0KTtcblxuXHRcdGFjdGl2ZU1vZGFsLmNsb3NlID0gKHJlc3VsdDogYW55KSA9PiB7XG5cdFx0XHRuZ2JNb2RhbFJlZi5jbG9zZShyZXN1bHQpO1xuXHRcdH07XG5cdFx0YWN0aXZlTW9kYWwuZGlzbWlzcyA9IChyZWFzb246IGFueSkgPT4ge1xuXHRcdFx0bmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pO1xuXHRcdH07XG5cblx0XHRhY3RpdmVNb2RhbC51cGRhdGUgPSAob3B0aW9uczogTmdiTW9kYWxVcGRhdGFibGVPcHRpb25zKSA9PiB7XG5cdFx0XHRuZ2JNb2RhbFJlZi51cGRhdGUob3B0aW9ucyk7XG5cdFx0fTtcblxuXHRcdG5nYk1vZGFsUmVmLnVwZGF0ZShvcHRpb25zKTtcblx0XHRpZiAodGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0cmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcblx0XHR9XG5cblx0XHRpZiAoYmFja2Ryb3BDbXB0UmVmICYmIGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xuXHRcdFx0YmFja2Ryb3BDbXB0UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblx0XHR9XG5cdFx0d2luZG93Q21wdFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0cmV0dXJuIG5nYk1vZGFsUmVmO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZUluc3RhbmNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5fYWN0aXZlSW5zdGFuY2VzO1xuXHR9XG5cblx0ZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHtcblx0XHR0aGlzLl9tb2RhbFJlZnMuZm9yRWFjaCgobmdiTW9kYWxSZWYpID0+IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKSk7XG5cdH1cblxuXHRoYXNPcGVuTW9kYWxzKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID4gMDtcblx0fVxuXG5cdHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKGNvbnRhaW5lckVsOiBFbGVtZW50KTogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHtcblx0XHRsZXQgYmFja2Ryb3BDbXB0UmVmID0gY3JlYXRlQ29tcG9uZW50KE5nYk1vZGFsQmFja2Ryb3AsIHtcblx0XHRcdGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuX2FwcGxpY2F0aW9uUmVmLmluamVjdG9yLFxuXHRcdFx0ZWxlbWVudEluamVjdG9yOiB0aGlzLl9pbmplY3Rvcixcblx0XHR9KTtcblx0XHR0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGJhY2tkcm9wQ21wdFJlZi5ob3N0Vmlldyk7XG5cdFx0Y29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdHJldHVybiBiYWNrZHJvcENtcHRSZWY7XG5cdH1cblxuXHRwcml2YXRlIF9hdHRhY2hXaW5kb3dDb21wb25lbnQoY29udGFpbmVyRWw6IEVsZW1lbnQsIHByb2plY3RhYmxlTm9kZXM6IE5vZGVbXVtdKTogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiB7XG5cdFx0bGV0IHdpbmRvd0NtcHRSZWYgPSBjcmVhdGVDb21wb25lbnQoTmdiTW9kYWxXaW5kb3csIHtcblx0XHRcdGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuX2FwcGxpY2F0aW9uUmVmLmluamVjdG9yLFxuXHRcdFx0ZWxlbWVudEluamVjdG9yOiB0aGlzLl9pbmplY3Rvcixcblx0XHRcdHByb2plY3RhYmxlTm9kZXMsXG5cdFx0fSk7XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcblx0XHRjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdHJldHVybiB3aW5kb3dDbXB0UmVmO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0Q29udGVudFJlZihcblx0XHRjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdGVudmlyb25tZW50SW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IsXG5cdFx0Y29udGVudDogVHlwZTxhbnk+IHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyxcblx0XHRhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwsXG5cdFx0b3B0aW9uczogTmdiTW9kYWxPcHRpb25zLFxuXHQpOiBDb250ZW50UmVmIHtcblx0XHRpZiAoIWNvbnRlbnQpIHtcblx0XHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG5cdFx0fSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlTW9kYWwpO1xuXHRcdH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlRnJvbUNvbXBvbmVudChjb250ZW50SW5qZWN0b3IsIGVudmlyb25tZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9jcmVhdGVGcm9tVGVtcGxhdGVSZWYodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuXHRcdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0XHQkaW1wbGljaXQ6IGFjdGl2ZU1vZGFsLFxuXHRcdFx0Y2xvc2UocmVzdWx0KSB7XG5cdFx0XHRcdGFjdGl2ZU1vZGFsLmNsb3NlKHJlc3VsdCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzbWlzcyhyZWFzb24pIHtcblx0XHRcdFx0YWN0aXZlTW9kYWwuZGlzbWlzcyhyZWFzb24pO1xuXHRcdFx0fSxcblx0XHR9O1xuXHRcdGNvbnN0IHZpZXdSZWYgPSB0ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcblx0XHRyZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG5cdH1cblxuXHRwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xuXHRcdGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XG5cdFx0cmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcblx0XHRjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdGVudmlyb25tZW50SW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IsXG5cdFx0Y29tcG9uZW50VHlwZTogVHlwZTxhbnk+LFxuXHRcdGNvbnRleHQ6IE5nYkFjdGl2ZU1vZGFsLFxuXHRcdG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyxcblx0KTogQ29udGVudFJlZiB7XG5cdFx0Y29uc3QgZWxlbWVudEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcblx0XHRcdHByb3ZpZGVyczogW3sgcHJvdmlkZTogTmdiQWN0aXZlTW9kYWwsIHVzZVZhbHVlOiBjb250ZXh0IH1dLFxuXHRcdFx0cGFyZW50OiBjb250ZW50SW5qZWN0b3IsXG5cdFx0fSk7XG5cdFx0Y29uc3QgY29tcG9uZW50UmVmID0gY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudFR5cGUsIHtcblx0XHRcdGVudmlyb25tZW50SW5qZWN0b3IsXG5cdFx0XHRlbGVtZW50SW5qZWN0b3IsXG5cdFx0fSk7XG5cdFx0Y29uc3QgY29tcG9uZW50TmF0aXZlRWwgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcblx0XHRpZiAob3B0aW9ucy5zY3JvbGxhYmxlKSB7XG5cdFx0XHQoY29tcG9uZW50TmF0aXZlRWwgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2NvbXBvbmVudC1ob3N0LXNjcm9sbGFibGUnKTtcblx0XHR9XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXHRcdC8vIEZJWE1FOiB3ZSBzaG91bGQgaGVyZSBnZXQgcmlkIG9mIHRoZSBjb21wb25lbnQgbmF0aXZlRWxlbWVudFxuXHRcdC8vIGFuZCB1c2UgYFtBcnJheS5mcm9tKGNvbXBvbmVudE5hdGl2ZUVsLmNoaWxkTm9kZXMpXWAgaW5zdGVhZCBhbmQgcmVtb3ZlIHRoZSBhYm92ZSBDU1MgY2xhc3MuXG5cdFx0cmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50TmF0aXZlRWxdXSwgY29tcG9uZW50UmVmLmhvc3RWaWV3LCBjb21wb25lbnRSZWYpO1xuXHR9XG5cblx0cHJpdmF0ZSBfc2V0QXJpYUhpZGRlbihlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdGlmIChwYXJlbnQgJiYgZWxlbWVudCAhPT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuXHRcdFx0QXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZvckVhY2goKHNpYmxpbmcpID0+IHtcblx0XHRcdFx0aWYgKHNpYmxpbmcgIT09IGVsZW1lbnQgJiYgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NDUklQVCcpIHtcblx0XHRcdFx0XHR0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLnNldChzaWJsaW5nLCBzaWJsaW5nLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSk7XG5cdFx0XHRcdFx0c2libGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX3NldEFyaWFIaWRkZW4ocGFyZW50KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9yZXZlcnRBcmlhSGlkZGVuKCkge1xuXHRcdHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuZm9yRWFjaCgodmFsdWUsIGVsZW1lbnQpID0+IHtcblx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmNsZWFyKCk7XG5cdH1cblxuXHRwcml2YXRlIF9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZikge1xuXHRcdGNvbnN0IHVucmVnaXN0ZXJNb2RhbFJlZiA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5fbW9kYWxSZWZzLmluZGV4T2YobmdiTW9kYWxSZWYpO1xuXHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0dGhpcy5fbW9kYWxSZWZzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdHRoaXMuX2FjdGl2ZUluc3RhbmNlcy5lbWl0KHRoaXMuX21vZGFsUmVmcyk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLl9tb2RhbFJlZnMucHVzaChuZ2JNb2RhbFJlZik7XG5cdFx0dGhpcy5fYWN0aXZlSW5zdGFuY2VzLmVtaXQodGhpcy5fbW9kYWxSZWZzKTtcblx0XHRuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbih1bnJlZ2lzdGVyTW9kYWxSZWYsIHVucmVnaXN0ZXJNb2RhbFJlZik7XG5cdH1cblxuXHRwcml2YXRlIF9yZWdpc3RlcldpbmRvd0NtcHQobmdiV2luZG93Q21wdDogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93Pikge1xuXHRcdHRoaXMuX3dpbmRvd0NtcHRzLnB1c2gobmdiV2luZG93Q21wdCk7XG5cdFx0dGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xuXG5cdFx0bmdiV2luZG93Q21wdC5vbkRlc3Ryb3koKCkgPT4ge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLl93aW5kb3dDbXB0cy5pbmRleE9mKG5nYldpbmRvd0NtcHQpO1xuXHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0dGhpcy5fd2luZG93Q21wdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0dGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG4iXX0=