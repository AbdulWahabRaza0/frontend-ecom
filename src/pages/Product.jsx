import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqloperations/quries";
import { BACKEND_URL } from "../helpers.js";
import { RenderJSONData } from "../components/Card";
import Carousel from "@brainhubeu/react-carousel";
import { useCart } from "react-use-cart";
const Product = () => {
  const { pid } = useParams();
  const { addItem } = useCart();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log("This is our data ", data);
  }
  const { name, price, description, images } = data.product.data.attributes;
  const addToCart = () => {
    addItem({
      id: pid,
      name,
      price,
      img: BACKEND_URL + images.data[0].attributes.url,
    });
  };
  return (
    <>
      <div className="container">
        <Carousel plugins={["arrows"]}>
          {images.data.map((attribute, index) => {
            return (
              <>
                <img
                  key={index}
                  src={`${BACKEND_URL + attribute.attributes.url}`}
                  alt={"photo"}
                  style={{ height: "50vh" }}
                />
              </>
            );
          })}
        </Carousel>

        <div>
          <h3>{name}</h3>
          <h5 className="green-text" style={{ fontWeight: "bold" }}>
            $ {price}
          </h5>
          <p>
            <RenderJSONData data={description} />
          </p>
          <button className="btn blue" onClick={addToCart}>
            Add to Card
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
