import { json, Link, useLoaderData } from "remix";
import { getPosts, Post } from "~/post";

export const loader = async () => {
  return json(await getPosts())
}

export default () => {
  
  const posts = useLoaderData<Post[]>()

  return (
    <main>
      <h1>
        Posts
      </h1>
      <ul>
        {posts.map( post => (
          <li key={post.slug}>
            <Link to={post.slug}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}