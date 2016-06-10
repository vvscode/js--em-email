import { test, skip } from 'qunit';
import moduleForAcceptance from 'email/tests/helpers/module-for-acceptance';
import Mirage from 'ember-cli-mirage';

moduleForAcceptance('Acceptance | contacts edit');

test('Edit contact displays contact current info', function(assert) {
  // set up test data

  visitEditContact(contact);

  andThen(function() {
    assert.contains('.test-contact-name', 'Ann Smith', 'Contact name is displayed');
    assert.contains('.test-contact-phone', '+15555555252', 'Contact primary phone is displayed');
    assert.contains('.test-contact-phone', '+15555550002', 'Contact alternate phone is displayed');
    assert.contains('.test-contact-email', 'smith@example.com', 'Contact primary email is displayed');
    assert.contains('.test-contact-email', 'smith@example.org', 'Contact alternate email is displayed');
    assert.contains('.test-contact-email', 'asmith@example.edu', 'Contact work email is displayed');
  });
});

test('Edit contact allows editing contact info', function(assert) {
  // set up test data

  visitEditContact(contact);

  // test actions

  andThen(function() {
    // fill in the assertions

    assert.equal(true, false, 'Contact name is updated');

    assert.equal(true, false, 'Primary phone is updated');

    assert.equal(true, false, 'Primary email is updated');
  });
});

test('Edit contact handles server error when saving contact', function(assert) {
  // set up test data

  visitEditContact(contact);

  // add test actions

  andThen(function() {
    // fill in assertions

    assert.equal(true, false, 'Contact name is NOT updated');

    assert.equal(true, false, 'Primary phone is NOT updated');

    assert.equal(true, false, 'Primary email is NOT updated');

    assert.contains('.alert-danger', 'There was an error saving this contact. Please try again.');
  });
});

skip('Edit contact handles server error when saving contact phone, saving all related models other than the erroring one');

skip('Edit contact handles server error when saving contact email, saving all related models other than the erroring one');

skip('Edit contact does not allow empty name');

skip('Edit contact allows adding a phone');
skip('Edit contact allows adding an email');
skip('Edit contact allows adding multiple phones and/or emails at the same time');
skip('Edit contact allows removing emails');
skip('Edit contact allows removing phones');

// contact is a mirage factory
function visitEditContact(contact) {
  visit(`/contacts/${contact.id}`);
}
