# Ember-cli-ember-fire [![Build Status](https://travis-ci.org/stefanpenner/ember-cli-ember-fire.svg)](https://travis-ci.org/stefanpenner/ember-cli-ember-fire)

This README outlines the details of collaborating on this Ember application.

A simple application, that demonstrates using emberfire, as a ember-cli addon.

## Notes

Not sure how to implement findy by value with emberfire... Firebase generates ids that are not the same as the email/password ids, which are not the same as the EmberData ids...

Oh, EmberData uses the Firebase ids. What we need then is to be able to take the email/password id and get the Firebase id. May need an intermediary object Auth with fields Auth.auth_id and Auth.user_id

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* update `config/environment.js` `firebase_instance` to your firebase
  instance name.
* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
