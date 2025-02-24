import aboutImg from "../../assets/inspire1.png";

function AboutSection() {
  return (
    <section className="about_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center text-center fw-bold col-6 offset-3">
          <h2
            className="text-center pt-5 fw-bold mb-4"
            style={{ color: "#b88e2f" }}
          >
            About Us
          </h2>
          <p className="text-center col-10 offset-1 text-dark fw-bold fs-4">
            Transforming homes with elegant, functional, and affordable
            furniture.
          </p>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-md-6">
            <div className="detail-box">
              <h3 className="fw-bold">We Are The Modern Living Experts</h3>
              <p>
                At our furniture store, we believe that great design should be
                accessible to everyone. Our pieces are crafted with high-quality
                materials, blending style and functionality to enhance your
                living spaces.
              </p>
              <p>
                Whether you are looking for minimalist Scandinavian designs or
                contemporary statement pieces, we have something for every
                taste. Sustainability and durability are at the heart of what we
                do.
              </p>
              <p>
                Let us help you turn your house into a home with furniture that
                suits your lifestyle, reflects your personality, and meets your
                everyday needs.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="img-box">
              <img src={aboutImg} alt="About Our Furniture" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
