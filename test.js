var should = require("should");

var Serializer = require('./index');

var model_under_test = {
  username: 'kulakowka',
  firstname: 'Anton',
  lastname: 'Kulakov',
  password: 'qwerty',
  profile: { email: 'someone@somewhere.com' }
}

describe('Serializer', function(){
  it('should serialize booleans with a model', function(){
    var rules = { 'username': true }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('username', model_under_test.username);
  })

  it('should serialize functions with a model', function(){
    var rules = { 'fullname': function() { return this.firstname + ' ' + this.lastname; } }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('fullname', model_under_test.firstname+' '+model_under_test.lastname);
  })

  it('should serialize all models in a collection', function() {
    var rules = {
      'username': true,
      'fullname': function() { return this.firstname + ' ' + this.lastname; }
    }
    var collection = Serializer(rules, [model_under_test, model_under_test]);

    collection.should.be.instanceof(Array).and.have.lengthOf(2);
    collection.map(function(user){
      user.should.have.property('username', model_under_test.username);
      user.should.have.property('fullname', model_under_test.firstname+' '+model_under_test.lastname);
    });
  })

  it('should serialize strings for rules', function() {
    var rules = { 'email': 'profile.email' }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('email', model_under_test.profile.email);
  })

  it('should serialize attributes even if nested', function() {
    var rules = { 'myinfo': { 'email': 'profile.email' } }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('myinfo', model['myinfo']);
    model['myinfo'].should.have.property('email', model_under_test.profile.email);
  })

})
