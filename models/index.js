var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function(cb) {
  console.log("We are live!");
})

var priceRange = ['$', '$$', '$$$', '$$$$', '$$$$$'];

var placeSchema = new mongoose.Schema({
  address:    {type: String, require: true},
  city:       {type: String, require: true},
  state:      {type: String, require: true},
  phone:      {type: String, require: true},
  location:   {type: Array,  require: true}
});

var hotelSchema = new mongoose.Schema({
  name:       {type: String, require: true},
  place:      [placeSchema],
  num_stars:  {type: Number, min: 1, max: 5, require: true},
  amenities:  {type: String, require: true}
});

var activitySchema = new mongoose.Schema({
  name:       {type: String, require: true},
  place:      [placeSchema],
  age_range:  {type: String, require: true}
});

var restaurantSchema = new mongoose.Schema({
  name:       {type: String, require: true},
  place:      [placeSchema],
  cuisines:   {type: String, require: true},
  price:      {type: Number, min: 1, max: 5, require: true}
});



var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports = {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant
}
