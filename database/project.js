const Project = require('./models/project');
const User = require('./models/user');

/* Project CRUD operations */

const addProject = async ({ data }) => {
    const project = await new Project(data);
    await project.save();

    // Add subtitle to project
    const user = await User.findOne({ _id: data.user });    
    await user.projects.push(project);
    await user.save();

    return project;
}

const getUserProjects = async ({ user }) => {    
    const projects = await Project.find({ user })
    .populate('user subtitles')
    .exec();

    return projects;
}

const getProject = async ({ _id }) => {
    const project = await Project.findOne({ _id });

    return project;
}

const updateProject = async ({ _id, data }) => {    
    const project = await Project.findByIdAndUpdate(_id, data);
    await project.save();

    return project;
}

const removeProject = async ({ _id }) => {
    const project = await Project.findByIdAndDelete(_id);

    return project;
}

module.exports = {
    addProject,
    getUserProjects,
    getProject,
    updateProject,
    removeProject,
}