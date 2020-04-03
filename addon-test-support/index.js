import { getContext, settled } from '@ember/test-helpers';
import { run } from '@ember/runloop';

export function setBreakpoint(breakpoint) {
  let breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  let { owner } = getContext();
  let breakpoints = owner.lookup('breakpoints:main');
  let responsive = owner.lookup('service:responsive');

  for (let breakpointName of breakpointArray) {
    if (breakpointName === 'auto') {
      responsive.set('_mocked', false);
      return;
    }

    if (Object.keys(breakpoints).indexOf(breakpointName) === -1) {
      throw new Error(`Breakpoint "${breakpointName}" is not defined in your breakpoints file`);
    }
  }

  let matches = responsive.get('matches');
  run(() => {
    matches.clear();
    matches.addObjects(breakpointArray);
    responsive._triggerMediaChanged();
  });
  return settled();
}
