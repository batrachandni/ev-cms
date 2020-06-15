import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import appRoutes from "../client/Routes";
import renderer from "./helpers/renderer";
import storeServer from "./helpers/store";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = storeServer();
  const promises = matchRoutes(appRoutes, req.path).map(({ route, match }) => {
    if (route.loadData) {
      return route.loadData({ store });
    } else if (route.loadDataWithMatch) {
      return route.loadDataWithMatch({ store, match });
    }
    return null;
    //return route.loadData ? route.loadData({store}) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log("Server is Listning on: " + port);
});
