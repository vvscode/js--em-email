import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromEmail() { return faker.internet.email(); },
  fromName() { return faker.name.findName(); },
  subject() { return faker.company.bs(); },
  timestamp() { return faker.date.recent(); },
  body() { return faker.hacker.phrase(); },
  read() { return faker.random.boolean(); }
});
