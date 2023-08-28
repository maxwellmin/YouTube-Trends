import db from "../index.js";

export default class VideosController {
  static apiGetVideosTest(req, res) {
    const q = "SELECT * FROM videos";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  // videoID VARCHAR(11),
  // title VARCHAR(100),
  // publishedAT VARCHAR(10),
  // channelTitle VARCHAR(50),
  // categoryID INT,
  // trending_date VARCHAR(10),
  // tags VARCHAR(250),
  // view_count INT,
  // likes INT,
  // dislikes INT,
  // thumbnail_link VARCHAR(100),
  // description VARCHAR(100),
  // PRIMARY KEY (videoID, trending_date)

  static apiGetVideos(req, res) {
    const keyword = req.query.keyword ? "%" + req.query.keyword + "%" : "%";
    const startDate = req.query.startDate ? req.query.startDate : "2019-12-31";
    const endDate = req.query.endDate ? req.query.endDate : "2023-12-31";
    const viewCount = req.query.viewCount ? req.query.viewCount : 0;

    const q = `
      SELECT * FROM filtered_youtube_trending_data
      WHERE (trending_date >= ? AND trending_date <= ?) AND (view_count >= ?) AND
      (title LIKE ? OR channelTitle LIKE ? OR tags LIKE ? OR description LIKE ?)
      ORDER BY trending_date DESC
      LIMIT 150
    `;
    // console.log(keyword + startDate + endDate);

    db.query(
      q,
      [startDate, endDate, viewCount, keyword, keyword, keyword, keyword],
      (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      }
    );
  }

  static apiGetVideoByPK(req, res) {
    const videoId = req.params.id;
    const trendingDate = req.params.trendingdate;
    const q = ` 
        SELECT * FROM filtered_youtube_trending_data 
        WHERE videoID = ? AND trending_date = ? 
    `;

    db.query(q, [videoId, trendingDate], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  static apiPostVideos(req, res) {
    const q = `INSERT INTO filtered_youtube_trending_data VALUES (?)`;
    const values = [
      req.body.videoID,
      req.body.title,
      req.body.publishedAT,
      req.body.channelTitle,
      req.body.categoryID,
      req.body.trending_date,
      req.body.tags,
      req.body.view_count,
      req.body.likes,
      req.body.dislikes,
      req.body.thumbnail_link,
      req.body.description,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("video has been added successfully");
    });
  }

  static apiPutVideos(req, res) {
    const videoId = req.params.id;
    const trendingDate = req.params.trendingdate;
    const q = `
      UPDATE filtered_youtube_trending_data 
      SET videoID = ?, title = ?, publishedAT = ?, channelTitle = ?, categoryID = ?, trending_date = ?
      , tags = ?, view_count = ?, likes = ?, dislikes = ?, thumbnail_link = ?, description = ? 
      WHERE videoID = ? AND trending_date = ? 
    `;

    const values = [
      req.body.videoID,
      req.body.title,
      req.body.publishedAT,
      req.body.channelTitle,
      req.body.categoryID,
      req.body.trending_date,
      req.body.tags,
      req.body.view_count,
      req.body.likes,
      req.body.dislikes,
      req.body.thumbnail_link,
      req.body.description,
    ];

    db.query(q, [...values, videoId, trendingDate], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  static apiDeleteVideos(req, res) {
    const videoId = req.params.id;
    const trendingDate = req.params.trendingdate;
    const q = ` 
        DELETE FROM filtered_youtube_trending_data 
        WHERE videoID = ? AND trending_date = ? 
    `;

    db.query(q, [videoId, trendingDate], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  static apiGetCategoryCount(req, res) {
    const q = `
        SELECT yc.category, COUNT(fytd.categoryID) as num
        FROM filtered_youtube_trending_data fytd RIGHT JOIN youtube_category yc ON (fytd.categoryID = yc.categoryID)
        GROUP BY yc.category
        ORDER BY num DESC
    `;

    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  static apiGetRecommendations(req, res) {
    const q = `
        SELECT DISTINCT title, t.channelTitle, category, viewCountMax
        FROM FinalTable t LEFT JOIN filtered_youtube_trending_data fytd ON fytd.videoID = t.videoID
        ORDER BY viewCountMax DESC
        LIMIT 25
    `;

    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
}
