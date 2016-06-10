import { test } from 'qunit';
import moduleForAcceptance from 'email/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | mail/folder/email');

test('Can reply to an email', function(assert) {
  let email = server.create('email', { fromEmail: 'jane@example.com', fromName: 'Jane Doe', subject: 'Email me back', body: 'Today!' });
  server.create('folder', { id: 'inbox', name: 'Inbox', emails: [email] });

  visit(`/mail/folder/inbox/email/${email.id}`);

  andThen(function() {
    assert.equal(find('.test-reply-to').length, 0, 'Reply form is not in the page yet');
  });

  click('.test-reply');

  andThen(function() {
    assert.equal(find('.test-reply-to input').val(), 'jane@example.com', 'Fills out email we are replying to');
    assert.equal(find('.test-reply-subject input').val(), 'Re: Email me back', 'Fills out subject when replying');
  });

  fillIn('.test-reply-body textarea', 'I replied');

  click('.test-send');

  andThen(function() {
    let emails = server.db.emails;
    let newEmail = emails[emails.length - 1];
    assert.equal(emails.length, 2, 'The new message was created');
    assert.equal(newEmail.body, 'I replied', 'The new message body contains the correct value');
    assert.equal(newEmail.subject, 'Re: Email me back', 'The new message subject is correct');
  });
});

test('Cannot send email without "to" filled out', function(assert) {
  let email = server.create('email', { fromEmail: 'jane@example.com', fromName: 'Jane Doe', subject: 'Email me back', body: 'Today!' });
  server.create('folder', { id: 'inbox', name: 'Inbox', emails: [email] });

  visit(`/mail/folder/inbox/email/${email.id}`);

  click('.test-reply');

  fillIn('.test-reply-to input', '');
  click('.test-send');

  andThen(function() {
    assert.equal(server.db.emails.length, 1, 'There is no new email');
    assert.equal(find('.test-to-validation').text().trim(), 'To is required', 'To field shows validation message');
  });

  fillIn('.test-reply-to input', 'new@example.com');
  click('.test-send');

  andThen(function() {
    assert.equal(server.db.emails.length, 2, 'There is a new email');
  });
});
