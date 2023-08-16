import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button, 
  CircularProgress,
  FormControl, 
  InputAdornment,
  MenuItem,
  Select,
  Stack, 
  TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import workspaceIp from "../ipConfig";

import Header from "../components/Header";
import AllVideos from "./AllVideos";
import UploadDialog from "./UploadDialog"

import "./Landing.css";

import data from "./data";

const GenrePanel = ({allFilters, genreFilters, handleSaveFilter})=>{

  return (
  <Stack direction="row" spacing={1} className="genre-panel">
  {
    allFilters.map((filter,idx)=>(
      (genreFilters.includes(filter)) ?
      <Button className="filter" key={idx.toString()+"white"} sx={{ bgcolor: 'white' }} id={filter} onClick={handleSaveFilter}>{filter}</Button>
      :
      <Button className="filter" key={idx.toString()} id={filter} onClick={handleSaveFilter}>{filter}</Button>
    ))
  }
  </Stack>
  );
}

const DropDown = ({handleChange})=>{
  const [option, setOption] = useState("releaseDate")
  const handleOption = (event)=>{
    let selected = event.target.value;
    setOption(selected);
    handleChange(selected);
  }
  return (
  <Box sx={{ width:200 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          value={option}
          onChange={handleOption}
        >
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="viewCount">Video view count</MenuItem>

        </Select>
      </FormControl>
    </Box>);
}

const RatingFilterPanel = ({allFilters, ratingFilters, handleSaveFilter})=>{
  return (
    <Stack direction="row" spacing={2} className="genre-panel">
    {
      allFilters.map((rating,idx)=>{
        if (ratingFilters.includes(rating)) return <Button className="filter" key={idx.toString()+"white"} sx={{ bgcolor: 'white'}} id={rating} onClick={handleSaveFilter}>{rating}+</Button>
        else return <Button className="filter" key={idx.toString()} id={rating} onClick={handleSaveFilter}>{rating}+</Button>
      })
    }
    </Stack>
    );
  }

let timer;
const Landing = ()=>{
  let allFilters = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
  let allRatingFilters = ["7", "12", "16", "18"];
  const [isLoading, setIsLoading] = useState(false);
  const [videoData,setVideoData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genreFilters, setGenreFilters] = useState("All");
  const [ratingFilters, setRatingFilter] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
    
  const fetchVideos = async()=>{
    try{
        const response = await axios.get(`${workspaceIp.endpoint}/v1/videos?sortBy=releaseDate`);
        setVideoData(response.data.videos);
    }
    catch (error){
    }
    finally{
        setIsLoading(false);
    }
  }

  const performSearch = async (text)=>{
    try{
      let response = await axios.get(`${workspaceIp.endpoint}/v1/videos?title=${text}`);
      setVideoData(response.data.videos);
    }
     catch(err){
      alert("Error occured");
    }
  }

  const debounceSearch = (event)=>{
    if (timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      let text = event.target.value;
      text = text.toLowerCase();
      setSearchText(text);
      handleAllFilters(text, genreFilters, ratingFilters, "releaseDate");
    },500);  
  }

  const saveGenreFilter = (event)=>{
    let selected = event.target.id;
    let str = genreFilters;
    if (selected === "All"){   
      str="All";
    }
    else if(str === "All"){
      str=selected;
    }
    else{
      if (!str.includes(selected))
        str+=`,${selected}`;
    }
    setGenreFilters(str);
    handleAllFilters(searchText, str, ratingFilters, "releaseDate");
  }
  
  const saveRatingFilter = (event)=>{
    setRatingFilter(event.target.id);
    if (!ratingFilters.includes(event.target.id))
      handleAllFilters(searchText, genreFilters, event.target.id, "releaseDate");
  }

  const saveSortOption = (option)=>{
    handleAllFilters(searchText, genreFilters, ratingFilters, option);
  }

  const handleAllFilters = async(text, genre, rating, option)=>{
    let url = `${workspaceIp.endpoint}/v1/videos`;
    let queryParams="";
    if (text) queryParams+=`?title=${text}`;    
    
    if (genre !== "All"){
      if (queryParams === "") queryParams+= `?genres=${genre}`
      else queryParams+= `&genres=${genre}`
    }
  
    if (rating !== ""){
      if (queryParams === "") queryParams += `?contentRating=${rating}%2B`
      else queryParams += `&contentRating=${rating}%2B`
    }

    if (queryParams === "") queryParams += `?sortBy=${option}`
    else queryParams += `&sortBy=${option}`
  
    try{
      let response = await axios.get(`${url}${queryParams}`);
      setVideoData(response.data.videos);
    }
     catch(err){
     }
  }

  useEffect(()=>{
    fetchVideos();
  },[]) 

  return (
    <div>
      <div className="page-top-container">
        <Header handleUploadButton={handleDialogOpen}>
          <TextField
              placeholder="Search for videos" 
              id="outlined-end-adornment"
              className="search-desktop"
              name="search"
              sx={{m: 1, width: '50%'}}
              InputProps={{
                  endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
              }}
              onChange = {debounceSearch}
          />
        </Header>
        <TextField
            placeholder="Search for videos" 
            id="outlined-end-adornment"
            className="search-mobile"
            name="search"
            sx={{m: 1, width:'75vw'}}
            InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
            }}
            onChange = {debounceSearch}
        />
        <Box className="multi-select-filters">
          <GenrePanel allFilters={allFilters} genreFilters={genreFilters} handleSaveFilter={saveGenreFilter}/>
          <DropDown handleChange = {saveSortOption}/>
        </Box>
        <Box className="multi-select-filters">
          <Button className="filter" sx={{ bgcolor: 'white'}}>Any age group</Button>
          <RatingFilterPanel allFilters={allRatingFilters} ratingFilters={ratingFilters} handleSaveFilter={saveRatingFilter}/>
        </Box>
      </div>
      <div>
      {
      isLoading ?
          <div className="loading">
              <CircularProgress/>
              <h3>Loading Videos</h3>
          </div>
          :
          (videoData.length > 0)?
            <AllVideos videoData={videoData}/>
          :
          <div className="no-videos">
              <SentimentDissatisfiedIcon/>
              <p>No Videos found</p>
          </div>
      }
      </div>
      <UploadDialog open={open} handleClose={handleDialogClose}/>
    </div>
  );
}

export default Landing;