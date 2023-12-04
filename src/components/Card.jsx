/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../helpers";
const RenderText = ({ text }) => {
  return <span>{text}</span>;
};

const RenderParagraph = ({ children }) => {
  return <p>{children.map(renderNode)}</p>;
};

const renderNode = (node, index) => {
  switch (node.type) {
    case "paragraph":
      return <RenderParagraph key={index} {...node} />;
    case "text":
      return <RenderText key={index} {...node} />;
    default:
      return null;
  }
};

export const RenderJSONData = ({ data }) => {
  return <div>{data.map(renderNode)}</div>;
};
const Card = ({ id, name, price, description, img }) => {
  return (
    <>
      <Link to={`/product/${id}`} className="pcard">
        <div key={id} className="card">
          <div className="card-image">
            <img className="cimg" src={`${BACKEND_URL + img}`} alt="photo" />
          </div>
          <div className="card-content black-text">
            <span className="card-title truncate">{name}</span>
            <p className="truncate">
              <RenderJSONData data={description} />
            </p>
            <h6 className="green-text">$ {price}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
