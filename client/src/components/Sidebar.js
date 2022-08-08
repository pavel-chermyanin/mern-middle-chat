import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const Sidebar = () => {
  // const rooms = ['first room', 'second room', 'third room']
  const user = useSelector((state) => state.user);
  const {
    socket,
    setMembers,
    members,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notifications
  };

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const orderIds = (id1, id2) => {
    if(id1> id2) {
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member)
    const roomId = orderIds(user._id, member._id)
    joinRoom(roomId, false)
  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroupItem
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => joinRoom(room)}
            key={idx}
          >
            {room} {currentRoom !== room && <span></span>}
          </ListGroupItem>
        ))}
      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member) => (
          <ListGroupItem
            disabled={member._id === user._id}
            onClick={() => handlePrivateMemberMsg(member)}
            active={privateMemberMsg?._id === member?._id}
            style={{ cursor: "pointer" }}
            key={member._id}
          >
            {member.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
