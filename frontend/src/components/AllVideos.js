import {Box, Grid} from "@mui/material";
import {useEffect, useState} from "react";

import VideoCard from "./VideoCard";

const AllVideos = ({videoData})=>{
    useEffect(()=>{
    }, []);

    return (
        <Grid container spacing={0.5}> 
        {
            videoData.map((item, idx)=>(
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx.toString()}>
                <VideoCard video={item}/>
            </Grid>
            ))   
        }
        </Grid>
    );
}

export default AllVideos;