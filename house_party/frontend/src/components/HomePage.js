import React, { Component } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, } from "react-router-dom";

export default class HomePage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the Home page</p>}></Route>
                <Route path="/join" element={<JoinRoomPage/>}></Route>
                <Route path="/create" element={<CreateRoomPage/>}></Route>
                <Route path="/room/:roomCode" Component={Room}></Route>
            </Routes>
        </Router>
    );
  }
}