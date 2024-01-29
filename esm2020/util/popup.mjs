import { TemplateRef, } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { ngbRunTransition } from './transition/ngbTransition';
export class ContentRef {
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
export class PopupService {
    constructor(_componentType, _injector, _viewContainerRef, _renderer, _ngZone, _applicationRef) {
        this._componentType = _componentType;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._applicationRef = _applicationRef;
        this._windowRef = null;
        this._contentRef = null;
    }
    open(content, templateContext, animation = false) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, templateContext);
            this._windowRef = this._viewContainerRef.createComponent(this._componentType, {
                injector: this._injector,
                projectableNodes: this._contentRef.nodes,
            });
        }
        const { nativeElement } = this._windowRef.location;
        const transition$ = this._ngZone.onStable.pipe(take(1), mergeMap(() => ngbRunTransition(this._ngZone, nativeElement, ({ classList }) => classList.add('show'), {
            animation,
            runningTransition: 'continue',
        })));
        return { windowRef: this._windowRef, transition$ };
    }
    close(animation = false) {
        if (!this._windowRef) {
            return of(undefined);
        }
        return ngbRunTransition(this._ngZone, this._windowRef.location.nativeElement, ({ classList }) => classList.remove('show'), { animation, runningTransition: 'stop' }).pipe(tap(() => {
            if (this._windowRef) {
                // this is required because of the container='body' option
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
                this._windowRef = null;
            }
            if (this._contentRef?.viewRef) {
                this._applicationRef.detachView(this._contentRef.viewRef);
                this._contentRef.viewRef.destroy();
                this._contentRef = null;
            }
        }));
    }
    _getContentRef(content, templateContext) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(templateContext);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBTU4sV0FBVyxHQUlYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFOUQsTUFBTSxPQUFPLFVBQVU7SUFDdEIsWUFBbUIsS0FBZSxFQUFTLE9BQWlCLEVBQVMsWUFBZ0M7UUFBbEYsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFBRyxDQUFDO0NBQ3pHO0FBRUQsTUFBTSxPQUFPLFlBQVk7SUFJeEIsWUFDUyxjQUF5QixFQUN6QixTQUFtQixFQUNuQixpQkFBbUMsRUFDbkMsU0FBb0IsRUFDcEIsT0FBZSxFQUNmLGVBQStCO1FBTC9CLG1CQUFjLEdBQWQsY0FBYyxDQUFXO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFUaEMsZUFBVSxHQUEyQixJQUFJLENBQUM7UUFDMUMsZ0JBQVcsR0FBc0IsSUFBSSxDQUFDO0lBUzNDLENBQUM7SUFFSixJQUFJLENBQ0gsT0FBbUMsRUFDbkMsZUFBcUIsRUFDckIsU0FBUyxHQUFHLEtBQUs7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJ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QUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRTtJQUNGLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDb21wb25lbnRSZWYsXG5cdEluamVjdG9yLFxuXHROZ1pvbmUsXG5cdFJlbmRlcmVyMixcblx0VGVtcGxhdGVSZWYsXG5cdFR5cGUsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdFZpZXdSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbmdiUnVuVHJhbnNpdGlvbiB9IGZyb20gJy4vdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRSZWYge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IE5vZGVbXVtdLCBwdWJsaWMgdmlld1JlZj86IFZpZXdSZWYsIHB1YmxpYyBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55Pikge31cbn1cblxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZTxUPiB7XG5cdHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPFQ+IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWYgfCBudWxsID0gbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9jb21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG5cdFx0cHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0XHRwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcblx0XHRwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG5cdCkge31cblxuXHRvcGVuKFxuXHRcdGNvbnRlbnQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LFxuXHRcdHRlbXBsYXRlQ29udGV4dD86IGFueSxcblx0XHRhbmltYXRpb24gPSBmYWxzZSxcblx0KTogeyB3aW5kb3dSZWY6IENvbXBvbmVudFJlZjxUPjsgdHJhbnNpdGlvbiQ6IE9ic2VydmFibGU8dm9pZD4gfSB7XG5cdFx0aWYgKCF0aGlzLl93aW5kb3dSZWYpIHtcblx0XHRcdHRoaXMuX2NvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKGNvbnRlbnQsIHRlbXBsYXRlQ29udGV4dCk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudCh0aGlzLl9jb21wb25lbnRUeXBlLCB7XG5cdFx0XHRcdGluamVjdG9yOiB0aGlzLl9pbmplY3Rvcixcblx0XHRcdFx0cHJvamVjdGFibGVOb2RlczogdGhpcy5fY29udGVudFJlZi5ub2Rlcyxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uO1xuXHRcdGNvbnN0IHRyYW5zaXRpb24kID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUoXG5cdFx0XHR0YWtlKDEpLFxuXHRcdFx0bWVyZ2VNYXAoKCkgPT5cblx0XHRcdFx0bmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIG5hdGl2ZUVsZW1lbnQsICh7IGNsYXNzTGlzdCB9KSA9PiBjbGFzc0xpc3QuYWRkKCdzaG93JyksIHtcblx0XHRcdFx0XHRhbmltYXRpb24sXG5cdFx0XHRcdFx0cnVubmluZ1RyYW5zaXRpb246ICdjb250aW51ZScsXG5cdFx0XHRcdH0pLFxuXHRcdFx0KSxcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHsgd2luZG93UmVmOiB0aGlzLl93aW5kb3dSZWYsIHRyYW5zaXRpb24kIH07XG5cdH1cblxuXHRjbG9zZShhbmltYXRpb24gPSBmYWxzZSk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdGlmICghdGhpcy5fd2luZG93UmVmKSB7XG5cdFx0XHRyZXR1cm4gb2YodW5kZWZpbmVkKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmdiUnVuVHJhbnNpdGlvbihcblx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0KHsgY2xhc3NMaXN0IH0pID0+IGNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSxcblx0XHRcdHsgYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ3N0b3AnIH0sXG5cdFx0KS5waXBlKFxuXHRcdFx0dGFwKCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX3dpbmRvd1JlZikge1xuXHRcdFx0XHRcdC8vIHRoaXMgaXMgcmVxdWlyZWQgYmVjYXVzZSBvZiB0aGUgY29udGFpbmVyPSdib2R5JyBvcHRpb25cblx0XHRcdFx0XHR0aGlzLl92aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fd2luZG93UmVmLmhvc3RWaWV3KSk7XG5cdFx0XHRcdFx0dGhpcy5fd2luZG93UmVmID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fY29udGVudFJlZj8udmlld1JlZikge1xuXHRcdFx0XHRcdHRoaXMuX2FwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcodGhpcy5fY29udGVudFJlZi52aWV3UmVmKTtcblx0XHRcdFx0XHR0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xuXHRcdFx0XHRcdHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0Q29udGVudFJlZihjb250ZW50Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiwgdGVtcGxhdGVDb250ZXh0PzogYW55KTogQ29udGVudFJlZiB7XG5cdFx0aWYgKCFjb250ZW50KSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xuXHRcdH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG5cdFx0XHRjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVDb250ZXh0KTtcblx0XHRcdHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XG5cdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbW3RoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoYCR7Y29udGVudH1gKV1dKTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==