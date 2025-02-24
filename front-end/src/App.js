import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import RoomsInspiration from "./components/RoomsInspiration/RoomsInspiration";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Products />
      <RoomsInspiration />
      <Footer />
    </div>
  );
}

export default App;
