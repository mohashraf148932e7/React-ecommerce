import "./ProductCard.css";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { image, name, category, priceOld, priceCurrent, badge } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        {badge && (
          <span className={`product-badge ${badge.type}`}>{badge.text}</span>
        )}
        <div className="product-actions">
          <button className="action-btn share">
            <i className="fas fa-share"></i>
            <span>Share</span>
          </button>
          <button className="action-btn compare">
            <i className="fas fa-compress-alt"></i>
            <span>Compare</span>
          </button>
          <button className="action-btn like">
            <i className="fas fa-heart"></i>
            <span>Like</span>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">{category}</p>
        <div className="product-price">
          {priceOld && <span className="price-old">{priceOld}</span>}
          <span className="price-current">{priceCurrent}</span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    priceOld: PropTypes.string,
    priceCurrent: PropTypes.string.isRequired,
    badge: PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductCard;
