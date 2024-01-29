export var NavigationEvent;
(function (NavigationEvent) {
    NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
    NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
})(NavigationEvent || (NavigationEvent = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlEQSxNQUFNLENBQU4sSUFBWSxlQUdYO0FBSEQsV0FBWSxlQUFlO0lBQzFCLHFEQUFJLENBQUE7SUFDSixxREFBSSxDQUFBO0FBQ0wsQ0FBQyxFQUhXLGVBQWUsS0FBZixlQUFlLFFBRzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdiRGF0ZSB9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7IERheVRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbldpZHRoIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHR5cGUgTmdiTWFya0Rpc2FibGVkID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9KSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgTmdiRGF5VGVtcGxhdGVEYXRhID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9KSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIERheVZpZXdNb2RlbCA9IHtcblx0ZGF0ZTogTmdiRGF0ZTtcblx0Y29udGV4dDogRGF5VGVtcGxhdGVDb250ZXh0O1xuXHR0YWJpbmRleDogbnVtYmVyO1xuXHRhcmlhTGFiZWw6IHN0cmluZztcblx0aGlkZGVuOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgV2Vla1ZpZXdNb2RlbCA9IHtcblx0bnVtYmVyOiBudW1iZXI7XG5cdGRheXM6IERheVZpZXdNb2RlbFtdO1xuXHRjb2xsYXBzZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBNb250aFZpZXdNb2RlbCA9IHtcblx0Zmlyc3REYXRlOiBOZ2JEYXRlO1xuXHRsYXN0RGF0ZTogTmdiRGF0ZTtcblx0bnVtYmVyOiBudW1iZXI7XG5cdHllYXI6IG51bWJlcjtcblx0d2Vla3M6IFdlZWtWaWV3TW9kZWxbXTtcblx0d2Vla2RheXM6IHN0cmluZ1tdO1xufTtcblxuZXhwb3J0IHR5cGUgRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcblx0ZGF5VGVtcGxhdGVEYXRhOiBOZ2JEYXlUZW1wbGF0ZURhdGEgfCBudWxsO1xuXHRkaXNhYmxlZDogYm9vbGVhbjtcblx0ZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXHRmaXJzdERhdGU6IE5nYkRhdGUgfCBudWxsO1xuXHRmaXJzdERheU9mV2VlazogbnVtYmVyO1xuXHRmb2N1c0RhdGU6IE5nYkRhdGUgfCBudWxsO1xuXHRmb2N1c1Zpc2libGU6IGJvb2xlYW47XG5cdGxhc3REYXRlOiBOZ2JEYXRlIHwgbnVsbDtcblx0bWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQgfCBudWxsO1xuXHRtYXhEYXRlOiBOZ2JEYXRlIHwgbnVsbDtcblx0bWluRGF0ZTogTmdiRGF0ZSB8IG51bGw7XG5cdG1vbnRoczogTW9udGhWaWV3TW9kZWxbXTtcblx0bmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblx0b3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cdHByZXZEaXNhYmxlZDogYm9vbGVhbjtcblx0bmV4dERpc2FibGVkOiBib29sZWFuO1xuXHRzZWxlY3RCb3hlczoge1xuXHRcdHllYXJzOiBudW1iZXJbXTtcblx0XHRtb250aHM6IG51bWJlcltdO1xuXHR9O1xuXHRzZWxlY3RlZERhdGU6IE5nYkRhdGUgfCBudWxsO1xuXHR3ZWVrZGF5V2lkdGg6IFRyYW5zbGF0aW9uV2lkdGg7XG5cdHdlZWtkYXlzVmlzaWJsZTogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBlbnVtIE5hdmlnYXRpb25FdmVudCB7XG5cdFBSRVYsXG5cdE5FWFQsXG59XG4iXX0=