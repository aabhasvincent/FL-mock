import { StaticRouter } from "react-router-dom/cjs/react-router-dom.min";
import routes from "../src/Shared/routes";
import { matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../src/Store/configureStore';
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const serialize = require("serialize-javascript");
const AppPage = require("../src/Shared/AppPage").default;
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const store = configureStore();

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then((data) => {
      const context = { data } 
      const content = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
          <StaticRouter location={req.url} context={context}>
            <AppPage />
          </StaticRouter>
        </ReduxProvider>
      );
      const html = `
                  <!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>React SSR</title>
                      <script src="/bundle.js" defer></script>
                      <script>window.__INITIAL_DATA__ = ${JSON.stringify(store.getState())}</script>
                    </head>
                    <body>
                      <div id="root">${content}</div>
                    </body>
                  </html>
                `;
      res.send(html);
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
