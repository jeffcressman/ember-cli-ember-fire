import Ember from 'ember';
import ENV from 'ember-cli-ember-fire/config/environment';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

var sum = Ember.computed.sum;
var mapBy = Ember.computed.mapBy;

export default Ember.ArrayController.extend(LoginControllerMixin, {
	authorized: false,
  itemController: 'player',
  scores: mapBy('@this', 'score'),
  total: sum('scores'),
  selectedPlayer: null,
  actions: {
    cancel: function(){
      this.set('selectedPlayer', null);
    },
    selectPlayer: function(player) {
      this.set('selectedPlayer', player);
    },
    givePoints: function(model, points) {
      model.incrementProperty('score', points);
      model.save();
    },
    takePoints: function(model, points) {
      model.incrementProperty('score', -1 * points);
      model.save();
    },
    destroyUser: function(model) {
    	// TODO: Should be able to get these from the Session now
    	var user_email = model.get('email');
    	var user_pass = model.get('password');

      model.destroyRecord();

      // and delete the authentication record
      var ref = new window.Firebase(ENV.firebase);
      ref.removeUser({
			  email    : user_email,
			  password : user_pass
			}, function(error) {
			  if (error === null) {
			    console.log("User removed successfully");
			  } else {
			    console.log("Error removing user:", error);
			  }
			});

      // TODO:
			// and delete the login model
    }
  }
});
