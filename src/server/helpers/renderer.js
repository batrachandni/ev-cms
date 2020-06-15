import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Website from "../../client/layout/Website/Website";
import serialize from "serialize-javascript";
import Helmet from "react-helmet";

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Website />
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();
  return `
        <!DOCTYPE html>
        <html>
            <head>
               ${helmet.title.toString()}
             
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                ${helmet.meta.toString()}
                <Helmet>
                <title>hfuehfijei</title>
                </Helmet>
                <link rel="shortcut icon" type="image/png" href="images/Carverter-Logo-favicon@2x.png"/>
                <!-- Stylesheets -->
                <link rel="stylesheet" href="/css/style.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <!-- Script -->
               
                <script type="text/javascript" src="/bundle.js"></script>
            </body>
        </html>
    `;
};
