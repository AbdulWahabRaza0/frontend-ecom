import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../gqloperations/quries";
import Card from "../components/Card";
const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div>
        <div>
          {data.products.data.map(({ id, attributes }, index) => {
            return (
              <>
                <Card
                  key={index}
                  id={id}
                  name={attributes.name}
                  price={attributes.price}
                  //   description={attributes.description}
                  img={attributes.images.data[0].attributes.url}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
