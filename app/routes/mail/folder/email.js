import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('email', params.emailId);
  },

  resetController(controller) {
    controller.reset();
  }
});
