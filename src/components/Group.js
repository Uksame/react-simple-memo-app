import { useEffect, useState } from "react";
import { GRP_ACTIONS } from "../components/groupsReducer";
import { Link } from "react-router-dom";

export function ListGroups({ groups }) {
  const listGroups = groups.map((group) => (
    <option key={group.id}>{group.name}</option>
  ));

  return (
    <div>
      <div>
        <select>{listGroups}</select>
      </div>
    </div>
  );
}

function GroupLabel({ group, dispatchGroup }) {
  const [groupName, setGroupName] = useState(group.name);

  useEffect(() => {
    setGroupName(group.name);
  }, [group.name]);

  const handleDelete = (id) => {
    dispatchGroup({
      type: GRP_ACTIONS.DELETE_GROUP,
      payload: { id },
    });
  };

  const handleEdit = () => {
    dispatchGroup({
      type: GRP_ACTIONS.EDIT_GROUP,
      payload: { id: group.id, name: groupName },
    });

    setGroupName(group.name);
  };

  return (
    <div className="group-item">
      <input value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      {group.name !== groupName && <button onClick={handleEdit}>Save</button>}
      {group.name !== groupName && (
        <button onClick={() => setGroupName(group.name)}>Cancel</button>
      )}
      {group.name === groupName && (
        <button onClick={() => handleDelete(group.id)}>
          Delete
        </button>
      )}
    </div>
  );
}

function Group({ groups, dispatchGroup }) {
  const [groupName, setGroupName] = useState([]);
  const [adding, setAdding] = useState(false);

  const NewGroup = (handleFunction) => (
    <form className="group-item" onSubmit={handleFunction}>
      <input
        type="text"
        placeholder="Group Name..."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button  type="submit">
        Save
      </button>{" "}
      <button
        onClick={() => {
          setAdding(false);
          setGroupName("");
        }}
        type="submit"
      >
        Cancel
      </button>
    </form>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchGroup({
      type: GRP_ACTIONS.ADD_GROUP,
      payload: { name: groupName },
    });
    setGroupName("");
    setAdding(false);
  };

  const ManageGroups = groups.map((group) => (
    <li key={group.id}>
      <GroupLabel dispatchGroup={dispatchGroup} group={group} />
    </li>
  ));

  return (
    <div>
      <div className="groups">
        <Link to={"/"}>
          <button className="groups-return">RETURN</button>
        </Link>
        <ul className="groups-list" style={{ listStyle: "none" }}>
          {ManageGroups}
          {adding ? (
            NewGroup(handleSubmit)
          ) : (
            <button  onClick={() => setAdding(true)}>
              Add new...
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Group;
