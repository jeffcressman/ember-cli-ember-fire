import Ember from 'ember';
import ENV from 'ember-cli-ember-fire/config/environment';

export default Ember.Controller.extend({
  name: null,
  email: null,
  password: null,
  score: null,
  actions: {
    createUser: function() {
      this.store.createRecord('player', {
        name: this.get('name'),
        password: this.get('password'),
        email: this.get('email'),
        score: parseInt(this.get('score'), 10),
        timestamp: new Date()
      }).save();


      // Because Emberfire doesn't currently support authentication we add the 
      // user to the Firebase email/password system here
      var ref = new window.Firebase(ENV.firebase);
      ref.createUser({
			  email    : this.get('email'),
			  password : this.get('password')
			}, function(error) {
			  if (error === null) {
			    console.log("User created successfully");
			  } else {
			    console.log("Error creating user:", error);
			  }
			});

      this.setProperties({
        name: null,
        email: null,
        password: null,
        score: null
      });
    }
  }
});
