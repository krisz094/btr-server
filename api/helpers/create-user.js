var bcrypt = require('bcryptjs')

module.exports = {


  friendlyName: 'Create user',


  description: '',


  inputs: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided mac address and/or password are invalid.',
    },
    emailAddressAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs, exits) {

    var attr = {
      email: inputs.email.toLowerCase(),
    }

    if (inputs.password) {
      attr.password = await bcrypt.hash(inputs.password, 10)
      console.log(attr);
      var user = await Muser.create(attr)
        .intercept('E_UNIQUE', () => 'emailAddressAlreadyInUse')
        .intercept({ name: 'UsageError' }, () => 'invalid')
        .fetch()

      return exits.success(user);
    }
    else {
      return exits.invalid('Missing password.');
    }

  }


};

