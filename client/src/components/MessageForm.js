import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import "./MessageForm.css";
import { AppContext } from "../context/appContext";

const MessageForm = () => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  const todayDate = getFormattedDate();

  const scrollToBottom = () => {
    messageEndRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log("room-messages", roomMessages);
    setMessages(roomMessages);
  });

  return (
    <>
      <div className="message-output">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                Your conversation with {privateMemberMsg.name}
                <img src={privateMemberMsg.picture} className="conversation-profile-picture"/>
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => {
            return (
              <div key={idx}>
                <p className="alert alert-info text-center message-date-indicator">
                  {date}
                </p>
                {messagesByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => (
                    <div
                      className={
                        sender?.email === user?.email
                          ? "message"
                          : "incoming-message"
                      }
                      key={msgIdx}
                    >
                      <div className="message-inner">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={sender.picture}
                            style={{
                              width: 35,
                              height: 35,
                              objectFit: "cover",
                              borderRadius: "50%",
                              marginRight: 10,
                            }}
                          />
                          <p className="message-sender">
                            {sender._id === user?._id ? " You" : sender.name}
                          </p>
                        </div>
                        <p className="message-content">{content}</p>
                        <p className="message-timestamp-left">{time}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          })}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={10}>
            <FormGroup>
              <FormControl
                disabled={!user}
                type="text"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></FormControl>
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button
              style={{
                // flexBasis: '80px',
                width: "100%",
                backgroundColor: "orange",
              }}
              variant="primary"
              type="submit"
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
