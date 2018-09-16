import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { defer } from 'rsvp';
import { set, get } from '@ember/object';

const { min } = Math;

function raf() {
  const { promise, resolve } = defer();
  window.requestAnimationFrame(resolve);
  return promise;
}

export function buildAnimation(interpolator = (a, b) => b, easingFn = t => t) {
  return function*({ from, to, isAnimating, getProgress, isInitial }) {
    if (isInitial) {
      return;
    }

    const tween = interpolator(from, to);

    while (isAnimating()) {
      const progress = easingFn(getProgress());
      yield tween(progress);
    }
  };
}

export default Component.extend({
  tagName: '',
  duration: 400,

  animate: task({
    currentValue: null,
    *perform(isInitial, from, to, iteratorFn, duration) {
      let startTime = performance.now();
      let endTime = startTime + duration;
      let progress = 0;
      let animatingStatus = true;

      const getProgress = () => progress;
      const isAnimating = () => animatingStatus;
      const iterator = iteratorFn({
        from,
        to,
        getProgress,
        isAnimating,
        isInitial
      });

      if (isInitial) {
        set(this, 'currentValue', to);
      }

      for (let nextVal of iterator) {
        set(this, 'currentValue', nextVal);
        const now = yield raf();
        progress = min(1, (now - startTime) / (endTime - startTime));
        animatingStatus = progress < 1;
      }
    }
  }),

  didReceiveAttrs() {
    const { value, use, duration } = this;
    const currentValue = get(this, 'animate.last.currentValue');
    const isInitial = this.animate.performCount === 0;

    this.animate.perform(isInitial, currentValue, value, use, duration);
  }
});
