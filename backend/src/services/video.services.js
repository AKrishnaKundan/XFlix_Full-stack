const { Video } = require("../models/video.models");

const getVideos = async (filters) => {
  let videos;

  let obj = { sortBy: filters.sortBy };
  if (filters.title) {
    console.log("title");
    obj.title = new RegExp(filters.title, "i");
    console.log("finished");
  }
  if (filters.genres) {
    let genres = filters.genres.split(",");
    if (!genres.includes("All")) {
      let genresRegexArray = [];
      for (let i = 0; i < genres.length; i++) {
        genresRegexArray.push(new RegExp(genres[i], "i"));
      }
      console.log(genresRegexArray);
      obj.genre = { $in: genresRegexArray };
    }
  }

  if (filters.contentRating) {
    let allRatings = ["Anyone", "7+", "12+", "16+", "18+"];
    let rating = decodeURIComponent(filters.contentRating);
   console.log(rating);
    let index = allRatings.findIndex((item)=>{
      return item === rating;
    })
    console.log(index);
    let filteredRatings = allRatings.slice(index);
    console.log(filteredRatings);
    obj.contentRating = filteredRatings;
    /*for (let i = 0; i < allRatings.length; i++) {
      if (allRatings[i] <= rating) arr.push(new RegExp(allRatings[i], "i"));
    }
    console.log(arr);
    obj.contentRating = { $in: arr };*/
  }

  videos = await Video.find(obj);
  if (filters.sortBy === "viewCount") {
    videos = videos.sort((a, b) => {
      if (a.viewCount > b.viewCount) return -1;
      if (a.viewCount === b.viewCount) {
        let date1 = new Date(a.releaseDate);
        let date2 = new Date(b.releaseDate);
        if (date1 > date2) return -1;
        return 1;
      }
    });
  } else {
    videos = videos.sort((a, b) => {
      let date1 = new Date(a.releaseDate);
      let date2 = new Date(b.releaseDate);
      if (date1 > date2) return -1;
      return 1;
    });
  }

  return { videos: videos };
};

const getVideoWithId = async (videoId) => {
  let video = await Video.findOne({ _id: videoId });
  return video;
};

const uploadVideo = async (videoObj) => {
  let video = await Video.findOne({ title: videoObj.title });

    videoObj.votes = {
      upVotes: 0,
      downVotes: 0,
    };
    videoObj.viewCount = 0;
    video = new Video(videoObj);
    await video.save();

    return video;
};

const changeVotes = async (obj, id) => {
  let video = await Video.findById(id);
  if (!video) return video;
  if (obj.vote === "upVote") {
    if (obj.change === "increase")
      video.votes.upVotes = video.votes.upVotes + 1;
    else video.votes.upVotes = video.votes.upVotes - 1;
  } else {
    if (obj.change === "increase")
      video.votes.downVotes = video.votes.downVotes + 1;
    else video.votes.downVotes = video.votes.downVotes - 1;
  }
  video = await video.save();
  return video;
};

const changeViews = async(id) => {
  let video = await Video.findById(id);
  if (!video) return video;
  video.viewCount = video.viewCount + 1;
  video = await video.save();
  return video;
};

module.exports = {
  getVideos,
  getVideoWithId,
  uploadVideo,
  changeVotes,
  changeViews,
};
