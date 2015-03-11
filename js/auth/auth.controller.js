angular
  .module('tas')
  .controller('AuthController', AuthController);

function AuthController($scope, $location, BASE_URL) {
  var vm = this,
      fb = new Firebase(BASE_URL);

  vm.login = function () {
    fb.authWithPassword({
      email:    vm.email,
      password: vm.password
    }, function (err, authData) {
      if (err) {
        console.log('Error logging in user:', err);
      } else {
        console.log('Logged in successfully', authData);
        $location.path('/tas');
        $scope.$apply();
      }
    });
  };

  vm.register = function () {
    fb.createUser({
      email:    vm.email,
      password: vm.password
    }, function (err, authData) {
      if (err && err.code === 'EMAIL_TAKEN') {
        console.log('Error creating user:', err);
        vm.login();
      } else if (err) {
        console.log('Error creating user:', err);
      } else {
        console.log('User created successfully', authData);
        vm.login();
      }
    });
  };

  vm.forgotPassword = function () {
    fb.resetPassword({
      email:    vm.email,
      password: vm.password
    }, function (err) {
      if (err) {
        console.log('Error resetting password:', err);
      } else {
        console.log('Password reset email sent successfully', authData);
      }
    });
  };
}
