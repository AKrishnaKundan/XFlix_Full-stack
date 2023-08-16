const Joi = require("joi");
const { 
  genresValidation, 
  ratingValidation, 
  sortBy, 
  objectId, 
  videoLink,
} = require("./custom.validations");

const getVideos = {
  query: Joi.object().keys({
    genres: Joi.string().custom(genresValidation),
    contentRating: Joi.string().custom(ratingValidation),
    sortBy: Joi.string().custom(sortBy),
    title: Joi.string()
  })
}

const getVideoWithId = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

const postVideo = {
  body : Joi.object().keys({
    videoLink: Joi.string().required().custom(videoLink),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    contentRating: Joi.string().required(),
    releaseDate: Joi.string().required(),
    previewImage: Joi.string().required()
  })
};


const patchVotes = {
  body : Joi.object().keys({
    vote: Joi.string().required(),
    change: Joi.string().required(),
  }),
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  })
};


const patchViews = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  })
};

module.exports = {
  getVideos,
  getVideoWithId,
  postVideo,
  patchVotes,
  patchViews
};
