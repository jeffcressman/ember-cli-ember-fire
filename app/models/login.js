import DS from 'ember-data';

// While using Firebase simple-login we need to keep track of the
// relationship between the player model ids and the simplelogin ids
export default DS.Model.extend({
	simple_login_id: DS.attr('string'),
  player: DS.belongsTo('player', {async: true})
});
