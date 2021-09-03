import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
// dev-7sv6hk3f.us.auth0.com
// mdg1l0G6yXhD36gPUdpowG1RxXw67EAp
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-aw-ejdi0.us.auth0.com'
      clientId='iyz2tFMsGK1UWqo5DaJ7UMlNzO7qqbQR'
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
