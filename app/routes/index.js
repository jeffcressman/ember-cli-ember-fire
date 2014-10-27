import Ember from 'ember';
import ENV from 'ember-cli-ember-fire/config/environment';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('player');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
		var ref = new window.Firebase(ENV.firebase);
		var authData = ref.getAuth();
	  if (authData) {
	    // user authenticated with Firebase
	    controller.set('authorized', true);
	    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
	  } else {
	    // user is logged out
	    controller.set('authorized', false);
	    console.log("User is logged out");
	  }
  }
});
