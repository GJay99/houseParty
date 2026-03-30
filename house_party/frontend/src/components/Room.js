import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = this.props.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    }

    getRoomDetails(){
        fetch('/api/get-room' + '?code=' + this.roomCode).then((response) => response.json()).then((data)=>{this.setState({votesToSkip: data.votes_to_skip,
                                                                                                                            guestCanPause: data.guest_can_pause,
                                                                                                                            isHost: data.is_host,});
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        fetch('/api/leave-room',requestOptions).then((_response) => {
            this.props.navigate("/")
        });
    }

    render() {
        return(

            <Grid container spacing={1}>
                <Grid size={{xs:12}} align="center">
                    <Typography variant='h4' component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid size={{xs:12}} align="center">
                    <Typography variant='h6' component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid size={{xs:12}} align="center">
                    <Typography variant='h6' component="h6">
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid size={{xs:12}} align="center">
                    <Typography variant='h6' component="h6">
                        Is Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid size={{xs:12}} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default function RoomWrapper() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  return <Room roomCode={roomCode} navigate={navigate}/>;
}
