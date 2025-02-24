import React from "react";
import "./RoomsInspiration.css";
import inspire1 from "../../assets/inspire1.png";
import inspire2 from "../../assets/inspire2.png";
import inspire3 from "../../assets/inspire3.png";

const RoomsInspiration = () => {
  return (
    <section className="rooms-inspiration">
      <div className="container1">
        <div className="text-section">
          <h1>50+ Beautiful rooms inspiration</h1>
          <p>
            Our designer already made a lot of beautiful prototype of rooms that
            inspire you
          </p>
          <a href="/explore" className="button">
            Explore More
          </a>
        </div>
        <div className="carousel">
          <div className="image-container1">
            <img src={inspire1} alt="Room 1" />
          </div>
          <div className="image-container1">
            <img src={inspire2} alt="Room 2" />
          </div>

          <div class="image-container12">
            <img src={inspire3} alt="Room 2" />
          </div>
        </div>
      </div>
      <div class="dots">
        <div class="active"></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default RoomsInspiration;

// <section class="rooms-inspiration">
// <div class="container1">
//   <div class="text-section">
//     <h1>50+ Beautiful rooms inspiration</h1>
//     <p>
//       Our designer already made a lot of beautiful prototype of rooms that
//       inspire you
//     </p>
//     <a href="#" class="button">Explore More</a>
//   </div>
//   <div class="carousel">
//     <div class="image-container11">
//       <img src="assets/inspire1.png" alt="Room 1" />
//     </div>
//     <div class="image-container12">
//       <img src="assets/inspire2.png" alt="Room 2" />

//       <div class="dots">
//         <div class="active"></div>
//         <div></div>
//         <div></div>
//       </div>
//     </div>

//     <div class="image-container13">
//       <img src="assets/inspire3.png" alt="Room 3" />

//   </div>
// </div>
// </section>
