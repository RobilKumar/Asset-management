const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error registering new user.');
  }
};

exports.login = async (req, res) => {
    console.log("AuthController ================>Login")
  const { email, password } = req.body;
  console.log(email);
  try {
    // console.log("Login ================> before")
    // const user = await User.findByEmail(email);
    // console.log(user[0].email);
    // console.log("Login ================> after")

    const verifiedUserRows = await User.verifyUser(email, password);
    if (verifiedUserRows.length > 0) {
       return res.json({
            status:200
        })
      console.log('User verified successfully');
    } else {
    return   res.json({
        status:400,
        message:"Invalid ID or Password"
       })
     
    }
    // if (user && await bcrypt.compare(password, user.password)) {
    //   req.session.userId = user.id;
    //   res.redirect('/dashboard');
    // } else {
    //   res.status(401).send('Invalid email or password');
    // }
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
