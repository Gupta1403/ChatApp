const userModel=require('./model')

const users = [];

const addUser = ({ id,email, name, roomId }) => {
  console.log(id,email,name,roomId);
  email=email.trim().toLowerCase()
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();
  console.log(email,name,roomId);
  const existingUser = users.find((user) => user.roomId === roomId && user.email === email);

  if(!email || !roomId) return { error: 'Email and roomId are required.' };
  if(existingUser) return { error: 'User exists with this emailId.' };

  const user = { id,email, name, roomId };

  users.push(user);
  userModel.create({ id,email, name, roomId ,date:new Date()}, function (err,) {
    if (err) return handleError(err);
  })

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };