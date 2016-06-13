import Ember from 'ember';

const {
  get,
  set,
  setProperties,
  RSVP
} = Ember;

export default Ember.Controller.extend({
  contactSaveErr: null,
  phonesSaveErr: null,
  emailsSaveErr: null,

  actions: {
    save() {
      setProperties(this, {
        contactSaveErr: null,
        phonesSaveErr: null,
        emailsSaveErr: null
      });

      let model = get(this, 'model');
      let phones = get(model, 'phones');
      let emails = get(model, 'emails');

      model.save()
        .catch((err)=> {
          set(this, 'contactSaveErr', get(err, 'errors.firstObject') || 'Error on saving contact');
        })
        .then(() => RSVP.all(phones.map((item) => item.save())))
        .catch((err)=> set(this, 'phonesSaveErr', get(err, 'errors.firstObject') || 'Error on saving phone'))
        .then(() => RSVP.all(emails.map((item) => item.save())))
        .catch((err)=> set(this, 'emailsSaveErr', get(err, 'errors.firstObject') || 'Error on saving email'))
        .finally(() => {
          model.rollbackAttributes();
          phones.forEach((item) => item.rollbackAttributes());
          emails.forEach((item) => item.rollbackAttributes());
        });
    }
  }
});
