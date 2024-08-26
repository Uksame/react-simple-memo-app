export const GRP_ACTIONS = {
  ADD_GROUP: "add-group",
  EDIT_GROUP: "edit-group",
  DELETE_GROUP: "delete-group",
};

export const reducerForGroups = (groups, action) => {
  switch (action.type) {
    case GRP_ACTIONS.ADD_GROUP:
      return [...groups, newGroup(action.payload)];
    case GRP_ACTIONS.EDIT_GROUP:
      return groups.map((group) => {
        if (group.id === action.payload.id)
          return { ...group, name: action.payload.name };
        else return group;
      });
    case GRP_ACTIONS.DELETE_GROUP:
      return groups.filter((group) => group.id !== action.payload.id);
    default:
      return groups;
  }
};

export const newGroup = ({ name }) => {
  return {
    id: Date.now(),
    name: name,
    marked: false,
    edit: false,
  };
};
