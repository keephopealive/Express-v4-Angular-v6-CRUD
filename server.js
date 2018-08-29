const path = require('path');

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Mongoose ============ 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petshelter_db')
const PetSchema = mongoose.Schema({
    name: { type: String,  required: [true, 'Name is required.' ], minlength: [3, 'Name must be at least 3 characters long.']},
    type: { type: String,  required: [true, 'Type is required.' ], minlength: [3, 'Type must be at least 3 characters long.']},
    description: { type: String,  required: [true, 'Description is required.' ], minlength: [3, 'Description must be at least 3 characters long.']},
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String }
});
mongoose.model('Pet', PetSchema);
const Pet = mongoose.model('Pet');


// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ Static Routes ============ 
app.use(express.static(path.join(__dirname, "Angular-PetShelter/dist/Angular-PetShelter")));

// ============ Routes ============ 
// Get All
app.get('/api/pets', function (request, response) {
    console.log("Server > app.get /api/gets");
    Pet.find({}, function(err, pets) {
        response.json(pets);    
    })
})
// Get One
app.get('/api/pets/:id', function (request, response) {
    Pet.findById(request.params.id, function(err, pet){
        if(pet){
            response.json(pet);
        } else {
            response.json(false);
        }
    }) 
})
// Update
app.put('/api/pets/:id', function (request, response) {
    Pet.findByIdAndUpdate(request.params.id, request.body, function(err, data){
        response.json(true);
    })
})
// Create
app.post('/api/pets', function (request, response) {
    const petInstance = new Pet(request.body);
    petInstance.save(function(err){
        if (err) {
            
            response.json({status: false, error: err});
        } else {
            response.json({status: true});
        }
    })

})
// Delete
app.delete("/api/pets/:id", function(request, response) {
    Pet.deleteOne({_id: request.params.id}, function(err, data){
        response.json(true);
    })
})


app.all("*", function(request, response){
    response.sendFile(path.resolve("./Angular-PetShelter/dist/Angular-PetShelter/index.html"));
})

// ============ Server ============ 
app.listen(8000);
