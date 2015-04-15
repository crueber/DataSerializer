# Copyright(c) 2015 Christopher Rueber <crueber@gmail.com>
# MIT Licensed

class ObjectSerializer

  constructor: () -> 

  do: (rules, data) =>
    if Array.isArray(data)
      data.map (item) =>
        @_adapt rules, item
    else if typeof data is 'object'
      @_adapt rules, data
    else
      null

  _adapt: (rules, original_model = {}) =>
    transformed_model = {}

    for key, rule of rules
      if rule is true
        transformed_model[key] = original_model[key]

      if typeof rule is 'object' and not Array.isArray(rule)
        transformed_model[key] = serializer.do rule, original_model # Aaagh, recursion!

      if typeof rule is 'string'
        value = undefined
        rule.split('.').map (ikey, index) ->
          if index is 0
            value = original_model[ikey] or false
          else
            if value and value[ikey]
              value = value[ikey]
            else
              value = false
        transformed_model[key] = value

      if typeof rule is 'function'
        transformed_model[key] = rule.call(original_model) or false

      if transformed_model[key] isnt 0 and !transformed_model[key]
        delete transformed_model[key]

    transformed_model
    
serializer = new ObjectSerializer()

module.exports = serializer.do
