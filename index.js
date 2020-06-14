const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));

 app.use(express.urlencoded());

app.use(express.static('assets'));
//middleware1 

// app.use(function(req,res,next){
//    console.log('middleware 1 called');
//    next();
// });

// app.use(function(req,res, next){
//    console.log('middleware 2 called');
//    next();
// });

 var contactList=[
   {
     name:"Rahul",
     phone:"8750037661"
   },
   {
     name:"Shashi",
     phone:"9997460406"
   },
   {
     name:"Gargi Singh",
     phone:"8484848843"
   }
 ]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>Cool , it is running or is it</h1>')
   Contact.find({},function(err,contacts){
    if(err){
      console.log('Error in fetching contacts from db');
      return;
    }
    return res.render('home',{
      title:"Contacts  List",
      contact_list:contacts

   });
    
  });
});

app.get('/practice',function(req,res){
  return res.render('practice',{
      title:"Let us play with ejs"
  });
});

app.post('/create-contact',function(req,res){
  // return res.redirect('/practice');
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phone);
  // contactList.push({
  //   name:req.body.name,
  //   phone:req.body.phone
  // });
    // contactList.push(req.body);
 
     Contact.create({
       name:req.body.name,
       phone:req.body.phone
     },function(err,newContact){
       if(err){
         console.log('error in creating the contact');
         return;
       }
       console.log('******',newContact);
       return res.redirect('back');
     });
    // return res.redirect('back');
});

app.get('/delete-contact',function(req,res){
    //  console.log(req.query); 
    let id=req.query.id;;

    Contact.findByIdAndDelete(id,function(err){
      
      if(err){
        console.log('error  in deleting an object from database');
        return;
      }
      return res.redirect('back');
    });
    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone); 
    // if(contactIndex!=-1){
    //   contactList.splice(contactIndex,1);
    // }
});
app.listen(port,function(err){
     if(err){ console.log('Error in running the server',err);}

     console.log('Yup! My Express Server is running on Port:',port);
});   


