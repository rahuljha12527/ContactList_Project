// require the library
const mongoose=require('mongoose');

// connect to database wait I'm checking okay
mongoose.connect('mongodb://localhost/contacts_list_db'); 

// acquire the connection (to check if it is successfull)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));


// up and runnig then print the message
db.once('open',function(){
   console.log('Successfully connected to database');
});

//

// before you haven't export your db i guess that was the reason message iw amas not showing how we export db ib ro call me 7404203431 okay
//