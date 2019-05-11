import React, { Component } from 'react';

import './App.css';
import "tabler-react/dist/Tabler.css";
import { 
  Grid, 
  Header, 
  Tab, 
  TabbedCard, 
  Form, 
  Button,
  Text,
  Card,
  Alert,
  StatsCard
} from "tabler-react";
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      party: 'republican'
    }
  }

  getVotes = async (e) => {
    e.preventDefault()

    this.setState({
      loading: true
    })

    let result = await (await fetch(`http://ec2-52-90-174-194.compute-1.amazonaws.com:3002/getVotes?president=${this.state.party}`, {
      method: 'get'
    })).json()

    if(!result.error) {
      this.setState({
        votes: result.message || "No Votes"
      })
    } else {
      this.setState({
        error: 'An error occured'
      })
    }

    this.setState({
      loading: false
    })
  }

  handleChanges = e => {
    this.setState({
        [e.target.name]: e.target.value,
    });
};

  render() {
    console.log(this)
    return (
      <Grid.Row>
        <Grid.Col className="mb-4" offset={3} width={6}>
          <Header.H1 className="mt-4">Voting Authority Dashboard</Header.H1>
          <Text className="mb-4">You don't have visibility of who has voted for whom. You can only count the final votes. </Text>
          <Form onSubmit={this.getVotes} className="mb-4">
            <Form.Group>
              <Form.Select name='party' label='Select Party' onChange={this.handleChanges}>
                <option value="republican">
                  Republican Party
                </option>
                <option value="democratic">
                  Democratic Party
                </option>
              </Form.Select>
            </Form.Group>
            {this.state.error &&
              <Alert type="danger">
                {this.state.error}
              </Alert>
            }
            <LaddaButton
              loading={this.state.loading}
              type="submit"
              data-style={EXPAND_LEFT}
              className="btn btn-primary"
            >
              Get Votes
            </LaddaButton>
          </Form>
          {this.state.votes &&
            <StatsCard layout={1} movement={''} total={this.state.votes} label="" />
          }
        </Grid.Col>
      </Grid.Row>
    );
  }
}

export default App;
