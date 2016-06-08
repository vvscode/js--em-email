export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  server.logging = true;
  let inbox = server.create('folder', { id: 'inbox', name: 'Inbox', userId: 1 });
  let inboxEmails = server.createList('email', 15, { folderId: inbox.id });

  server.db.folders.update(inbox.id, {
    emailCount: inboxEmails.length,
    unreadCount: server.db.emails.where({ folderId: inbox.id, read: false }).length
  });

  let spam = server.create('folder', { name: 'Spam', userId: 1, emailCount: 32, unreadCount: 13 });
  let spamEmails = server.createList('email', 32, { folderId: spam.id });
}
