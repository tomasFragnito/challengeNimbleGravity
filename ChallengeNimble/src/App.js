import logo from './logo.svg';
import './App.css';
import PostulationsList from "./components/Postulations";

function App() {
  const candidate = {
    uuid: "a1b2c3d4-...",
    candidateId: "a1b2c3d4"
  };
  return (
    <div className="App">
      <header className="App-header">
        <PostulationsList />
      </header>
    </div>
  );
}

export default App;
