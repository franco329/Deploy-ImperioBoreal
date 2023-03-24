import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { PropsProvider } from './context/'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PropsProvider>
      <Auth0Provider
        domain="dev-w73ecj7qev4bm4qx.us.auth0.com"
        clientId="XuVt1F0kEbXLmKiLk6utiZzRs0NPeWed"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </Auth0Provider>
    </PropsProvider>
  </React.StrictMode>
);
