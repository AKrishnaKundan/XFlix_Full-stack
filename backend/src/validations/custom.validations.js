const genresValidation = (value, helpers) => {
  let allGenres =  ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All" ];
  let genres = value.split(",");
  for (let i=0; i<genres.length; i++){
    if (!allGenres.includes(genres[i])) {
      return helpers.messsage("\"Genres\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]");
    }
  }
  return value;
};

const ratingValidation = (value, helpers) => {
  let allRatings = ["Anyone", "7+", "12+", "16+", "18+"];
  if (!allRatings.includes(value)) {
    return helpers.message("\"contentRating\" must be one of [Anyone, 7+, 12+, 16+, 18+, All]");
  }
  return value;
};

const sortBy = (value, helpers) => {
  console.log(value);
  if (value !== "releaseDate" && value !== "viewCount") {
    return helpers.message("\"sortBy\" must be one of [viewCount, releaseDate]",);
  }
  return value;
};

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};

const videoLink = (value, helpers) => {
  const arr = value.split('/').filter(item => item !== '')
    console.log(arr)
    if(arr[0] === 'https:') {
        if(arr.length !== 4 || !(arr[0] === 'https:' && arr[1] === 'www.youtube.com' && arr[2] === 'embed')) {
            return helpers.message("Invalid Video Link")
        }
    }
    if(arr[0] === 'youtube.com') {
        if(arr.length !== 3 || !(arr[0] === 'youtube.com' && arr[1] === 'embed')) {
            return helpers.message("Invalid Video Link")
        }
    }
    return value;
};
  
  module.exports = {
    genresValidation,
    ratingValidation,
    sortBy,
    objectId,
    videoLink,
  };
  