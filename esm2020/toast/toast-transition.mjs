import { reflow } from '../util/util';
export const ngbToastFadeInTransition = (element, animation) => {
    const { classList } = element;
    if (animation) {
        classList.add('fade');
    }
    else {
        classList.add('show');
        return;
    }
    reflow(element);
    classList.add('show', 'showing');
    return () => {
        classList.remove('showing');
    };
};
export const ngbToastFadeOutTransition = ({ classList }) => {
    classList.add('showing');
    return () => {
        classList.remove('show', 'showing');
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtdHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90b2FzdC90b2FzdC10cmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdEMsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQXlCLENBQUMsT0FBb0IsRUFBRSxTQUFlLEVBQUUsRUFBRTtJQUN2RyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRTlCLElBQUksU0FBUyxFQUFFO1FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0QjtTQUFNO1FBQ04sU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixPQUFPO0tBQ1A7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFakMsT0FBTyxHQUFHLEVBQUU7UUFDWCxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUF5QixDQUFDLEVBQUUsU0FBUyxFQUFlLEVBQUUsRUFBRTtJQUM3RixTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxFQUFFO1FBQ1gsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdiVHJhbnNpdGlvblN0YXJ0Rm4gfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQgeyByZWZsb3cgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgbmdiVG9hc3RGYWRlSW5UcmFuc2l0aW9uOiBOZ2JUcmFuc2l0aW9uU3RhcnRGbiA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYW5pbWF0aW9uOiB0cnVlKSA9PiB7XG5cdGNvbnN0IHsgY2xhc3NMaXN0IH0gPSBlbGVtZW50O1xuXG5cdGlmIChhbmltYXRpb24pIHtcblx0XHRjbGFzc0xpc3QuYWRkKCdmYWRlJyk7XG5cdH0gZWxzZSB7XG5cdFx0Y2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHJlZmxvdyhlbGVtZW50KTtcblx0Y2xhc3NMaXN0LmFkZCgnc2hvdycsICdzaG93aW5nJyk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRjbGFzc0xpc3QucmVtb3ZlKCdzaG93aW5nJyk7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgbmdiVG9hc3RGYWRlT3V0VHJhbnNpdGlvbjogTmdiVHJhbnNpdGlvblN0YXJ0Rm4gPSAoeyBjbGFzc0xpc3QgfTogSFRNTEVsZW1lbnQpID0+IHtcblx0Y2xhc3NMaXN0LmFkZCgnc2hvd2luZycpO1xuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnc2hvd2luZycpO1xuXHR9O1xufTtcbiJdfQ==