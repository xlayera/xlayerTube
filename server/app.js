const {
    express,
    bodyParser,
    https,
} = require("./app/dependencies/index");
const config = require('./app/config/config.js');
const app = express();

//require("./database");
app.set("PORT", config.port);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY,X-Auth-Token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.removeHeader("X-Powered-By");

    next();
});

app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

//routes
const allRoutes = require("./app/routes/allRoutes");


app.use("/v1", allRoutes);

app.listen(app.get("PORT"), function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", app.get("PORT"));
})
