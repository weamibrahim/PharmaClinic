

const verifyRoleDoctor = (req, res, next) => {
   
    if (req.user && req.user.role === 'doctor') {
        console.log('User has doctor role',req.user.role);
      
      next();
    } else {
      
      return res.status(403).json({ message: 'Permission denied. doctor access required.' });
    }
  };

  const verifyRolePharmacist = (req, res, next) => {
   
    if (req.user && req.user.role === 'pharmacist') {
        console.log('User has pharmacist role',req.user.role);
      
      next();
    } else {
      
      return res.status(403).json({ message: 'Permission denied. pharmacist access required.' });
    }
  };
  const verifyRoleAdmin = (req, res, next) => {
   
    if (req.user && req.user.role === 'admin') {
       // console.log('User has admin role',req.user.role);
      
      next();
    } else {
      
      return res.status(403).json({ message: 'Permission denied.  admin access required.' });
    }
  };
  
  module.exports = { verifyRoleDoctor, verifyRolePharmacist,verifyRoleAdmin };
  