import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import EmployeList from "./Components/EmployeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/employeCss.css'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
            <EmployeList />
      </ApolloProvider>
    );
  }
}

export default App;
