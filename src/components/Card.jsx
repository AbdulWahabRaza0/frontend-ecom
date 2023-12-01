/* eslint-disable react/prop-types */
const Card = ({ id, name, price, description, img }) => {
  return (
    <>
      <div key={id} className="card">
        <div className="card-image">
          <img src={img} alt="photo" />
        </div>
        <div className="card-content">
          <span className="card-title">{name}</span>
          <p>{description}</p>
          <h6>{price}</h6>
        </div>
      </div>
    </>
  );
};

export default Card;
