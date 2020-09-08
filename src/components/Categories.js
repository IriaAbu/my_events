import React from "react";
import Axios from "axios";
import Event from "./Event";
import styled from "styled-components";

const Loading = styled.div`
  text-align: center;
`

const Gif = styled.img`
  width: 100px;
  border-radius: 10px;
`

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      events: [],
      categories: [],
      currentCategory: "music",
      page: 1,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleChange(event) {
    this.setState({ page: event.target.value });
    this.componentDidMount();
  }

  handleOptionChange(event) {
    this.setState({ currentCategory: event.target.value });
    this.componentDidMount();
  }

  componentDidMount() {
    Axios.all([
      Axios.get(
        "http://localhost:42069/json/categories/list?app_key=Xgj2Vg7ptjMQR6q2"
      ),
      Axios.get(
        `http://localhost:42069/json/events/search?app_key=Xgj2Vg7ptjMQR6q2&category=${this.props.value}`
      ),
    ])
      .then((res) => {
        this.setState({
          data: res[1].data,
          events: res[1].data.events.event,
          categories: res[0].data.category,
          isLoading: true,
        });
        console.log(this.state);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  render() {
    if (this.state.isLoading) {
      const categories = this.state.categories.map((category) => {
        return (
          <option value={category.id} children={category.name.split("&amp")[0]} />
        );
      });
      const events = this.state.events.map((event) => {
        return (
          <Event
            key={event.id}
            title={event.title}
            date={event.start_time.substr(0, 10)}
            location={event.city_name + ", " + event.country_name}
            image={event.image ? event.image.medium.url : "no-photo.jpg"}
          />
        );
      });
      return (
        <>
          {events}
          <input
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
