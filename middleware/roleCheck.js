const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  const isOrganizerOrAdmin = (req, res, next) => {
    // Check if the user is either an organizer or an admin
    if (req.user.role !== 'Organizer' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  const isOwnerOrAdmin = (req, res, next) => {
    // Check if the user is either an owner or an admin
    if (req.user.role !== 'Owner' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  const isAttendee = (req, res, next) => {
    if (req.user.role !== 'Attendee') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  module.exports = { isAdmin, isAttendee, isOrganizerOrAdmin, isOwnerOrAdmin };
  