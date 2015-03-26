var should = require("should");
var Serializer = require('./index');

var model_under_test = {
  user: 'crueber',
  first_name: 'Christopher',
  last_name: 'Rueber',
  password: 'qwerty',
  profile: { email: 'someone@somewhere.com' }
}

describe('Serializer', function(){
  it('should serialize booleans with a model', function(){
    var rules = { 'user': true }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('user', model_under_test.user);
  })

  it('should serialize functions with a model', function(){
    var rules = { 'fullname': function() { return this.first_name + ' ' + this.last_name; } }
    var model = Serializer(rules, model_under_test);

    model.should.have.property('fullname', model_under_test.first_name+' '+model_under_test.last_name);
  })

  it('should serialize all models in a collection', function() {
    var rules = {
      'user': true,
      'fullname': function() { return this.first_name + ' ' + this.last_name; }
    }
    var collection = Serializer(rules, [model_under_test, model_under_test]);

    collection.should.be.instanceof(Array).and.have.lengthOf(2);
    collection.map(function(user){
      user.should.have.property('user', model_under_test.user);
      user.should.have.property('fullname', model_under_test.first_name+' '+model_under_test.last_name);
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
