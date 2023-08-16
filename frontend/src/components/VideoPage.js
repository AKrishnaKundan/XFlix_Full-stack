import axios from "axios";
import workspaceIp from "../ipConfig";

import React, {useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {Box, CircularProgress, Tooltip} from "@mui/material";
import moment from 'moment';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import Header from "./Header";
import AllVideos from "./AllVideos"

import "./VideoPage.css";

let timeAgo = "";
const VideoPage = ()=>{
    const history = useHistory();
    const [path, setPath] = useState(history.location.pathname);
    const videoId = path.split("/")[2];
    const [videoData,setVideoData] = useState([]);
    const [videoObj, setVideoObj] = useState(null);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [votes, setVotes] = useState({upVotes:0, downVotes:0});

    const fetchAllVideos = async()=>{
        try{
            const response = await axios.get(`${workspaceIp.endpoint}/v1/videos?sortBy=releaseDate`);
            setVideoData(response.data.videos);
        }
        catch (error){
        }
    }

   async function fetchVideo(){
        try{
            setLoadingVideo(true);
            let response = await axios.get(`${workspaceIp.endpoint}/v1/videos/${videoId}`);
            setLoadingVideo(false);
            setVideoObj(response.data);
            setVotes({upVotes: response.data.votes.upVotes, downVotes:response.data.votes.downVotes});
            findTimeAgo(response.data.releaseDate);
        }
        catch(err){
            setLoadingVideo(false);
        }
    }

    const findTimeAgo = (releaseDate)=>{
        let date = new Date(releaseDate);
        timeAgo = moment(new Date(date)).fromNow();   
    }

    const upVote = async()=>{
        setVotes({upVotes:votes.upVotes+1, downVotes:votes.downVotes});
        try{
            let response = await axios.patch(`${workspaceIp.endpoint}/v1/videos/${videoId}/votes`,
            {
                "vote": "upVote",
                "change": "increase"
            });
        }
        catch(err){
        }
    }

    const downVote = async()=>{
        setVotes({upVotes:votes.upVotes, downVotes:votes.downVotes+1});
        try{
            let response = await axios.patch(`${workspaceIp.endpoint}/v1/videos/${videoId}/votes`,
            {
                "vote": "downVote",
                "change": "increase"
            });
        }
        catch(err){
        }

    }

    const increaseViewCount = async()=>{
        try{
            const response = await axios.patch(`${workspaceIp.endpoint}/v1/videos/${videoId}/views`);
        }
        catch(err){
        }
    }

    useEffect(()=>{
        increaseViewCount();
        fetchVideo();
        fetchAllVideos();
    },[]);

    useEffect(()=>{
        if (path !== history.location.pathname){
            setPath(history.location.pathname);
        }
    })

    useEffect(()=>{
        increaseViewCount();
        fetchVideo();
    }, [path])

    return(
        <Box>
            <Header/>
            {
                (loadingVideo)?
                    <div className="loading">
                        <CircularProgress/>
                        <h3>Loading Video</h3>
                    </div> 
                :
                (videoObj)?
                <Box className="video-container">
                    <iframe 
                            src={`https://www.${videoObj.videoLink}`}
                            title={videoObj.title}
                            className="video-iframe"
                        >
                    </iframe>
                    <div className="video-details">
                        <div className="video-text">
                            <h4>{videoObj.title}</h4>
                            <p>
                                +{videoObj.viewCount} &nbsp; 
                                {videoObj.genre} &nbsp; 
                                {timeAgo}
                            </p>
                        </div>
                        <div className="video-likes">
                            <span className="like-button" onClick={upVote}>{votes.upVotes}
                            <Tooltip title="upvote">
                                <ThumbUpIcon
                                    sx={{
                                        "&:hover": {
                                            color: "blue",
                                            cursor: "pointer"
                                        }
                                    }}
                                />
                            </Tooltip>
                            </span>
                            &nbsp;
                            <span className="like-button" onClick={downVote}>{votes.downVotes}
                            <Tooltip title="downvote">
                                <ThumbDownIcon
                                    sx={{
                                        "&:hover": {
                                            color: "blue",
                                            cursor: "pointer"
                                        }
                                    }}
                                />
                            </Tooltip>
                            </span>
                        </div>
                    </div>
                </Box>
                :
                <Box className="error-video">
                    <h4>Error in displaying video</h4> &nbsp; <SentimentDissatisfiedIcon/>
                </Box>
            }
            <AllVideos videoData={videoData}/>          

        </Box>
    );
}
export default VideoPage;
/*

           
    
            <AllVideos videoData={videoData}/>          
*/
