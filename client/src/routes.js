import { Route, Switch } from "react-router-dom";

import App from "./components/App";
import Home from "./components/Home/Home";
import ChatRoom from './components/ChatRoom/ChatRoom';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/:roomId" component={ChatRoom} exact />
    </Switch>
  </App>
);

export default AppRoutes;
