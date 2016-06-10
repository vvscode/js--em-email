import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  to: null,
  subject: null,
  body: null,
  errorMessage: null,

  actions: {
    send(event) {
      event.preventDefault();

      if (Ember.isEmpty(this.get('to'))) {
        this.set('errorMessage', 'To is required');
        return;
      }

      let email = this.get('store').createRecord('email', this.getProperties('to', 'subject', 'body'));
      email.save();
    }
  }
});
