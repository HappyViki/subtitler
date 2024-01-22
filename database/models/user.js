const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/* User schema */

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: String,
	projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
}, { timestamps: true });

/* User functions */

userSchema.plugin(passportLocalMongoose);

/* User model */

const User = mongoose.model('User', userSchema);

module.exports = User;