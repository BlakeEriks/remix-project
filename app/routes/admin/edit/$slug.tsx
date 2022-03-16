import { Form, json, LoaderFunction, useLoaderData } from "remix"
import invariant from "tiny-invariant"
import { getPost } from "~/post"

export const loader: LoaderFunction = async ({params}) => {
  invariant(params.slug, "expected params.slug")
  return json(await getPost(params.slug))
}

const EditPost = () => {

  const post = useLoaderData()
  console.log(post)

  return (
    <Form method="post" defaultValue={post}>
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        <br />
        <textarea id="markdown" rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">Update
        </button>
      </p>
    </Form>
  )
}

export default EditPost