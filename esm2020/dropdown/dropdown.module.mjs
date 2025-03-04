import { NgModule } from '@angular/core';
import { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from './dropdown';
import * as i0 from "@angular/core";
export { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, 
// eslint-disable-next-line deprecation/deprecation
NgbNavbar, } from './dropdown';
export { NgbDropdownConfig } from './dropdown-config';
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem];
export class NgbDropdownModule {
}
NgbDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgbDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownModule, imports: [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem], exports: [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem] });
NgbDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NgbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_DROPDOWN_DIRECTIVES,
                    exports: NGB_DROPDOWN_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFFakgsT0FBTyxFQUNOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlO0FBQ2YsbURBQW1EO0FBQ25ELFNBQVMsR0FDVCxNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RCxNQUFNLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztBQU10SCxNQUFNLE9BQU8saUJBQWlCOzsrR0FBakIsaUJBQWlCO2dIQUFqQixpQkFBaUIsWUFORyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFBbkYsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlO2dIQU12RyxpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFKN0IsUUFBUTttQkFBQztvQkFDVCxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxPQUFPLEVBQUUsdUJBQXVCO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbSB9IGZyb20gJy4vZHJvcGRvd24nO1xuXG5leHBvcnQge1xuXHROZ2JEcm9wZG93bixcblx0TmdiRHJvcGRvd25BbmNob3IsXG5cdE5nYkRyb3Bkb3duVG9nZ2xlLFxuXHROZ2JEcm9wZG93bk1lbnUsXG5cdE5nYkRyb3Bkb3duSXRlbSxcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG5cdE5nYk5hdmJhcixcbn0gZnJvbSAnLi9kcm9wZG93bic7XG5leHBvcnQgeyBOZ2JEcm9wZG93bkNvbmZpZyB9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcblxuY29uc3QgTkdCX0RST1BET1dOX0RJUkVDVElWRVMgPSBbTmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duQW5jaG9yLCBOZ2JEcm9wZG93blRvZ2dsZSwgTmdiRHJvcGRvd25NZW51LCBOZ2JEcm9wZG93bkl0ZW1dO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBOR0JfRFJPUERPV05fRElSRUNUSVZFUyxcblx0ZXhwb3J0czogTkdCX0RST1BET1dOX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTW9kdWxlIHt9XG4iXX0=