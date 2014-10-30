import Ember from 'ember';
import ENV from 'ember-cli-ember-fire/config/environment';

export default Ember.Controller.extend({
  name: null,
  email: null,
  password: null,
  score: null,
  actions: {
    createUser: function() {
    	var self = this;
      this.store.createRecord('player', {
        name: this.get('name'),
        password: this.get('password'),
        email: this.get('email'),
        score: parseInt(this.get('score'), 10),
        timestamp: new Date()
      }).save().then(function(player){
			  // Success callback
			  var user = player;
	      // Because Emberfire doesn't currently support authentication we add the 
	      // user to the Firebase email/password system here
	      var ref = new window.Firebase(ENV.firebase);
	      ref.createUser({
				  email    : self.get('email'),
				  password : self.get('password')
				}, function(error) {
				  if (error === null) {
					  // Auto log user in
		        self.get('session').authenticate('simple-auth-authenticator:firebase', {
		          identification: self.get('email'),
		          password: self.get('password')
		        }).then(function() {
		        	// Session now authenticated
		        	Ember.Logger.debug('Create Player : Create Player auto-login succeeded');

							self.store.createRecord('login', {
								simple_login_id: self.get('session').get('user_id').replace(/.*:/, ''), // Extract the id from format "simplelogin:14"
								player: user, // this is saved with the same value as user.get('id'), the Frirebase/EmberData id
								timestamp: new Date()
							}).save().then(function(login) {
								// Success callback
								Ember.Logger.debug('Create Player : Create Player succeeded');

								// Add the login to the user
								user.set('login', login);
								user.save();

								// Reset
							  self.setProperties({
							    name: null,
							    email: null,
							    password: null,
							    score: null
							  });
							}, function() {
								// Error callback
								Ember.Logger.debug('Create Player : Create Player failed on login model');

								// Reset
							  self.setProperties({
							    name: null,
							    email: null,
							    password: null,
							    score: null
							  });
							});
		        });
				  } else {
				    Ember.Logger.debug('Create Player : Create Player failed on create simple login', error);
				  }
				});
			}, function() {
			  // Error callback
			  Ember.Logger.debug('Create Player : Create Player failed on player record');
			});
    }
  }
});
