const mongoose = require('mongoose');

/* Subtitle schema */

const subtitleSchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    user: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    start: String,
    end: String,
    text: String,
}, { timestamps: true });

/* Subtitle model */

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

module.exports = Subtitle;