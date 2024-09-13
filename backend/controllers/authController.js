const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/User');

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashedPassword, role });
  req.session.user = { id: user.id, role: user.role };  // Save user information in session
  res.json({ message: 'User created successfully', user: req.session.user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  req.session.user = { id: user.id, role: user.role };  // Save user information in session
  res.json({ message: 'Login successful', user: req.session.user });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid');  // Clear the session cookie
    res.json({ message: 'Logout successful' });
  });
};

module.exports = { signup, login, logout };
