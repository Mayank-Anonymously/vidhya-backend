const express = require("express");
const app = express();
const cors = require("cors");
const queryroute = require("./router/Queryrouter");
const path = require("path");
const drouter = require("./router/dynamicPage.js");
const srouter = require("./router/servicesRouter.js");
const crouter = require("./router/countiresPage.js");
const urouter = require("./router/universtiesRouter.js");
const brouter = require("./router/blogRouter.js");

require("./utils/config.js");

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://vidhyaroute-portal.vercel.app", // Production domain
  "https://crm.vidhyaroute.com", // Optional www version
  "https://www.crm.vidhyaroute.com", // Optional www version
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow request
      } else {
        callback(new Error("Not allowed by CORS")); // block request
      }
    },
    credentials: true, // if you need cookies/auth headers
  })
);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use("/api/v1/query", queryroute);
app.use("/resources", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/pages", drouter);
app.use("/api/v1/services", srouter);
app.use("/api/v1/countries", crouter);
app.use("/api/v1/university", urouter);
app.use("/api/v1/blogs", brouter);

app.listen(3202);
