import './App.css';
import Map from "./components/Map/Map"
import RoutingWrapper from './context/routeContext'
function App() {
  return (
    <RoutingWrapper>
      <Map/>
    </RoutingWrapper>
  );
}

export default App;
