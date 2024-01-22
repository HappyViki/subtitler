const Subtitle = require('./models/subtitle');
const Project = require('./models/project');

/* Subtitle CRUD operations */

const addSubtitle = async ({ data }) => {
    const subtitle = await new Subtitle(data);
    await subtitle.save();

    // Add subtitle to project
    const project = await Project.findOne({ _id: data.project });    
    await project.subtitles.push(subtitle);
    await project.save();

    return subtitle;
}

const getProjectSubtitles = async ({ project }) => {    
    const subtitles = await Subtitle.find({ project })
    .populate('user project')
    .exec();

    return subtitles;
}

const updateSubtitle = async ({ _id, data }) => {    
    const subtitle = await Subtitle.findByIdAndUpdate(_id, data);
    await subtitle.save();

    return subtitle;
}

const removeSubtitle = async ({ _id }) => {
    const subtitle = await Subtitle.findByIdAndDelete(_id);

    return subtitle;
}

module.exports = {
    addSubtitle,
    getProjectSubtitles,
    updateSubtitle,
    removeSubtitle,
}