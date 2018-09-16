import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { attribute, tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

@tagName('svg')
export default class MarginGaugeContainer extends Component {
  @attribute
  height = this.height || this.width * 0.6;

  @attribute
  width = this.width;

  padding = this.padding || 10;
  bandSize = this.bandSize || this.radius * 0.55;

  @computed('width')
  get origin() {
    const halfWidth = this.width / 2;
    return [halfWidth, halfWidth];
  }

  @computed('origin')
  get originTransform() {
    return htmlSafe(this.origin.join(','));
  }

  @computed('{width,padding}')
  get radius() {
    const { width, padding } = this;
    const spaceToUse = width - padding * 2;
    return spaceToUse / 2;
  }

  @computed('{radius,bandSize}')
  get innerRadius() {
    const { radius, bandSize } = this;
    return radius - bandSize;
  }
}
