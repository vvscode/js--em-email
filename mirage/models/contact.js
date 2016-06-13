import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  emails: hasMany('contact-email'),
  phones: hasMany('contact-phone')
});
