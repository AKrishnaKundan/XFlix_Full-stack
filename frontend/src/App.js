import './App.css';
import Landing from "./components/Landing";
import VideoPage from "./components/VideoPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/video/:videoId" component={VideoPage} />;
      <Route path="/">
        <Landing/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;

