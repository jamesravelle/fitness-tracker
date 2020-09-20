const router = require("express").Router();
var path = require("path");
const db = require("../models");
const { model } = require("../models/workout");

// router.post("/api/transaction", function(req, res){

// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });


    // HTML Routes
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    router.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
    
    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    
    // API Routes
    
    // Used by api.js to get last workout
    router.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    // Creates a new workout in the workout database
    router.post("/api/workouts", (req, res)=> {
        db.Workout.create({type: "workout"})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        })    
    })

    router.put("/api/workouts/:id", (req, res) => {
        const workoutId = req.params.id;
        db.Workout.update(
            { _id: workoutId },
            { 
                $set:{
                    exercises: [ req.body ]
                }
            }
         ).then(data => {
             console.log(data);
             db.Workout.find({_id: workoutId})
             .then(data => {
                 res.json(data[0].exercises);
             })
             .catch(err => {
                 res.json(err);
             });
         }).catch(err => {
             console.log(err);
         })
         

        // db.Workout.find({_id: workoutId})
        //     .then(workout => {
        //         res.json(workout[0].exercises);
        //         updateWorkouts([body]);
        //     })
        //     .catch(err => {
        //         res.json(err);
        //     });

        // function updateWorkouts(exercises){
        //     db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
        //         if(err){
        //             console.log(err)
        //         }
        //     })
        // }
    })

    router.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    }); 

    module.exports = router;