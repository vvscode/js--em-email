import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.0-beta.7/shorthands/
  */

  this.get('/emails', function({emails}, request) {
    return emails.where({ folderId: request.queryParams.folder });
  });

  this.get('/folders');
  this.get('/folders/:id');

  this.post('/emails');
  this.get('/emails/:id');

  this.get('/contacts');
  this.get('/contacts/:id');
  this.patch('/contacts/:id', function(db, request) {
    if (request.requestBody.indexOf('with-error') >= 0) {
      return new Mirage.Response(500, {}, {errors: ['There was an error saving this contact. Please try again.']});
    }
    return { errors: [] };
  });
  this.patch('/contact-phones/:id', function(db, request) {
    if (request.requestBody.indexOf('with-error') >= 0) {
      return new Mirage.Response(500, {}, {errors: ['There was an error saving this contact phone. Please try again.']});
    }
    return { errors: [] };
  });
  this.patch('/contact-emails/:id', function(db, request) {
    if (request.requestBody.indexOf('with-error') >= 0) {
      return new Mirage.Response(500, {}, {errors: ['There was an error saving this contact email. Please try again.']});
    }
    return { errors: [] };
  });
}

