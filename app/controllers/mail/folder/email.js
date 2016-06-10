import Ember from 'ember';

export default Ember.Controller.extend({
  showingReply: false,

  reset() {
    this.setProperties({
      showingReply: false
    });
  },

  actions: {
    reply() {
      this.toggleProperty('showingReply');
    }
  }
});
