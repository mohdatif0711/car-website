var express = require("express");
var router = express.Router();

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";



// login user
router.post('/login', (req, res) => {
    console.log("Login Request -")
    console.log(req.body.email);
    console.log(req.body.password);
    MongoClient.connect(url, function (err, db) {
  if (err) throw err;
   var dbo = db.db("mydb");
    dbo.collection("Details").find({ "email": req.body.email }).toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching  Names!");
        } else {
       console.log("Entry Found - ")
       console.log(result);

            if (result[0].password == req.body.password)
                res.redirect('/route/dashboard');
            else
                res.end("Login Not Successful...!");
               }
            });
    });
});

router.post('/register', (req, res) => {
    console.log(req.body.mobile)
    console.log(req.body.email);
    console.log(req.body.password);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("Details").insertOne({ email: req.body.email, password: req.body.password, mobile: req.body.mobile }, function (err, res) {
        });
    });
    console.log("User Registered with email " + req.body.email);
    //res.redirect('/route/homepage');
    res.render('base', { title : "Login System"});
});

router.get('/contact', (req, res) => {
    console.log("contact called");
    res.render('base', { title : "Login System"});

});



// route for dashboard
router.get('/dashboard', (req, res) => {

       //  res.render('dashboard')
        res.render('homepage')
    
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.render('base', { title: "Express", logout: "logout Successfully...!" })
        }
    })
})


//contactapi
router.post('/contactapi', (req, res) => {
    console.log(req.body.name)
    console.log(req.body.subject)
    console.log(req.body.email);
    console.log(req.body.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("CONTACT").insertOne({ name:req.body.name, email: req.body.email, subject: req.body.subject, query: req.body.query }, function (err, res) {
        });
    });
    console.log("User Contact us Request Received with email " + req.body.email);
    //res.redirect('/route/homepage');
    res.send("Successful");
    //res.render('base', { title : "Login System"});
});

module.exports = router;