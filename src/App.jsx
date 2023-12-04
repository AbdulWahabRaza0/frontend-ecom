import "./App.css";
import "@brainhubeu/react-carousel/lib/style.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import routes from "./routes.jsx";
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});
const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Nav />
      <div className="container">{element}</div>
    </>
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
