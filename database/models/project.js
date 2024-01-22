const mongoose = require('mongoose');

/* Project schema */

const projectSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: String,
    link: String,
    subtitles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtitle',
    }],
}, { timestamps: true });

/* Project model */

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;