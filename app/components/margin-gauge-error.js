import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { scaleLinear } from 'd3-scale';
import { flatMap } from 'lodash-es';
import makeRanges from '../utils/make-ranges';
import transparentize from '../utils/transparentize';

const { abs, floor, min, max } = Math;

@tagName('g')
export default class MarginGaugeError extends Component {
  maxOpacity = 0.5;
  minOpacity = 0.2;

  @computed('{angle,wedgeRanges,colorizer,wedgeClamper}')
  get wedges() {
    const { wedgeRanges, angle, colorizer, wedgeClamper } = this;
    const wedgeify = wedge => colorizer(wedgeClamper(wedge));

    return flatMap(wedgeRanges, ([startError, endError], index) => {
      const start = angle + startError;
      const end = angle + endError;
      const wedge = { start, end, index };

      if (start < 0 && end > 0) {
        return [
          wedgeify({ ...wedge, end: 0 }),
          wedgeify({ ...wedge, start: 0 })
        ];
      }

      return wedgeify(wedge);
    });
  }

  @computed('{wedgeRanges,negativeColor,positiveColor}')
  get colorizer() {
    const {
      wedgeRanges,
      negativeColor,
      positiveColor,
      minOpacity,
      maxOpacity
    } = this;
    const middleIndex = floor(wedgeRanges.length / 2);

    const scale = scaleLinear()
      .domain([0, middleIndex])
      .range([maxOpacity, minOpacity]);

    const computeOpacity = index => {
      const offset = abs(middleIndex - index);
      return scale(offset);
    };

    return wedge => {
      const { start, end, index } = wedge;
      const color = (start + end) / 2 > 0 ? positiveColor : negativeColor;
      const fill = transparentize(color, computeOpacity(index));

      return { ...wedge, fill };
    };
  }

  @computed('{start,end}')
  get wedgeClamper() {
    const { start: minVal, end: maxVal } = this;
    const clamp = val => max(min(val, maxVal), minVal);

    return wedge => {
      const { start, end } = wedge;
      return {
        ...wedge,
        start: clamp(start),
        end: clamp(end)
      };
    };
  }

  @computed('errorRanges')
  get wedgeRanges() {
    const ranges = this.errorRanges;
    const inversed = ranges.map(i => i * -1);
    return makeRanges([...inversed, ...ranges]);
  }
}
