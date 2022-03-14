import { Link } from "remix"

const Index = () => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Link to="/posts">Posts</Link>
    </div>
  );
}

export default Index