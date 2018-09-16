import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';
import { action } from '@ember-decorators/object';
import { scaleLinear } from 'd3-scale';
import { set } from '@ember/object';
import { range } from 'lodash-es';

const { abs } = Math;

export default class Demo5Controller extends Controller {
  currentMargin = 0;
  errorRanges = [5, 15, 25];
  colors = {
    positive: 'red',
    negative: 'blue',
    neutral: 'black'
  };

  @computed
  get scale() {
    return scaleLinear()
      .domain([-12, 12])
      .range([-90, 90]);
  }

  @computed('scale')
  get majorTicks() {
    const scale = this.scale;

    return range(-11, 12)
      .filter(val => val !== 0)
      .map(value => ({
        value: abs(value),
        isPositive: value > 0,
        angle: scale(value)
      }));
  }

  @computed('scale')
  get minorTicks() {
    const scale = this.scale;

    return range(-10.5, 11, 1)
      .filter(val => val !== 0)
      .map(scale);
  }

  @computed('{scale,currentMargin}')
  get angle() {
    const { scale, currentMargin } = this;
    return scale(currentMargin);
  }

  @computed('{angle,colors}')
  get currentColor() {
    const { colors, angle } = this;
    const { positive, negative, neutral } = colors;

    switch (angle) {
      case 0:
        return neutral;
      default:
        return angle > 0 ? positive : negative;
    }
  }

  @action
  updateRanges(newVal) {
    set(this, 'errorRanges', newVal.split(',').map(Number));
  }

  @action
  updateMargin(newVal) {
    set(this, 'currentMargin', Number(newVal));
  }
}
