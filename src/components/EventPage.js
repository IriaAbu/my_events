import React from "react";
import Axios from "axios";
import styled from "styled-components";

const DescriptionEvent = styled.div`
  background: lightgray;
  border: 1px solid black;
  border-radius: 10px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleEvent = styled.h1`
  color: #004AAD;
  margin-left: 10px;
`;

const PhotoEvent = styled.img`
  display: inline;
  width: 10%;
  height: auto;
  border: 2px solid #004AAD;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 15px;

  @media (max-width: 320px) {
    margin: 10px;
    width: 30%;
  }
`;

const InfoEvent = styled.div`
  display: inline-block;
  width: 70%;
  margin: 10px;
  letter-spacing: 1px;

  @media (max-width: 320px) {
    width: 50%;
  }
`;

const Description = styled.div`
  width: 98%;
  margin-left: 15px;
  margin-bottom: 50px;

  @media (max-width: 320px) {
    width: 90%;
    margin-left: 10px;
  }  
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid #004aad;
  border-radius: 5px;
  color: #004aad;
  padding: 5px 10px;

  &:hover {
    box-shadow: #5e99e8 0 5px 5px;
    cursor: pointer;
    background: #004aad;
    color: white;
  }
  `;

export default class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    Axios.get(
      `http://localhost:42069/json/events/get?app_key=Xgj2Vg7ptjMQR6q2&id=${
      window.location.href.split("id=")[1]
      }`
    ).then((res) => {
      this.setState({ data: res.data });
      console.log(res.data);
    });
  }
  render() {
    const stripHtml = (html) => {
      var tmp = document.implementation.createHTMLDocument("New").body;
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };
    return (
      <DescriptionEvent>
        <TitleEvent>{this.state.data.title}</TitleEvent>
        <PhotoEvent
          src={
            this.state.data.images
              ? this.state.data.images.image.medium.url
              : "no-photo.jpg"
          }
          alt="Event pic."
        />
        <InfoEvent>

          <b>Date: </b>
          {this.state.data.start_time
            ? this.state.data.start_time.substr(0, 10)
            : ""}
          <br></br>
          <br></br>
          <b>Location: </b>
          {`${this.state.data.city}, ${this.state.data.country}`}
          <br></br>
          <br></br>
          <Button>Organiser une sortie</Button>
          <br></br>
          <br></br>
        </InfoEvent>
        <Description>{stripHtml(this.state.data.description)}</Description>
      </DescriptionEvent>
    );
  }
}