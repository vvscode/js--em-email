import { test } from 'qunit';
import moduleForAcceptance from 'email/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contacts index');

test('visiting user contacts route displays all contacts', function(assert) {
  // Set up the test data
  server.createList('contact', 5);
  visit('/contacts');

  andThen(function() {
    assert.equal(find('.test-contact').length, 5, 'All contacts display');
  });
});

test('user contacts list is sorted by name', function(assert) {
  // Set up the test data
  server.create('contact', { name: 'Jane Doe' });
  server.create('contact', { name: 'John Armstrong' });
  server.create('contact', { name: 'John Doe' });

  visit('/contacts');

  andThen(function() {
    assert.contains('.test-contact:eq(0) .test-contact-name', 'Jane Doe', 'Contact list is sorted alphabetically');
    assert.contains('.test-contact:eq(1) .test-contact-name', 'John Armstrong', 'Contact list is sorted alphabetically');
    assert.contains('.test-contact:eq(2) .test-contact-name', 'John Doe', 'Contact list is sorted alphabetically');
  });
});

test('displays info for a contact in each row', function(assert) {
  // Set up the test data
  const contact = server.create('contact', {
    name: 'Ann Smith',
    emails: [
      server.create('contact-email', { email: 'smith@example.com'}),
      server.create('contact-email', { email: '(+2)'})
    ],
    phones:[
      server.create('contact-phone', { phone: '+1 555-555-5252'}),
      server.create('contact-phone', { phone: '(+1)'})
    ]
  });

  visit('/contacts');

  andThen(function() {
    assert.contains('.test-contact:eq(0) .test-contact-name', 'Ann Smith', 'Contact row displays contact name');
    assert.contains('.test-contact:eq(0) .test-contact-primary-email:eq(0)', 'smith@example.com', 'Contact row displays contact primary email');
    assert.contains('.test-contact:eq(0) .test-contact-primary-email:eq(1)', '(+2)', 'Displays additional email count');
    assert.contains('.test-contact:eq(0) .test-contact-primary-phone:eq(0)', '+1 555-555-5252', 'Contact row displays primary phone');
    assert.contains('.test-contact:eq(0) .test-contact-primary-phone:eq(1)', '(+1)', 'Displays additional phone count');
  });
});

// Write the tests
skip('name links to edit for a contact');

skip('primary email is a mailto: link');

skip('primary phone is a tel: link');
