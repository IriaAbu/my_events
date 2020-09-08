import React from "react";
import Axios from "axios";
import Event from "./Event";
import styled from "styled-components";

const Pagination = styled.input`
  background: grey;
  color: lightgray;
  text-align: center;
  border-radius: 5px;
`;

const Loading = styled.div`
  text-align: center;
`

const Gif = styled.img`
  width: 100px;
  border-radius: 10px;
`

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      events: [],
      page: 1,
      date: "Future",
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ page: event.target.value });
    this.componentDidMount();
  }

  componentDidMount() {
    Axios.get(
      `http://localhost:42069/json/events/search?app_key=Xgj2Vg7ptjMQR6q2&location=${this.props.value}&date=${this.state.date}&page_number="${this.state.page}`
    )
      .then((res) => {
        this.setState({ data: res.data, events: res.data.events.event, isLoading: true });
      })
      .catch((res) => {
        console.log(res);
      });
  }

  render() {
    if (this.state.isLoading) {
      // afficher résultat
      const events = this.state.events.map((event) => {
        return (
          <Event
            key={event.id}
            title={event.title}
            date={event.start_time.substr(0, 10)}
            location={event.city_name + ", " + event.country_name}
            image={event.image ? event.image.medium.url : "no-photo.jpg"}
            url={event.id}
          />
        );
      });
      return (
        <>
          {events}
          <Pagination
            type="number"
            onChange={this.handleChange}
            value={this.state.page}
            max={this.state.data.page_count}
          />{" "}
          of {this.state.data.page_count}
        </>
      );
    } else {
      // afficher gif
      return (
        <Loading>
          <Gif src="loading.gif"></Gif>
        </Loading>
      )
    }

  }
}
