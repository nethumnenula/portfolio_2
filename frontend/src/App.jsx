import "./App.css";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Hero from "./Hero/Hero.jsx";
import About from "./About/About.jsx";
import Stack from "./Stack/Stack.jsx";
import Projects from "./Projects/Projects.jsx";
import Education from "./Education/Education.jsx";
import Contact from "./Contact/Contact.jsx";
import Footer from "./Footer/Footer.jsx";
import Loading from "./Loading/Loading.jsx";
import Admin from "./Admin/Admin.jsx";
// import CustomCursor from "./CustomCursor/CustomCursor.jsx";

function App() {
  
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <Router>
      {loading && <Loading onLoadingComplete={handleLoadingComplete} />}
      {/* {!loading && <CustomCursor />} */}
      
      <div 
        className="App" 
        style={{ 
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          visibility: contentVisible ? "visible" : "hidden",
        }}
      >
        <Header />

        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={
            <>
              <section id="home">
                <Hero />
              </section>

              <section id="about">
                <About />
              </section>

              <section id="skills">
                <Stack />
              </section>

              <section id="projects">
                <Projects />
              </section>

              <section id="education">
                <Education />
              </section>

              <section id="contact">
                <Contact />
              </section>

              <Footer />
            </>
          } />
          
          {/* Admin Route */}
          <Route path="/admin" element={
            <>
              <Admin />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;