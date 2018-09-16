import Component from '@ember/component';
import { attribute, classNames, tagName } from '@ember-decorators/component';
import { alias } from '@ember-decorators/object/computed';

@tagName('text')
@classNames('tick-text')
export default class TickLabel extends Component {
  textAnchor;
  x;

  @attribute('text-anchor')
  @alias('textAnchor')
  _textAnchor;

  @attribute('x')
  @alias('x')
  _x;
}
