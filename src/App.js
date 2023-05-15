import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Videos from "./Videos";
import Video from "./Video";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Videos />
              </>
            }
          />
          <Route
            path="/videos/:videoName"
            element=<Video/>
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
