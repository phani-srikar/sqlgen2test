import './App.css';
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import BlogList from "./components/BlogList";

function App() {
  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      <BlogList />
    </>
  );
}

export default withAuthenticator(App);
