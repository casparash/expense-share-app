import { groups } from "../data/groups";
import { users } from "../data/users";

export function getAllGroups() {
  return groups;
}

export function getGroup(id: number) {
  const group = groups.find((group) => group.id === id);

  return group;
}

export function addGroup(name: string, memberIds: number[]) {
  for (const id of memberIds) {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return {
        success: false,
        invalidUserId: id,
      };
    }
  }

  const newGroup = {
    id: groups.length + 1,
    name,
    memberIds,
  };

  groups.push(newGroup);

  return {
    success: true,
    group: newGroup,
  };
}

export function deleteGroup(id: number) {
  const index = groups.findIndex((group) => group.id === id);

  if (index === -1) {
    return null;
  }

  return groups.splice(index, 1)[0];
}
