import React, { Component } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomCode: null,
    };
  }
  
  async componentDidMount(){
    fetch('/api/user-in-room').then((response) => response.json()).then((data) => {this.setState({roomCode: data.code})})
  }

  renderHomePage(){
    return(
      <Grid container spacing = {3}>
        <Grid size={{xs:12}} align = "center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid size={{xs:12}} align = "center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to='/join' component={ Link }>Join a Room</Button>
            <Button color="secondary" to='/create' component={ Link }>Create a Room</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={this.state.roomCode ? (<Navigate to = {"/room/"+this.state.roomCode}/>) : (this.renderHomePage())}></Route>
                <Route path="/join" element={<JoinRoomPage/>}></Route>
                <Route path="/create" element={<CreateRoomPage/>}></Route>
                <Route path="/room/:roomCode" element={<Room/>}></Route>
            </Routes>
        </Router>
    );
  }
}