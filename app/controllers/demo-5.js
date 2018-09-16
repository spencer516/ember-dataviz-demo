import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { set } from '@ember/object';

export default class Demo5Controller extends Controller {
  angle = 15;
  errorRanges = [5, 15, 25];
  positiveColor = 'red';
  negativeColor = 'blue';

  @action
  updateRanges(newVal) {
    set(this, 'errorRanges', newVal.split(',').map(Number));
  }

  @action
  updateAngle(newVal) {
    set(this, 'angle', Number(newVal));
  }
}
