import './App.css';
import Main from './Main';
import CursorPosition from './CursorPosition';

function App() {
  var cursor = CursorPosition();
  return (
    <div className="App" style={{ background: `radial-gradient(circle at ${cursor.x}px ${cursor.y}px,rgba(9, 21, 54, 1) 0%, rgba(2, 7, 24, 1) 60%)` }}>
      <Main />
    </div>
  );
}

export default App;
