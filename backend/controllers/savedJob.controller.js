const { savedJob } = require('../models/index');
const db = require('../models/index')
const SavedJob = db.savedJob


exports.create = (req, res) =>{
                                    //POST (working)
    const savedJob = new SavedJob({
        location: req.body.location,
        language: req.body.language,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        heardBack: {
            status: req.body.heardBack.status,
            scheduledInterview: req.body.heardBack.scheduledInterview,
            closed: req.body.heardBack.closed,
        },
        appliedTo: {
            appStatus: req.body.appliedTo.appStatus,
            date: req.body.appliedTo.date,
            notes: [
                req.body.appliedTo.notes
            ]
        }
    })
    savedJob.save(savedJob)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message:
            err.message || "some error occured"
        });
    });
}



                    // GET   (working) 
exports.findAll = (req, res) =>{
    SavedJob.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message:
            err.message || "some error occured in findAll"
        })
    })
}


            //DELETE   (working)
exports.delete = (req, res) =>{
    const id = req.params.id
    SavedJob.remove(
        {_id: id},
    ).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete id=${id}. fix the delete controller!`
          });
        } else res.send({ message: "saved job was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Tutorial with id=" + id
        });
      });
  };



        //GET by heardback: true  (working)
exports.findAllHeardBack = (req, res)=>{
    SavedJob.find({"heardBack.status": true} )
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Cannot find all heard back jobs!"
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error finding jobs by status heard back true" 
        });
    });
}




        //GET by applied: true  (working)
exports.findAllAppliedTo = (req, res)=>{
    SavedJob.find({"appliedTo.appStatus": true} )
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Cannot find all heard back jobs!"
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error finding jobs by status heard back true" 
        });
    });
}


        //PUT   update note array
exports.updateNote = (req, res)=>{
    const id= req.params.id

    SavedJob.update(
        {_id: id},
        // {language: req.body.language}
        {"appliedTo.notes": req.body.notes}
    ).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update notes with id=${id}.`
          });
        } else res.send({ message: "note was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating notes with id=" + id
        });
      });
  };


















                        //GET (by heardback: true)
//   exports.findAllHeardBack = (req, res)=>{
//     SavedJob.find({location:"boston"})
//     .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: "Cannot find all heard back jobs!"
//           });
//         } else res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error finding jobs by status heard back true" 
//         });
//       });
//     }
