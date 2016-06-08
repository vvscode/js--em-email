import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('mail', function() {
    this.route('index', { path: '/' });
    this.route('folder', { path: 'folder/:folderId' }, function() {
      this.route('list', { path: '/' });
      this.route('email', { path: 'email/:emailId' });
    });
  });
});

export default Router;
