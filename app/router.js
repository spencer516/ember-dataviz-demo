import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('demo-1');
  this.route('demo-2');
  this.route('demo-3');
  this.route('demo-4');
  this.route('demo-5');
  this.route('demo-6');
  this.route('demo-7');
  this.route('demo-8');
});

export default Router;
