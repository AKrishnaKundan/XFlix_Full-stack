const router = require("express").Router();

const videoControllers = require("../controllers/video.controllers");

const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validations");

console.log("router reached");
router.get("/videos", 
    validate(videoValidation.getVideos),
    videoControllers.getVideos
);

router.post("/videos", 
    validate(videoValidation.postVideo),
    videoControllers.postVideos
);

router.get("/videos/:videoId", 
    validate(videoValidation.getVideoWithId),
    videoControllers.getVideoWithId
);

router.patch("/videos/:videoId/votes", 
    validate(videoValidation.patchVotes),
    videoControllers.patchVotes
);

router.patch("/videos/:videoId/views", 
    validate(videoValidation.patchViews),
    videoControllers.patchViews
);

module.exports = router;