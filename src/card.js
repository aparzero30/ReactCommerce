import "./card.css";

function Card(props) {
  const MAX_TITLE_LENGTH = 42;

  const truncatedTitle =
    props.product.title.length > MAX_TITLE_LENGTH
      ? props.product.title.substring(0, MAX_TITLE_LENGTH) + "..."
      : props.product.title;

  return (
    <div className="card" onClick={props.onClick}>
      <img src={props.product.image} alt={props.product.title} />
      <div className="card-body">
        <h5 className="card-title">{truncatedTitle}</h5>

        <p className="card-price">${props.product.price}</p>
      </div>
      {/* <button
        className="btn btn-primary"
        onClick={() => addToCart(props.product)}
      >
        <span className="material-symbols-outlined">shopping_cart</span>
      </button> */}
    </div>
  );
}

export default Card;
