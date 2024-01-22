const express = require('express');
const router = express.Router();

const {
    addSubtitle,
    getProjectSubtitles,
    updateSubtitle,
    removeSubtitle,
} = require('../database/subtitle');

// Define your routes for subtitle CRUD operations.

router.route('/project/:projectId/subtitles')

/* READ multiple subtitles */

.get(async (req, res) => {
	try {
        const subtitle = await getProjectSubtitles({
            project: req.params.projectId,
        });
        
        res.send({
            data: subtitle,
            message: "Successfully got subtitle!",
        });
	} catch (err) {
		res.send({
			error: 'Failed to get subtitle',
		});
	}
});

router.route('/project/:projectId/subtitle/:subtitleId')

/* CREATE a subtitle */

.post(async (req, res) => {
	try {
        await addSubtitle({
            data: {
            ...req.body.data,
            project: req.params.projectId,
			user: req.user._id,
            },
        })
    
        res.send({
            message: "Successfully added subtitle!",
        });
	} catch (err) {
		res.send({
			message: 'Failed to add subtitle',
		});
	}
})

/* UPDATE a subtitle */

.put(async (req, res) => {
	try {
        const subtitle = await updateSubtitle({
            _id: req.params.subtitleId, 
            data: req.body.data,
        });

        res.send({
            data: subtitle,
            message: "Successfully updated subtitle!",
        });
	} catch (err) {
		res.send({
			error: 'Failed to update subtitle',
		});
    }
})
    
/* DELETE a subtitle */

.delete(async (req, res) => {
    try {
        const subtitle = await removeSubtitle({
            _id: req.params.subtitleId
        });

        res.send({
            data: subtitle,
            message: "Successfully removed subtitle!",
        });
    } catch (err) {
        res.send({
            error: 'Failed to remove subtitle',
        });
    }
});

module.exports = router;