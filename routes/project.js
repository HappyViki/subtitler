const express = require('express');
const router = express.Router();

const {
    addProject,
    getUserProjects,
    getProject,
    updateProject,
    removeProject,
} = require('../database/project');

// Define your routes for project CRUD operations.

router.route('/projects')

/* READ multiple projects */

.get(async (req, res) => {
	try {
        const projects = await getUserProjects({
            user: req.user._id,
        });
        
        res.send({
            data: projects,
            message: "Successfully got project!",
        });
	} catch (err) {
		res.send({
			error: 'Failed to get project',
		});
	}
});

router.route('/project/:projectId')

/* READ a project */

.get(async (req, res) => {
	try {
        const project = await getProject({
            _id: req.params.projectId, 
            user: req.user._id,
        });
        
        res.send({
            data: project,
            message: "Successfully got project!",
        });
	} catch (err) {
		res.send({
			error: 'Failed to get project',
		});
	}
})

/* CREATE a project */

.post(async (req, res) => {
	try {
        await addProject({
            data: {
            ...req.body.data,
			user: req.user._id,
            },
        })
    
        res.send({
            message: "Successfully added project!",
        });
	} catch (err) {
		res.send({
			message: 'Failed to add project',
		});
	}
})

/* UPDATE a project */

.put(async (req, res) => {
	try {
        const project = await updateProject({
            _id: req.params.projectId, 
            data: req.body.data,
        });

        res.send({
            data: project,
            message: "Successfully updated project!",
        });
	} catch (err) {
		res.send({
			error: 'Failed to update project',
		});
    }
})
    
/* DELETE a project */

.delete(async (req, res) => {
    try {
        const project = await removeProject({
            _id: req.params.projectId
        });

        res.send({
            data: project,
            message: "Successfully removed project!",
        });
    } catch (err) {
        res.send({
            error: 'Failed to remove project',
        });
    }
});

module.exports = router;