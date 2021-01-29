import Content from "../shared/components/layout/Content";
// import Footer from "../shared/components/layout/Footer";
// import Header from "../shared/components/layout/Header";
import "./App.css";

const App = (props) => (
  <div className="App">
    {/* <Header /> */}
    <Content>{props.children}</Content>
    {/* <Footer /> */}
  </div>
);

export default App;
