const User = require('./models/user');

/* User CRUD operations */

const removeUser = async (_id) => {
    const user = await User.findByIdAndDelete(_id);

    return user;
}

module.exports = {
    removeUser,
}