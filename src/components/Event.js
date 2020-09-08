import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

const EachEvent = styled.div`
  border: 2px solid #004AAD;
  border-radius: 5px;
  margin-bottom: 10px;
`

const Button = styled.button`
  display: block;
  margin-top: 5px;
  margin-left: 70%;
  margin-bottom: 10px;
  width: 28%;
  color: #004AAD;
  background: transparent;
  border-radius: 5px;
  border: 1px solid #004AAD;
  font-weight: bold;
  
  &:hover {
    box-shadow: 0 5px 5px #5E99E8;
    background: #004AAD;
    color: white;
    cursor: pointer;
  }
  
  a {
    color: #004AAD;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
`

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
    width: 15%;
  }
`

const InfoEvent = styled.div`
  display: inline-block;
  width: 80%;
  margin: 10px;
  
  @media (max-width: 320px) {
    width: 70%;
    h1 {
      display: inline;
    }
  }

  .link {
    text-decoration: none;
  }
`

export default class Event extends React.Component {
  render() {
    return (
      <EachEvent>
        <PhotoEvent src={this.props.image} alt="Event pic" />
        <InfoEvent>
          <h1>{this.props.title}</h1>
          <ul>
            <li>
              <b>Date: </b>
              {this.props.date}
            </li>
            <li>
              <b>Location: </b>
              {this.props.location}
            </li>
          </ul>
          <Link to={{pathname : `/event?id=${this.props.url}`}} className="link"><Button>En savoir plus</Button></Link>
        </InfoEvent>
      </EachEvent>
    )
  }
}
