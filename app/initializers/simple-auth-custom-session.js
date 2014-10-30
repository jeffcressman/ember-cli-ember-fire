import Ember from 'ember';
import Session from 'simple-auth/session';

export default {
	name: 'custom-session',
	before: 'simple-auth',
	initialize: function() {
		Session.reopen({

			setCurrentUser: function() {
				var userID = this.get('user_id');
				if (!Ember.isEmpty(userID)) {
					var self = this;
					var store = this.container.lookup('store:main');

					// So, we could just load all of the users here and check the email, which must
					// be unique across users to get the Current User.
					//
					// This is also brings us back to a problem we had with the Rails and Devise 
					// setup where we don't know which model type to search in Ember so we'd have to
					// search them all.
					//
					// What we can do then is create a login model, add the user email to it, get
					// all of the login models from the store, look for the matching email, get the
					// user id from the match and then load that user, setting attributes of a 
					// currentUser hash with the relevant data (name, role (model type or role), and
					// the model id, which we'd need if we have to actually load the current user)
					//
					// This all feels pretty hacky still. We could just set CurrentUser to whatever the 
					// model is as there are no type restrictions. Our code should make sense as we'll 
					// be using the notion of roles to control what happens after sign in and thus never
					// call any method on the Current User that doesn't fit with its role.
					//
					// first we grab the login and then set Current User to the user
					// it belongs to.
					//
					
					self = this;
					store.find('login').then(function(logins){
						var currentLogin = logins.findBy('simple_login_id', self.get('user_id').replace(/.*:/, ''));
						if (Ember.isEmpty(currentLogin)) {
							Ember.Logger.debug("Session : Couldn't find Current User for id=" + self.get('user_id'));
						} else {
							self.set('currentUser', currentLogin.get('player'));
						}
					});
				}
			}.observes('user_id'),
		});
	}
};