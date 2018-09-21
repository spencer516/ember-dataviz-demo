import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';
import { action } from '@ember-decorators/object';
import { scaleLinear } from 'd3-scale';
import { set } from '@ember/object';
import { range } from 'lodash-es';
import { buildAnimation } from '../components/animate-value';
import { easeQuadInOut } from 'd3-ease';
import { interpolateNumber } from 'd3-interpolate';
import noise from '../utils/noise';

const { abs } = Math;

export default class Demo5Controller extends Controller {
  currentMargin = 0;
  errorMargins = [2, 5];
  colors = {
    positive: 'red',
    negative: 'blue',
    neutral: 'black'
  };

  *animator(animationData) {
    const animation = buildAnimation(interpolateNumber, easeQuadInOut);
    yield* animation(animationData);
  }

  *wiggleAnimator(animationData) {
    const animation = buildAnimation(interpolateNumber, easeQuadInOut);
    yield* animation(animationData);

    const { to } = animationData;
    let offset = 0;

    while (true) {
      yield to + noise(offset);
      offset += 1;
    }
  }

  @computed('{scale,errorMargins}')
  get errorRanges() {
    const { scale, errorMargins } = this;
    return errorMargins.map(scale);
  }

  @computed('{currentMargin,errorMargins}')
  get graphDescription() {
    const { currentMargin, errorMargins: [firstError] } = this;
    const phrases = [];
    const partyAdvantage = currentMargin > 0 ? 'Republican' : 'Democratic';

    if (currentMargin === 0) {
      phrases.push(`
        The forecast margin of victory is tied.
      `);
    } else {
      phrases.push(`
        Our forecast gives the ${partyAdvantage} candidate a
        ${Math.abs(currentMargin)} percent lead on average.
      `);
    }

    const minError = currentMargin - firstError;
    const maxError = currentMargin + firstError;
    const minAdvantage = minError > 0 ? 'Republicans' : 'Democrats';
    const maxAdvantage = maxError > 0 ? 'Republicans' : 'Democrats';

    phrases.push(`
      With about 75% certainty, the final result will fall between
      plus ${Math.abs(minError)} for ${minAdvantage} and
      plus ${Math.abs(maxError)} for ${maxAdvantage}.
    `);

    return phrases.join('\n');
  }

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
  updateMargin(newVal) {
    set(this, 'currentMargin', Number(newVal));
  }
}
