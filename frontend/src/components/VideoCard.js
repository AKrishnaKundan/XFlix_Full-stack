import {Box, Typography} from "@mui/material";
import React from 'react';
import moment from 'moment';
import {useHistory} from "react-router-dom";
import "./VideoCard.css"


const VideoCard = ({video})=>{
    const history = useHistory();

    let date = new Date(video.releaseDate);
    const dateTimeAgo = moment(new Date(date)).fromNow();
    
    return (
    <Box className="video-card" onClick={()=>{
        history.push(`/video/${video._id}`,{from:"/"});
    }}> 
        <img className="video-card-image" src={video.previewImage} alt="item"/>
        <Typography className="video-card-text">
            <h4>{video.title}</h4>
            <p>{dateTimeAgo}</p>
        </Typography>
        <br/>
    </Box>
    );
}

export default VideoCard;
