import Ember from 'ember';

export default Ember.Route.extend({
  model({folderId}) {
    return this.store.findRecord('folder', folderId, {include: 'emails'});
  }
});
