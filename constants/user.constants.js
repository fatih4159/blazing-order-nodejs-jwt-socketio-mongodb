const roles = require('./role.constants');

const DEFAULT_USERS = [
    {
        username: 'admin',
        password: 'admin',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        roles: [roles.ADMIN]
    },
    {
        username: 'staff',
        password: 'staff',
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        roles: [roles.STAFF]
    },
    {
        username: 'user',
        password: 'user',
        firstname: 'Alice',
        lastname: 'Johnson',
        email: 'alice.johnson@example.com',
        roles: [roles.USER]
    },
    {
        username: 'manager',
        password: 'manager',
        firstname: 'Bob',
        lastname: 'Williams',
        email: 'bob.williams@example.com',
        roles: [roles.MANAGER]
    }
  
];

module.exports = Object.values(DEFAULT_USERS);
