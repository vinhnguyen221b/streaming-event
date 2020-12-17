import React from "react";

const ChatList = ({ list }) => {
  return (
    <>
      <div className="chat-container">
        <ul className="chat-list">
          {list.map((item, index) => (
            <li key={index}>
              <div className="chat-inner">
                <div className="chat-content">
                  <p>
                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {item.author}:{" "}
                    </span>
                    {item.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
