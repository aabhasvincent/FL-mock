import React from "react";
import { hydrate } from "react-dom";
import AppPage from "./Shared/AppPage";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./Store/configureStore";

const store = configureStore();

// const clientBundle = (
//   <ReduxProvider store={store}>
//     <BrowserRouter>
//       <AppPage />
//     </BrowserRouter>
//   </ReduxProvider>
// );


// window.onload = () => {
//   Loadable.preloadReady().then(() => {
//     hydrate(clientBundle, document.getElementById("root"));
//   });
// };

hydrate(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <AppPage />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
