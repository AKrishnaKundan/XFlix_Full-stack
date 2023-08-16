const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    votes: {
      upVotes: {
          type: Number
      },
      downVotes: {
          type: Number
      } 
    },
    previewImage: {
      type: String,
      required: true,
      trim: true,
      description: "Thumbnail image link for the video",
    },
    viewCount: {
        type: Number,
        description: "Number of times the video was viewed"
    },
    videoLink: {
      type: String,
      required: true,
      trim: true,
      description:"Embed link for the video",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      description: "Title of the video",
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      description: "Video genre",
    },
    contentRating: {
      type: String,
      required: true,
      trim: true,
      description: "Video age rating",
    },
    releaseDate: {
      type: String,
      required: true,
      trim: true,
      description: "Video release date",
    }
  },
  {
    timestamps: false,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports.Video = Video;
module.exports.videoSchema = videoSchema;
