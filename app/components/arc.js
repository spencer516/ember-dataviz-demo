import Component from '@ember/component';
import { tagName, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { arc } from 'd3-shape';

const arcMaker = arc();
const { PI } = Math;

function angleToRadians(angle) {
  return (angle / 180) * PI;
}

@tagName('path')
export default class MarginGaugeError extends Component {
  @attribute
  @computed('{ri,ro,start,end}')
  get d() {
    const { ri = 0, ro = 100, start = 0, end = 180 } = this;

    return arcMaker({
      innerRadius: ri,
      outerRadius: ro,
      startAngle: angleToRadians(start),
      endAngle: angleToRadians(end)
    });
  }
}
