import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'osama hi',
    email: 'john@example.com',
    password: bcrypt.hashSync('123457', 10),
  },
  {
    name: 'foad al',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123458', 10),
  },
]

export default users