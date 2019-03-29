var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../model/userDetails');
var sampledemo = require('../model/sampleDemo');

router.post('/signUp', function (req, res) {
    var user = new User({
        firstname: req.body.firstname,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function (err, result) {
        if (err) {
            return res
                .status(500)
                .json({title: 'An error occurred', error: err});
        }
            //res.render('index');
			res.render('index2', {message: 'User created please click here to signin'});

           /*  .status(201)
            .json({message: 'User created', obj: result}); */
    });
});


router.delete('/deleteRecords', function (req, res, next) {
    User.findOne({email:req.body.email},function (err, result) {
        User.findByIdAndRemove({_id:result._id},function(err,data){
            res.json({
                Message:"Record Deleted Successfully"
            })
        })

    })
    
});


router.put('/updaterecords/:emailId', function (req, res, next) {
    User.findOne({email:req.params.emailId},function (err, result) {
        result.firstname=req.body.firstname;
        result.mobile=req.body.mobile;

        result.save(function(err,data){
            res.json({
                Message:"Record Updated Successfully"
            })
        })

    })
    
});

router.get('/signUp', function(req, res, next) {
    res.render('signup2', { title: 'Welcome to piyush class' });
  });
  router.get('/deleteRecords', function(req, res, next) {
    res.render('deleteRecords', { title: 'Welcome to piyush class' });
  });


router.get('/dashboard', function (req, res, next) {
    if(!req.session.user){
        res.render('index', {
            message: 'please login to access the dashboard'
        });
    }else{
        res.render('dashboard', {message: 'welcome to dashboard you have successfully loged in'});
    }
    
});

router.get('/sampleDemo', function (req, res, next) {

    user
    .find({}, function (err, user) {
        if (err) {
console.log(err);
        }else{
            res.json({Result:user});
        }
    })

    
});
router.get('/logout', function (req, res, next) {
    req.session.destroy(); // destroying the session
    res.render('signup2', {message: 'logout successfuly'});
    
});
router.post('/signin', function (req, res, next) {
    try {
        User
            .findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) {
                    return res
                        .status(500)
                        .json({title: 'An error occurred', error: err});
                }
                if (!user) {
                    return res
                        .status(401)
                        .json({
                            title: 'Login failed',
                            error: {
                                message: 'Invalid login credentials'
                            }
                        });
                }
                try {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        return res
                            .status(401)
                            .json({
                                title: 'Login failed',
                                error: {
                                    message: 'Invalid login credentials'
                                }
                            });
                    }
                    // res.status(200).json({     message: 'Successfully logged in',     userId:
                    // user._id });
                    req.session.user=user; // setting the session
                    // user{
                    //     "name":"sss",
                    //     "username":"rerte",
                    //     "password":"345345"
                    // }
                    res.render('dashboard', {
                        message: 'Successfully logged in ! welcome to dashboard',
                        name:user.firstname
                    });
                    //res.status(201).redirect("dashboard")

                } catch (error) {
                    return res.json({"error": error.message})
                }

            });
    } catch (error) {
        return res.json({"error": error})
    }
});

module.exports = router;
