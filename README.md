# XFlix

XFlix is a video sharing platform which hosts videos for the world to watch. It also features uploading new videos by using external video links (eg: Youtube) and playing these videos.

## Deployed links
Frontend: https://a-krishnakundan-xflix-react.netlify.app/

Backend: https://xflix-backend-492l.onrender.com

# Appendix
 • [Overview](#overview)
 
 • [Tech Stack](#tech-stack)
 
 • [Built XFlix Frontend from scratch](#built-xflix-frontend-from-scratch)
 
 • [Built XFlix Backend from scratch](#built-xflix-backend-from-scratch)
 
 • [Deployment](#deployment)
 
 • [Authors](#authors)

## Overview
During the course of this project,

• Built XFlix frontend using React.js from scratch.

• Utilized the figma file to understand the design requirements.

• Built XFlix backend using Node.js, Express.js and MongoDB from scratch.

• Implemented APIs according to the API contract set.

## Tech Stack

**Backend**: Node.js, Express.js, REST API

**Frontend**: React.js, REST API

**Database**: MongoDB

**Tools**: Figma, Postman

## Built XFlix Frontend from scratch
Scope of Work:

• Implemented 3 views - Landing page, Video page, Video Upload Modal - in alignment to the Figma design.

• Used Postman collection to understand the API requirements for 5 different REST APIs.

• Utilized Postman Mock Server to check working of the Frontend application end-to-end.

• Deployed the React application to Netlify.

![image](https://github.com/AKrishnaKundan/XFlix_Full-stack/assets/93312488/5973311a-1a64-4a06-b08b-38ebc9a51768)

## Built XFlix Backend from scratch
Scope of work:

![image](https://github.com/AKrishnaKundan/XFlix_Full-stack/assets/93312488/471858dc-cee6-4602-8620-5b0b05b3ff4d)

XFlix API contract in Postman

Implemented a set of 5 REST APIs
```
GET /v1/videos
GET /v1/videos/:videoId
POST /v1/videos
PATCH /v1/videos/:videoId/votes
PATCH /v1/videos/:videoId/views
```
• Improved `GET /v1/videos` endpoint to allow ```video title search```, ```filtering by multiple genres```, ```filtering by content rating```, ```sorting by video upload date or view count```.

• Utilized MongoDB to persist video data.

•Plugged-in the backend to XFlix frontend and deployed the Full-stack application.

![image](https://github.com/AKrishnaKundan/XFlix_Full-stack/assets/93312488/66299cbe-b1d3-4194-9fb3-3146a83067b1)

Request variants supported by “GET /v1/videos” endpoint

## Authors

- [@AKrishnaKundan](https://www.github.com/AKrishnaKundan)

- [@Crio.Do](https://www.crio.do/)


