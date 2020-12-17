import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Tabs, Input, Image } from "antd";
// import ReactHtmlParser from "react-html-parser";
import logo from "../logo.svg";
import VideoPlayer from "./common/VideoPlayer";
import cmtData from "../cmtData.json";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import ChatList from "./common/ChatList";
import { Redirect } from "react-router-dom";

const { TabPane } = Tabs;
const Streaming = (props) => {
  const [height, setHeight] = useState(0);
  const [divSpan, setDivSpan] = useState(24);
  const refContainer = useRef(null);
  const refVideo = useRef(null);
  const isTablet = useMediaQuery({ query: "(max-width: 1200px)" });
  useEffect(() => {
    setHeight(
      refContainer.current.clientHeight - refVideo.current.clientHeight
    );
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      const chatHeight =
        refContainer.current.clientHeight - refVideo.current.clientHeight;
      setHeight(chatHeight);
      // console.log(refContainer.current.clientHeight);
      // console.log(refVideo.current.clientHeight);
      // // console.log(height);
      // if (
      //   refContainer.current.clientHeight / refVideo.current.clientHeight <
      //   2
      // ) {
      //   setDivSpan(20);
      // } else if (
      //   refContainer.current.clientHeight / refVideo.current.clientHeight <
      //   1.5
      // ) {
      //   setDivSpan(16);
      // } else {
      //   setDivSpan(24);
      // }
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [height]);

  return (
    <>
      <Row
        ref={refContainer}
        style={
          isTablet && {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        }
      >
        <Col
          xs={{ span: divSpan }}
          xl={{ span: divSpan - 9 }}
          className="left-container"
          style={{ transition: "all ease 0.3s" }}
        >
          <Row
            style={
              !isTablet
                ? {
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
            }
          >
            <Col span={24} className="video-container" ref={refVideo}>
              <div
                className="wrapper"
                style={{
                  width: "100%",
                  paddingBottom: "56.25%",
                  position: "relative",
                  zIndex: 1300,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  {" "}
                  <VideoPlayer src="" />
                </div>
              </div>
            </Col>
            {!isTablet && (
              <Col
                span={24}
                style={{
                  height: height ? height : "30vh",
                  overflowY: "hidden",
                  display: "block",
                  padding: "1rem 1rem",
                }}
              >
                <div className="chat-box">
                  <ChatList list={cmtData} />
                </div>
              </Col>
            )}
            {!isTablet && (
              <Col span={24}>
                <div className="input-chat">
                  <div style={{ position: "relative" }}>
                    <Input
                      placeholder="Type your message"
                      style={{
                        fontSize: "16px",
                        padding: "10px",
                        border: "1px solid #1b3862",
                      }}
                    />
                    <SmileOutlined style={{ right: "55px" }} />
                    <SendOutlined style={{ right: "25px" }} />
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          xl={{ span: 9 }}
          className="right-container"
          style={isTablet && { height: height }}
        >
          <div className="card-container">
            <Tabs
              defaultActiveKey="1"
              type="card"
              className="event-tab"
              centered
            >
              {isTablet && (
                <TabPane
                  tab="Chat"
                  key="1"
                  style={{
                    height: "calc(100vh - 50px)",
                    position: "relative",
                  }}
                >
                  <Col
                    span={24}
                    style={{
                      height: height ? height : "30vh",
                      overflowY: "hidden",
                      display: "block",
                      padding: "1rem 1rem",
                    }}
                  >
                    <div className="chat-box">
                      <ChatList list={cmtData} />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="input-chat">
                      <div style={{ position: "relative" }}>
                        <Input
                          placeholder="Type your message"
                          style={{
                            fontSize: "16px",
                            padding: "10px",
                            border: "1px solid #1b3862",
                          }}
                        />
                        <SmileOutlined style={{ right: "55px" }} />
                        <SendOutlined style={{ right: "25px" }} />
                      </div>
                    </div>
                  </Col>
                </TabPane>
              )}
              <TabPane
                tab="Question"
                className="tab-three"
                key={!isTablet ? "1" : "2"}
                style={{
                  height: "calc(100vh - 10px)",
                  position: "relative",
                }}
              >
                <Col span={24} style={{ height: "100%" }}>
                  <div
                    className="question"
                    style={{
                      position: "relative",
                      height: !isTablet ? "calc(100% - 10px)" : height - 50,
                    }}
                  >
                    <div className="question-form">
                      <form
                        action="/question"
                        method="post"
                        style={{ position: "relative" }}
                      >
                        <div className="ask-label">Ask a question</div>
                        <input
                          type="text"
                          name=""
                          id=""
                          style={{ width: "100%", padding: "5px" }}
                        />
                        <SendOutlined
                          style={{
                            right: "15px",
                            fontSize: "22px",
                            bottom: "5px",
                          }}
                        />
                      </form>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        marginLeft: 0,
                        marginRight: 0,
                      }}
                    >
                      <Image
                        className="logo"
                        src={logo}
                        style={{ textAlign: "center", margin: "1rem 0" }}
                      />
                    </div>
                  </div>
                </Col>
              </TabPane>

              <TabPane
                tab="Programme"
                key="3"
                style={{
                  height: "calc(100vh - 10px)",
                  position: "relative",
                }}
              >
                <div className="wrap-box">
                  <div className="programme-content">
                    <table className="programme-table table">
                      <tbody>
                        <tr>
                          <td>9.45am</td>
                          <td>Registration</td>
                        </tr>
                        <tr>
                          <td>10.00am</td>
                          <td>Welcome Address by STB</td>
                        </tr>
                        <tr>
                          <td>10.15am</td>
                          <td>
                            Keynote Address by Alushca Ritchie
                            <br />
                            Alushca Ritchie qualified as a tourist guide for the
                            Western Cape of South Africa in 2010 and was elected
                            WFTGA President in 2017and 2019. She will be sharing
                            on how tourist guides in other countries are
                            adapting to the new normal as well as insights on
                            possible trends and innovations that are shaping the
                            future of the industry.
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="2">10.45am</td>
                          <td colSpan="2">Concurrent Breakout Sessions</td>
                        </tr>
                        <tr>
                          <td>
                            Session 1: Online Experiences by Kelsey Tonner
                            <br />
                            Kelsey Tonner is an experienced global tour guide,
                            and the founder of the Be a Better Guide Project and
                            Online Tourism Academy. Hear from Kelsey Tonner as
                            he offers his views and advice for tourist guides
                            wanting to create online experiences. The session
                            will cover items such as what can one create online,
                            what equipment does one need and what if one does
                            not have tech and video skills. He will also share
                            case studies of tour operators who took the plunge
                            and created online experiences in the wake of the
                            pandemic.
                            <hr />
                            Session 2: Social Media and Tours by Adeline Tang^
                            <br />
                            Adeline Tang is the owner of a travel agent company.
                            She has close to 15 years of experience in the
                            industry and has been working closely with Trip.com.
                            Hear from her as she shares her experiences and
                            views on tour curation and using social media
                            platforms to market tours and proliferate outreach.
                            The session will cover the role of personal
                            branding, social media content strategy and driving
                            visibility.
                            <br />
                            ^Session will be in Mandarin and subtitled in
                            English.
                          </td>
                        </tr>
                        <tr>
                          <td>11.15am</td>
                          <td>
                            Dialogue Session with Speakers, Society of Tourist
                            Guides (Singapore) and STB
                          </td>
                        </tr>
                        <tr>
                          <td>12pm</td>
                          <td>End of Event</td>
                        </tr>
                        <tr>
                          <td>11.15am</td>
                          <td>
                            Dialogue Session with Speakers, Society of Tourist
                            Guides (Singapore) and STB
                          </td>
                        </tr>
                        <tr>
                          <td>12pm</td>
                          <td>End of Event</td>
                        </tr>
                        <tr>
                          <td>11.15am</td>
                          <td>
                            Dialogue Session with Speakers, Society of Tourist
                            Guides (Singapore) and STB
                          </td>
                        </tr>
                        <tr>
                          <td>12pm</td>
                          <td>End of Event</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Streaming;
