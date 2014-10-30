import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  setupController: function (controller) {
    controller.set('errorMessage', null);
  },

  actions: {

    sessionAuthenticationSucceeded: function () {
      Ember.Logger.debug('Login : Session authentication succeeded');
      this._super();
    },

    sessionAuthenticationFailed: function (error) {
      Ember.Logger.debug('Login : Session authentication failed with message:',
        error.message);
      // show generic error
      this.controller.set('errorMessage', 'Invalid email/password combination.');
      this._super();
    },

    sessionInvalidationSucceeded: function () {
      Ember.Logger.debug('Login : Session invalidation succeeded');
      this._super();
    },

    // Currently no Firebase callback for invalidation so this will never
    // be called
    sessionInvalidationFailed: function (error) {
      Ember.Logger.debug('Login : Session invalidation failed with message:',
        error.message);
      this._super();
    },

    authorizationFailed: function (error) {
      Ember.Logger.debug('Login : Authorization failed with message:', error.message);
      this._super();
    }

  }
});
