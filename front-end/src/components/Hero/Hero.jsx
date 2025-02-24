import "./Hero.css";
import heroImage from "../../assets/hero.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src={heroImage} alt="Modern furniture setup" />
      </div>
      <div className="hero-content">
        <span className="new-arrival">New Arrival</span>
        <h1 className="hero-title">
          Discover Our
          <br />
          New Collection
        </h1>
        <p className="hero-text">
          Experience the brilliance in modern furniture that redefine comfort
          and style for your home.
        </p>
        <a href="\shop" className="button">
          BUY NOW
        </a>
      </div>
    </section>
  );
};

export default Hero;
