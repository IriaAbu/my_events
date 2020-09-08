import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import Categories from "./components/Categories";
import EventPage from "./components/EventPage";
import styled from "styled-components";
import Axios from "axios";
import CookieGetter from "./components/CookieGetter";
import Logout from "./components/Logout";

const Page = styled.body`
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 100vh;
  align-items: center;
  background-color: gray;
  flex-direction: column;
  color: black;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: auto;
  background: lightgray;
  border: 1px solid black;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const Img = styled.img`
  @media (max-width: 2000px) {
    width: 100px;
  }
  @media (max-width: 320px) {
    width: 50px;
  }
  height: auto;
  margin-left: 10px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Compte = styled.button`
  background: transparent;
  border: 2px solid #004aad;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;

  &:hover {
    box-shadow: #5e99e8 0 5px 5px;
    border-right-color: #5e99e8;
    border-bottom-color: #5e99e8;
    cursor: pointer;
  }
`;

const ContainerToLien = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  background: lightgray;
  border: 1px solid black;
  border-radius: 10px;
  width: 90%;
`

const LienFacebook = styled.a`
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
    margin-top: 30px;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 20px;

  @media (max-width: 320px) {
    display: block;
  }
`;

const Body = styled.div`
  background: lightgray;
  border: 1px solid black;
  border-radius: 10px;
  width: 69%;

  @media (max-width: 320px) {
    width: 100%;
  }

  .events {
    margin-left: 10px;
    color: #004aad;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: left;
  }
`;

const Menu = styled.div`
  background: lightgray;
  border: 1px solid black;
  border-radius: 10px;
  width: 29%;

  @media (max-width: 320px) {
    width: 100%;
    margin-bottom: 10px;
  }

  .filtres {
    margin-left: 10px;
    color: #004aad;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

const Select = styled.select`
  width: 150px;
  display: block;
  margin-left: 10px;
  border-radius: 5px;
  color: #004aad;

  @media (max-width: 320px) {
    width: 100px;
    display: inline;
  }
`;

const Input = styled.input`
  width: 150px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #004aad;

  @media (max-width: 320px) {
    width: 100px;
    margin-top: 0;
  }
`;

const ListeEvents = styled.div`
  margin: 5px 10px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentCategory: "music",
      value: "Paris",
      isCategory: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value, isCategory: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isCategory: false });
    this.componentDidMount();
  }

  handleOptionChange(event) {
    this.setState({
      currentCategory: event.target.value,
      isCategory: true,
      value: "",
    });
    this.componentDidMount();
  }

  componentDidMount() {
    Axios.get(
      "http://localhost:42069/json/categories/list?app_key=Xgj2Vg7ptjMQR6q2"
    ).then((res) => {
      this.setState({
        categories: res.data.category,
      });
    });
  }
  render() {
    const categories = this.state.categories.map((category) => {
      return (
        <option value={category.id} children={category.name.split("&amp")[0]} />
      );
    });
    return (
      <>
        <Router>
          <Switch>
            <Page className="App-header">
              <Header>
                <Link to={{ pathname: `/` }}>
                  <Img src="logo.png"></Img>
                </Link>
                <Link
                  to={{
                    pathname: CookieGetter("session") ? "/account" : "/login",
                  }}
                >
                  <Compte>
                    <Img src="compte.png"></Img>
                  </Compte>
                </Link>
              </Header>
              <Route path="/account">
                <a href="/logout">Logout</a>
              </Route>
              <Route path="/event*">
                <EventPage />
              </Route>
              <Route path="/login">
                <ContainerToLien>
                  <LienFacebook href="http://localhost:42069/auth/facebook">
                    <img
                      src="login-with-facebook.jpg"
                      alt="fb login"
                      style={{ width: "50vw", maxWidth: "400px" }}
                    ></img>
                  </LienFacebook>
                </ContainerToLien>
              </Route>
                {/* CSS this */}
              <Route path="/logout">{Logout()}</Route>
              <Route exact path="/">
                <Container>
                  <Menu>
                    <p className="filtres">Filtres :</p>
                    <Select
                      name="categories"
                      onChange={this.handleOptionChange}
                    >
                      {categories}
                    </Select>
                    <form onSubmit={this.handleSubmit}>
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Lieu"
                        value={this.state.value}
                      />
                    </form>
                  </Menu>
                  <Body>
                    <ListeEvents>
                      <p className="events">Events à venir :</p>
                      {this.state.isCategory ? (
                        <Categories value={this.state.currentCategory} />
                      ) : (
                          <Index value={this.state.value} />
                        )}
                    </ListeEvents>
                  </Body>
                </Container>
              </Route>
            </Page>
          </Switch>
        </Router>
      </>
    );
  }
}
