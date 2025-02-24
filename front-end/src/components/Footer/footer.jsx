import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">IKIA CERATO</h3>
          <p className="footer-address">
            123 Main Street, 5th Settlement, New Cairo, Egypt.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Links</h3>
          <ul className="footer-links">
            <li>
              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shop">Shop</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Help</h3>
          <ul className="footer-links">
            <li>
              <a href="/payment-options">Payment Options</a>
            </li>
            <li>
              <a href="/returns">Returns</a>
            </li>
            <li>
              <a href="/privacy-policies">Privacy Policies</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="newsletter-input"
            />
            <button type="submit" className="button dark">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">2023 IKIA CERATO All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
