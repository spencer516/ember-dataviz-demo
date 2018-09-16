import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { attribute, tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

@tagName('g')
export default class MarginGaugeNeedle extends Component {
  angle = this.angle || 0;

  @attribute
  @computed('angle')
  get transform() {
    return htmlSafe(`rotate(${this.angle})`);
  }
}
