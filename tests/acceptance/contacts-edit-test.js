import { test, skip } from 'qunit';
import moduleForAcceptance from 'email/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contacts edit');

test('Edit contact displays contact current info', function(assert) {
  // set up test data
  let contact = server.create('contact', {
    name: 'Ann Smith',
    emails: [
      server.create('contact-email', { email: 'smith@example.com'}),
      server.create('contact-email', { email: 'smith@example.org'}),
      server.create('contact-email', { email: 'asmith@example.edu'})
    ],
    phones:[
      server.create('contact-phone', { phone: '+15555550002'}),
      server.create('contact-phone', { phone: '+15555555252'})
    ]
  });
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
  let contact = server.create('contact', {
    name: 'Ann Smith',
    emails: [
      server.create('contact-email', { email: 'smith@example.com'}),
      server.create('contact-email', { email: 'smith@example.org'}),
      server.create('contact-email', { email: 'asmith@example.edu'})
    ],
    phones:[
      server.create('contact-phone', { phone: '+15555550002'}),
      server.create('contact-phone', { phone: '+15555555252'})
    ]
  });
  visitEditContact(contact);

  andThen(function() {
    fillIn('.test-contact-name:eq(0)', 'Ann Smith:updated');
    fillIn('.test-contact-phone:eq(0)', '+15555555252:updated');
    fillIn('.test-contact-phone:eq(1)', '+15555550002:updated');
    fillIn('.test-contact-email:eq(0)', 'smith@example.com:updated');
    fillIn('.test-contact-email:eq(1)', 'smith@example.org:updated');
    fillIn('.test-contact-email:eq(2)', 'asmith@example.edu:updated');
    click('.save-contact');
  });

  andThen(function() {
    visitEditContact(contact);
  });

  andThen(function() {
    assert.equal($('.test-contact-name:eq(0)').val(), 'Ann Smith:updated', 'Contact name is updated');
    assert.equal($('.test-contact-phone:eq(0)').val(), '+15555555252:updated', 'Primary phone is updated');
    assert.equal($('.test-contact-email:eq(0)').val(), 'smith@example.com:updated', 'Primary email is updated');
  });
});

test('Edit contact handles server error when saving contact', function(assert) {
  let contact = server.create('contact', {
    name: 'Ann Smith',
    emails: [
      server.create('contact-email', { email: 'smith@example.com'}),
      server.create('contact-email', { email: 'smith@example.org'}),
      server.create('contact-email', { email: 'asmith@example.edu'})
    ],
    phones:[
      server.create('contact-phone', { phone: '+15555550002'}),
      server.create('contact-phone', { phone: '+15555555252'})
    ]
  });
  visitEditContact(contact);
  andThen(function() {
    fillIn('.test-contact-name:eq(0)', 'Ann Smith:with-error');
    fillIn('.test-contact-phone:eq(0)', '+15555550002:with-error');
    fillIn('.test-contact-phone:eq(1)', '+15555555252:with-error');
    fillIn('.test-contact-email:eq(0)', 'smith@example.com:with-error');
    fillIn('.test-contact-email:eq(1)', 'smith@example.org:with-error');
    fillIn('.test-contact-email:eq(2)', 'asmith@example.edu:with-error');
    click('.save-contact');
  });
  andThen(function() {
    visitEditContact(contact);
  });

  andThen(function() {
    assert.equal($('.test-contact-name:eq(0)').val(), 'Ann Smith', 'Contact name is NOT updated');
    assert.equal($('.test-contact-phone:eq(0)').val(), '+15555550002', 'Primary phone is NOT updated');
    assert.equal($('.test-contact-email:eq(0)').val(), 'smith@example.com', 'Primary email is NOT updated');
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
