// when user is not logged in, redirecr page to login page. Need to login to view page.
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {    
      next();
    }
  };
  
  module.exports = withAuth;