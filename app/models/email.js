import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  fromEmail: attr('string'),
  fromName: attr('string'),
  subject: attr('string'),
  timestamp: attr('date'),
  body: attr('string'),
  read: attr('boolean')
});
