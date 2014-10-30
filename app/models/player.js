import DS from 'ember-data';

// Seems undesirable to include the password in the
// model but as long as we're using the Firebase email + password
// authentication we need the password to delete the user
// Another approach would be to require the user to enter
// their password prior to deletion.
// For admin usage we'd need the password as well if we want to
// be able to programatically delete the user rather than use the
// Firebase Dashboard
export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  score: DS.attr('number'),
  login: DS.belongsTo('login', {async: true})
});
