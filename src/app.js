const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const { NODE_ENV } = process.env;
const { adminJwtStrategy, userJwtStrategy } = require("./utils/passport");
const testStructure = require("./api/v1/routes");
const apiV1Routes = require("./routes/api/v1");

// Middlewares
if (NODE_ENV === "dev") {
    app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use("admin-jwt", adminJwtStrategy);
passport.use("user-jwt", userJwtStrategy);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     );

//     if (req.method === "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "GET",
//             "POST",
//             "PUT",
//             "PATCH",
//             "DELETE",
//         );

//         return res.end();
//     }

//     next();
// });

// Route requests
app.use("/test-structure", testStructure);
app.use("/api/v1", apiV1Routes);

module.exports = app;
