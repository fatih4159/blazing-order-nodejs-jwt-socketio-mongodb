
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;

const Role = require('./models/Role');
const User = require('./models/User');
const Product = require('./models/Product');
const Room = require('./models/Room');
const Table = require('./models/Table');
const Order = require('./models/Order');
const Reservation = require('./models/Reservation');
const DEFAULT_ROLES = require('./constants/role.constants')
const DEFAULT_USERS = require('./constants/user.constants')

module.exports.fillDatabase = async () => {
    // create for each Role in ROLES a Role
    for (const role of DEFAULT_ROLES) {
        await createRole(role);
    }
}

async function createRole(roleName) {
    logger.info('creating default role for ',roleName)
    const existingRole = await Role.findOne({ name: roleName });
    if (existingRole) {
        logger.info('Role ',existingRole,'already exists');
        return;
    }
    
    const role = new Role({ name: roleName });
    logger.info("created role: " + role);
    role.save();
}

async function createUser(username, password, roles) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        logger.info("User already exists");
        return;
    }

    const rolesarray = await getRoleIds([roles]);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword });
    logger.info("createduser:" + user);
    user.save();
}

// create a function which finds all roles of a roles string array and returns its ids as an array
async function getRoleIds(roles) {
    const roleIds = [];
    for (const role of roles) {
        logger.info(role);
        const roleObject = await Role.findOne({ name: role }).then((role) => { return role });
        logger.info(roleObject);
        roleIds.push(roleObject._id);
    }
    return roleIds;
}

// set user roles
async function setUserRoles(username, roles) {
      // set user role to admin
      User.findOne({ username: 'admin' }).then((user) => {
        getRoleIds(['admin']).then((roleIds) => { 
             user.roles = roleIds; 
             user.save(); });
    }
    )
}
