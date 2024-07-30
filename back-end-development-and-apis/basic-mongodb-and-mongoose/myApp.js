require('dotenv').config();
const mongoose = require('mongoose');
MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// define the schema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: {
    type: [String],
    required: true
  }
})

// compile model from schema
let Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  let daveMatthews = new Person({
    name: "Dave Matthews",
    age: 57,
    favoriteFoods: ["Alligator Pie"]
  });
  daveMatthews.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

arrayOfPeople = [
  {
    name: "Dave Matthews",
    age: 57,
    favoriteFoods: ["Alligator Pie"]
  },
  {
    name: "Ben Folds",
    age: 57,
    favoriteFoods: ["A coke", "Some fries", "The roast beef combo that's only $9.95."]
  },
  {
    name: "Maggie Rogers",
    age: 30,
    favoriteFoods: ["Want want", "Tea", "Coffee"]
  },
  {
    name: "Eminem",
    age: 51,
    favoriteFoods: ["Mom's spaghetti"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, person) => {
    if (err) return console.error(err);
    // adds the favorite food to the array
    person.favoriteFoods.push(foodToAdd);
    // saves the updated person record
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, person) => {
    if (err) return console.error(err);
    // update the age
    person.age = ageToSet;
    // save the updated person record
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
