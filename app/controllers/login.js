import Ember from 'ember';
import ENV from 'ember-cli-ember-fire/config/environment';

export default Ember.Controller.extend({
	identification: null,
	password: null,

  actions: {
    authenticate: function() {
      var ref = new window.Firebase(ENV.firebase);
      var controller = this;
			ref.authWithPassword({
			  email    : this.get('identification'),
			  password : this.get('password')
			}, function(error, authData) {
			  if (error === null) {
			    // user authenticated with Firebase
			    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
			    controller.transitionToRoute('/');
			  } else {
			    console.log("Error authenticating user:", error);
			  }
			});

      this.setProperties({
        identification: null,
				password: null,
      });
    }
  }
});