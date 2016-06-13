import Ember from 'ember';

export default Ember.Route.extend({
  model({contactId}) {
    return this.store.findRecord('contact', contactId, { include: 'phones,emails' });
  }
});
