import React, { useState } from "react";
import axios from "axios";

import workspaceIp from "../ipConfig";

import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import "./UploadDialog.css";

const UploadDialog = ({open, handleClose})=>{

  const [genre, selectedGenre] = useState("");
  const [ageGroup, selectedAgeGroup] = useState("");

  const selectGenre = (event)=>{
    selectedGenre(event.target.value);
  }

  const selectAgeGroup = (event)=>{
    selectedAgeGroup(event.target.value);
  }

  const uploadVideo = async(obj)=>{
    try{
      const headers = {
        'Content-Type': 'application/json',
      }
      let response = await axios.post(`${workspaceIp.endpoint}/v1/videos`, JSON.stringify(obj), {headers: headers});
      console.log("response");
      console.log(response);
    }
    catch(err){}
  }

  const convertDate = (releaseDate)=>{
    const allMonths = new Map([
      ["01", "Jan"],
      ["02", "Feb"],
      ["03", "Mar"],      
      ["04", "Apr"],
      ["05", "May"],
      ["06", "Jun"],
      ["07", "Jul"],
      ["08", "Aug"],
      ["09", "Sep"],
      ["10", "Oct"],
      ["11", "Nov"],
      ["12", "Dec"],
    ]);
    releaseDate = releaseDate.split("-");
    let month = allMonths.get(releaseDate[1]);
    releaseDate = releaseDate[2] + " " + month+ " "+releaseDate[0];
    return releaseDate;
  }

  const handleSubscribe = ()=>{
    let videoLink = document.getElementById("outlined-basic video-link").value;
    let imageLink = document.getElementById("outlined-basic image-link").value;
    let videoTitle = document.getElementById("outlined-basic title").value;
    let releaseDate = document.getElementById("date").value;
    releaseDate = convertDate(releaseDate);
    uploadVideo(
      {
          videoLink: videoLink,
          title: videoTitle,
          genre: genre,
          contentRating: "7+",
          releaseDate: releaseDate,
          previewImage: imageLink
      }
    );
    handleClose();
    selectedGenre("");
    selectedAgeGroup("");
  }

  const handleCancel = ()=>{
    selectedGenre("");
    selectedAgeGroup("");
    handleClose();
  }

  return(
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Upload Video</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <div className="upload-video-dialog"> 

          <TextField 
            id="outlined-basic video-link" 
            variant="outlined"
            label="Video Link"
            helperText="This link will be used to derive the video"
          />
          <TextField 
            id="outlined-basic image-link" 
            variant="outlined" 
            label="Thumbnail Image Link"
            helperText="This link will be used to preview the thumbnail image"
          />
          <TextField 
            id="outlined-basic title" 
            variant="outlined"
            label="Title"
            helperText="The title will be the representative text for video" 
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              onChange = {selectGenre}
              helperText="Genre will help in categorizing your videos"
            >
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="LifeStyle">LifeStyle</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Suitable age group for the clip</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ageGroup}
              onChange={selectAgeGroup}
              helperText="This will be used to filter videos on age group suitability"
            >
              <MenuItem value="Any age group">Any age group</MenuItem>
            </Select>
          </FormControl>

          <TextField
              id="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              helperText="This will be used to sort videos"
            />

        </div>
      </DialogContent>
      <DialogActions className="submit-buttons">
        <div onClick={handleSubscribe} id="upload-button" className="button">UPLOAD</div>
        <div onClick={handleCancel} className="button">CANCEL</div>
      </DialogActions>
    </Dialog>
  );
}

export default UploadDialog;

