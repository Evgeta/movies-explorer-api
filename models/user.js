const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Неизвестный',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Необходимо ввести корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
