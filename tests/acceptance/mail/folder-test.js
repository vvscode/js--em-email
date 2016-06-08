import { test } from 'qunit';
import moduleForAcceptance from 'email/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | mail/folder');

test('visiting /mail/folder/inbox displays all of inbox\'s emails ', function(assert) {
  let emails = server.createList('email', 15);
  server.create('folder', { id: 'inbox', name: 'Inbox', emails: emails });
  server.logging = true;
  visit('/mail/folder/inbox');
  andThen(function() {
    assert.equal(find('.test-email-row').length, 15, 'All 15 emails display');
  });
});

test('Email links to full message', function(assert) {
  let email = server.create('email', { subject: 'This is not spam', body: 'Spam spam spam'});
  server.create('folder', { id: 'inbox', name: 'Inbox', emails: [email] });

  visit('/mail/folder/inbox');
  click('.test-email-link:eq(0)');

  andThen(function() {
    assert.equal(currentURL(), `/mail/folder/inbox/email/${email.id}`, 'Now on the email message');
    assert.equal(find('.test-email-subject').text().trim(), 'This is not spam', 'Email subject displays on email');
    assert.equal(find('.test-email-message').text().trim(), 'Spam spam spam', 'Email messsage displays');
  });
});

