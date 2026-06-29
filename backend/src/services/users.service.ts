import { users } from "../data/users";

export function getAllUsers() {
  return users;
}

export function getUser(id: number) {
  const user = users.find((user) => user.id === id);

  return user;
}

export function addUser(name: string, email: string) {
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  return newUser;
}

export function deleteUser(id: number) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1)[0];
}
