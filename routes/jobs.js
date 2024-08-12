 const express = require('express');
 const router = express.Router()
 const {getAllJobs, getOneJob, createJob, updateJob,deleteJob } = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getOneJob).delete(deleteJob).patch(updateJob)

// router.get('/',getAllJobs)
// router.get('/:id',getOneJob)
// router.post('/create',createJob)
// router.patch('/:id',updateJob)
// router.delete('/:id',deleteJob)


 module.exports = router