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

  useEffect(() => {
    if(user) {
        setCurrentRoom('general')
        getRooms()
        socket.emit('join-room', 'general')
        socket.emit('new-user')
    }
  }, [])

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroupItem key={idx}>{room}</ListGroupItem>
        ))}
      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member) => (
          <ListGroupItem style={{ cursor: "pointer" }} key={member._id}>
            {member.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
