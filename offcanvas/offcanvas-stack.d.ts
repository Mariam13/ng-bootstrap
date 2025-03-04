import { ApplicationRef, EventEmitter, Injector, NgZone } from '@angular/core';
import { ScrollBar } from '../util/scrollbar';
import { NgbOffcanvasRef } from './offcanvas-ref';
import { NgbOffcanvasOptions } from './offcanvas-config';
import * as i0 from "@angular/core";
export declare class NgbOffcanvasStack {
    private _applicationRef;
    private _injector;
    private _document;
    private _scrollBar;
    private _ngZone;
    private _activePanelCmptHasChanged;
    private _scrollBarRestoreFn;
    private _backdropAttributes;
    private _offcanvasRef?;
    private _panelAttributes;
    private _panelCmpt?;
    private _activeInstance;
    constructor(_applicationRef: ApplicationRef, _injector: Injector, _document: any, _scrollBar: ScrollBar, _ngZone: NgZone);
    private _restoreScrollBar;
    private _hideScrollBar;
    open(contentInjector: Injector, content: any, options: NgbOffcanvasOptions): NgbOffcanvasRef;
    get activeInstance(): EventEmitter<NgbOffcanvasRef | undefined>;
    dismiss(reason?: any): void;
    hasOpenOffcanvas(): boolean;
    private _attachBackdrop;
    private _attachWindowComponent;
    private _applyPanelOptions;
    private _applyBackdropOptions;
    private _getContentRef;
    private _createFromTemplateRef;
    private _createFromString;
    private _createFromComponent;
    private _registerOffcanvasRef;
    private _registerPanelCmpt;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasStack, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvasStack>;
}
