import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'osama al',
    email: 'osama12@outlook.com',
    password: bcrypt.hashSync('123457', 10),
  },
]

export default users
