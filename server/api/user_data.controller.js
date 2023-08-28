import db from "../index.js";

export default class UsersController {
  static apiGetUsersTest(req, res) {
    const q = "SELECT * FROM videos";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  // static apiUserLoginVerify(req, res) {
  //   let userID = req.body.userID;
  //   let password = req.body.password;

  //   if (userID && password) {
  //     const q = `SELECT * FROM user_login WHERE userID = ? AND password_str = ?`;
  //     db.query(q, [userID, password], (err, data) => {
  //       if (err) return res.json(err);
  //       if (data.length > 0) {
  //         // Authenticate the user
  //         req.session.loggedin = true;
  //         req.session.username = userID;
  //       } else {
  //         res.send("Incorrect UserID and/or Password!");
  //       }
  //       res.end();
  //     });
  //   } else {
  //     res.send("Please enter UserID and Password!");
  //     res.end();
  //   }
  // }

  // static apiUserCreateAcc(req, res) {
  //   let userID = req.body.userID;
  //   let password = req.body.password;
  //   let username = req.body.username;

  //   if (userID && password) {
  //     const q1 = `SELECT * FROM user_login WHERE userID = ?`;
  //     db.query(q1, [userID], (err, data) => {
  //       if (err) return res.json(err);
  //       if (data.length > 0) {
  //         res.send("User already exists!");
  //         res.end();
  //       } else {
  //         const q2 = `INSERT INTO user_login VALUES(?)`;
  //         const values = [userID, password, username];
  //         db.query(q2, [values], (err, data) => {
  //           if (err) return res.json(err);
  //           req.session.loggedin = true;
  //           req.session.username = userID;
  //           return res.json("User has been added successfully");
  //         });
  //       }
  //     });
  //   } else {
  //     res.send("Please enter UserID and Password!");
  //     res.end();
  //   }
  // }

  static apiUserLoginVerify(req, res) {
    let userID = req.body.userID;
    let password = req.body.password;

    if (userID && password) {
      const q = `SELECT * FROM user_login WHERE userID = ? AND password_str = ?`;
      db.query(q, [userID, password], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
          res.json(data);
        } else {
          res.send("Incorrect ID and/or Password!");
        }
        res.end();
      });
    } else {
      res.send("Please enter both ID and Password!");
      res.end();
    }
  }

  static apiUserCreateAcc(req, res) {
    let userID = req.body.userID;
    let password = req.body.password;
    let username = req.body.username;

    if (userID && password) {
      const q1 = `SELECT * FROM user_login WHERE userID = ?`;
      db.query(q1, [userID], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
          res.send("Account already exists!");
          res.end();
        } else {
          const q2 = `INSERT INTO user_login VALUES(?)`;
          const values = [userID, password, username];
          db.query(q2, [values], (err, data) => {
            if (err) return res.json(err);
            res.end();
          });
        }
      });
    } else {
      res.send("Please enter both ID and Password!");
      res.end();
    }
  }

  // CREATE TABLE user_watch_later (
  // 	videoID VARCHAR(11),
  // 	userID INT,
  // 	title VARCHAR(100),
  // 	publishedAT VARCHAR(10),
  // 	channelTitle VARCHAR(50),
  // 	categoryID INT,
  // 	tags VARCHAR(250),
  // 	thumbnail_link VARCHAR(100),
  // 	description VARCHAR(100),
  // 	PRIMARY KEY (videoID, userID),
  // 	FOREIGN KEY (userID) REFERENCES user_login(userID)
  //         ON DELETE CASCADE
  //         ON UPDATE CASCADE
  // );

  static apiAddVideo(req, res) {
    const q = `INSERT INTO user_watch_later VALUES (?)`;
    const values = [
      req.body.videoID,
      req.body.userID,
      req.body.title,
      req.body.publishedAT,
      req.body.channelTitle,
      req.body.categoryID,
      req.body.tags,
      req.body.thumbnail_link,
      req.body.description,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("video has been added successfully");
    });
  }

  static apiGetWatchLaterByPK(req, res) {
    const userId = parseInt(req.params.id, 10);
    const q = `SELECT * FROM user_watch_later WHERE userID = ?`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  static apiDeleteVideo(req, res) {
    const userId = parseInt(req.params.id, 10);
    const videoId = req.params.videoId;
    const q = ` 
        DELETE FROM user_watch_later 
        WHERE userID = ? AND videoId = ? 
    `;

    db.query(q, [userId, videoId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  // CREATE TABLE search_history (
  // 	searchTime VARCHAR(100),
  //    userID INT,
  // 	keywords VARCHAR(250),
  // 	PRIMARY KEY (keywords, userID),
  // 	FOREIGN KEY (userID) REFERENCES user_login(userID)
  //         ON DELETE CASCADE
  //         ON UPDATE CASCADE
  // );

  static apiAddSearchHistory(req, res) {
    const q = `INSERT INTO search_history VALUES (?)`;
    const values = [req.body.searchTime, req.body.userID, req.body.keywords];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("search history has been added successfully");
    });
  }

  static apiGetSearchHistoryByPK(req, res) {
    const userId = req.params.id;
    const q = `SELECT * FROM search_history WHERE userID = ?`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  static apiGetPopularCategory(req, res) {
    // const q = `
    //     SELECT MAX(t.c) AS max_count
    //     FROM (SELECT w.categoryId, COUNT(w.categoryId) AS c
    //             FROM user_watch_later w
    //             GROUP BY w.categoryId) t;
    // `;

    const q = `
      SELECT *
      FROM (SELECT yc.category, COUNT(yc.category) AS count
          FROM user_watch_later w RIGHT JOIN youtube_category yc ON (w.categoryID = yc.categoryID)
          GROUP BY yc.category) t
      ORDER BY t.count DESC
      LIMIT 3;
    `;

    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
}
