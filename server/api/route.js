import express from "express";
import UsersCtrl from "./user_data.controller.js";
import VideosCtrl from "./youtube_data.controller.js";

const router = express.Router();

// test routes for local sql
router.route("/home").get((req, res) => {
  if (req.session.loggedin) {
    res.send("Welcome back, " + req.session.username + "!");
  } else {
    res.send("Please login to view this page!");
  }
  res.end();
});

router.route("/auth/test").post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username == "root" && password == 1234) {
    req.session.loggedin = true;
    req.session.username = username;
    // Redirect to home page
    res.send("Done loggin in");
    res.redirect("/home");
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

router.route("/videos/test").get(VideosCtrl.apiGetVideosTest);
router.route("/users/test").get(UsersCtrl.apiGetUsersTest);

// videos
router
  .route("/videos")
  .get(VideosCtrl.apiGetVideos)
  .post(VideosCtrl.apiPostVideos);

router
  .route("/videos/:id/:trendingdate")
  .get(VideosCtrl.apiGetVideoByPK)
  .put(VideosCtrl.apiPutVideos)
  .delete(VideosCtrl.apiDeleteVideos);

router.route("/videos/categorycount").get(VideosCtrl.apiGetCategoryCount);
router.route("/videos/recommends").get(VideosCtrl.apiGetRecommendations);

// users
router.route("/users/login").post(UsersCtrl.apiUserLoginVerify);
router.route("/users/create").post(UsersCtrl.apiUserCreateAcc);

router.route("/users/watchlater").post(UsersCtrl.apiAddVideo);
router.route("/users/watchlater/:id").get(UsersCtrl.apiGetWatchLaterByPK);
router.route("/users/watchlater/:id/:videoId").delete(UsersCtrl.apiDeleteVideo);

router.route("/users/searchhistory").post(UsersCtrl.apiAddSearchHistory);
router.route("/users/searchhistory/:id").get(UsersCtrl.apiGetSearchHistoryByPK);

router.route("/users/summary").get(UsersCtrl.apiGetPopularCategory);

export default router;

// {
//     "videoID": "__4i6CIg82o",
//     "title": "sample title",
//     "publishedAT": "2022-01-01",
//     "channelTitle": "sample channel",
//     "categoryID": 28,
//     "trending_date": "2022-01-01",
//     "tags": "sample entry",
//     "view_count": 1000,
//     "likes": 100,
//     "dislikes": 100,
//     "thumbnail_link": "sample link",
//     "description": "sample description"
// }
