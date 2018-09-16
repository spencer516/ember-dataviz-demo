import Component from '@ember/component';
import { attribute, tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

@tagName('g')
export default class MarginGaugeContainer extends Component {
  @attribute
  @computed('angle')
  get transform() {
    return `rotate(${this.angle})`;
  }

  @computed('{angle,radius,size}')
  get tickData() {
    const { angle, radius, size } = this;
    const isFlipped = angle < 0;

    const start = isFlipped ? radius * -1 : radius - size;
    const end = isFlipped ? start + +size : radius;
    const textStart = isFlipped ? end + 5 : start - 5;
    const textAnchor = isFlipped ? 'start' : 'end';
    const rotation = isFlipped ? 90 : -90;

    return { start, end, textStart, textAnchor, rotation };
  }
}
