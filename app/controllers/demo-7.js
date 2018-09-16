import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { easeQuadInOut } from 'd3-ease';
import { interpolateNumber } from 'd3-interpolate';
import { set } from '@ember/object';
import { buildAnimation } from '../components/animate-value';
import noise from '../utils/noise';

export default class Demo5Controller extends Controller {
  angle = 0;

  @action
  updateAngle(newVal) {
    set(this, 'angle', Number(newVal));
  }

  *animator(animationData) {
    const animation = buildAnimation(interpolateNumber, easeQuadInOut);
    const { to } = animationData;
    let offset = 0;

    yield* animation(animationData);

    while (true) {
      yield to + noise(offset);
      offset += 1;
    }
  }
}
