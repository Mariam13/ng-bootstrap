/* eslint-disable deprecation/deprecation */
import { NgModule } from '@angular/core';
import { NgbAccordion, NgbPanel, NgbPanelContent, NgbPanelHeader, NgbPanelTitle, NgbPanelToggle } from './accordion';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse, NgbAccordionButton, } from './accordion.directive';
import * as i0 from "@angular/core";
export { NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelHeader, NgbPanelToggle, } from './accordion';
export { NgbAccordionButton, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse, } from './accordion.directive';
export { NgbAccordionConfig } from './accordion-config';
const NGB_ACCORDION_DIRECTIVES = [
    NgbAccordion,
    NgbPanel,
    NgbPanelTitle,
    NgbPanelContent,
    NgbPanelHeader,
    NgbPanelToggle,
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
];
export class NgbAccordionModule {
}
NgbAccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgbAccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionModule, imports: [NgbAccordion,
        NgbPanel,
        NgbPanelTitle,
        NgbPanelContent,
        NgbPanelHeader,
        NgbPanelToggle,
        NgbAccordionButton,
        NgbAccordionDirective,
        NgbAccordionItem,
        NgbAccordionHeader,
        NgbAccordionToggle,
        NgbAccordionBody,
        NgbAccordionCollapse], exports: [NgbAccordion,
        NgbPanel,
        NgbPanelTitle,
        NgbPanelContent,
        NgbPanelHeader,
        NgbPanelToggle,
        NgbAccordionButton,
        NgbAccordionDirective,
        NgbAccordionItem,
        NgbAccordionHeader,
        NgbAccordionToggle,
        NgbAccordionBody,
        NgbAccordionCollapse] });
NgbAccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionModule, imports: [NgbAccordion] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_ACCORDION_DIRECTIVES,
                    exports: NGB_ACCORDION_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0Q0FBNEM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckgsT0FBTyxFQUNOLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLGtCQUFrQixHQUNsQixNQUFNLHVCQUF1QixDQUFDOztBQUUvQixPQUFPLEVBQ04sWUFBWSxFQUNaLFFBQVEsRUFDUixhQUFhLEVBQ2IsZUFBZSxFQUVmLGNBQWMsRUFFZCxjQUFjLEdBQ2QsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUNOLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLG9CQUFvQixHQUNwQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhELE1BQU0sd0JBQXdCLEdBQUc7SUFDaEMsWUFBWTtJQUNaLFFBQVE7SUFDUixhQUFhO0lBQ2IsZUFBZTtJQUNmLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsb0JBQW9CO0NBQ3BCLENBQUM7QUFNRixNQUFNLE9BQU8sa0JBQWtCOztnSEFBbEIsa0JBQWtCO2lIQUFsQixrQkFBa0IsWUFuQjlCLFlBQVk7UUFDWixRQUFRO1FBQ1IsYUFBYTtRQUNiLGVBQWU7UUFDZixjQUFjO1FBQ2QsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLG9CQUFvQixhQVpwQixZQUFZO1FBQ1osUUFBUTtRQUNSLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYztRQUNkLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixvQkFBb0I7aUhBT1Isa0JBQWtCLFlBbkI5QixZQUFZOzRGQW1CQSxrQkFBa0I7a0JBSjlCLFFBQVE7bUJBQUM7b0JBQ1QsT0FBTyxFQUFFLHdCQUF3QjtvQkFDakMsT0FBTyxFQUFFLHdCQUF3QjtpQkFDakMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvbiAqL1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdiQWNjb3JkaW9uLCBOZ2JQYW5lbCwgTmdiUGFuZWxDb250ZW50LCBOZ2JQYW5lbEhlYWRlciwgTmdiUGFuZWxUaXRsZSwgTmdiUGFuZWxUb2dnbGUgfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQge1xuXHROZ2JBY2NvcmRpb25EaXJlY3RpdmUsXG5cdE5nYkFjY29yZGlvbkl0ZW0sXG5cdE5nYkFjY29yZGlvbkhlYWRlcixcblx0TmdiQWNjb3JkaW9uVG9nZ2xlLFxuXHROZ2JBY2NvcmRpb25Cb2R5LFxuXHROZ2JBY2NvcmRpb25Db2xsYXBzZSxcblx0TmdiQWNjb3JkaW9uQnV0dG9uLFxufSBmcm9tICcuL2FjY29yZGlvbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQge1xuXHROZ2JBY2NvcmRpb24sXG5cdE5nYlBhbmVsLFxuXHROZ2JQYW5lbFRpdGxlLFxuXHROZ2JQYW5lbENvbnRlbnQsXG5cdE5nYlBhbmVsQ2hhbmdlRXZlbnQsXG5cdE5nYlBhbmVsSGVhZGVyLFxuXHROZ2JQYW5lbEhlYWRlckNvbnRleHQsXG5cdE5nYlBhbmVsVG9nZ2xlLFxufSBmcm9tICcuL2FjY29yZGlvbic7XG5cbmV4cG9ydCB7XG5cdE5nYkFjY29yZGlvbkJ1dHRvbixcblx0TmdiQWNjb3JkaW9uRGlyZWN0aXZlLFxuXHROZ2JBY2NvcmRpb25JdGVtLFxuXHROZ2JBY2NvcmRpb25IZWFkZXIsXG5cdE5nYkFjY29yZGlvblRvZ2dsZSxcblx0TmdiQWNjb3JkaW9uQm9keSxcblx0TmdiQWNjb3JkaW9uQ29sbGFwc2UsXG59IGZyb20gJy4vYWNjb3JkaW9uLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBOZ2JBY2NvcmRpb25Db25maWcgfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xuXG5jb25zdCBOR0JfQUNDT1JESU9OX0RJUkVDVElWRVMgPSBbXG5cdE5nYkFjY29yZGlvbixcblx0TmdiUGFuZWwsXG5cdE5nYlBhbmVsVGl0bGUsXG5cdE5nYlBhbmVsQ29udGVudCxcblx0TmdiUGFuZWxIZWFkZXIsXG5cdE5nYlBhbmVsVG9nZ2xlLFxuXHROZ2JBY2NvcmRpb25CdXR0b24sXG5cdE5nYkFjY29yZGlvbkRpcmVjdGl2ZSxcblx0TmdiQWNjb3JkaW9uSXRlbSxcblx0TmdiQWNjb3JkaW9uSGVhZGVyLFxuXHROZ2JBY2NvcmRpb25Ub2dnbGUsXG5cdE5nYkFjY29yZGlvbkJvZHksXG5cdE5nYkFjY29yZGlvbkNvbGxhcHNlLFxuXTtcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTLFxuXHRleHBvcnRzOiBOR0JfQUNDT1JESU9OX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbk1vZHVsZSB7fVxuIl19