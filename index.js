var Serializer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Serializer = (function() {
  function Serializer() {
    this._adapt = bind(this._adapt, this);
    this["do"] = bind(this["do"], this);
  }

  Serializer.prototype["do"] = function(rules, data) {
    if (Array.isArray(data)) {
      return data.map((function(_this) {
        return function(item) {
          return _this._adapt(rules, item);
        };
      })(this));
    } else if (typeof data === 'object') {
      return this._adapt(rules, data);
    } else {
      return null;
    }
  };

  Serializer.prototype._adapt = function(rules, original_model) {
    var key, rule, transformed_model, value;
    if (original_model == null) {
      original_model = {};
    }
    transformed_model = {};
    for (key in rules) {
      rule = rules[key];
      if (rule === true) {
        transformed_model[key] = original_model[key];
      }
      if (typeof rule === 'object' && !Array.isArray(rule)) {
        transformed_model[key] = this._adapt(rule, original_model);
      }
      if (typeof rule === 'string') {
        value = void 0;
        rule.split('.').map(function(ikey, index) {
          if (index === 0) {
            return value = original_model[ikey] || false;
          } else {
            if (value && value[ikey]) {
              return value = value[ikey];
            } else {
              return value = false;
            }
          }
        });
        transformed_model[key] = value;
      }
      if (typeof rule === 'function') {
        transformed_model[key] = rule.call(original_model) || false;
      }
      if (!transformed_model[key]) {
        delete transformed_model[key];
      }
    }
    return transformed_model;
  };

  return Serializer;

})();

module.exports = (new Serializer())["do"];