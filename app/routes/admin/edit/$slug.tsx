import { useEffect, useRef } from "react"
import { ActionFunction, Form, json, LoaderFunction, redirect, useLoaderData } from "remix"
import invariant from "tiny-invariant"
import { createPost, getPost } from "~/post"

type PostError = {
  title?: boolean
  slug?: boolean
  markdown?: boolean
}

export const loader: LoaderFunction = async ({params}) => {
  invariant(params.slug, "expected params.slug")
  return json(await getPost(params.slug))
}

export const action : ActionFunction = async ({request}) => {
  await new Promise(res => setTimeout(res, 1000))

  const formData = await request.formData()
  const title = formData.get("title")
  const slug = formData.get("slug")
  const markdown = formData.get("markdown")

  const errors: PostError = {}
  if (!title) errors.title = true
  if (!slug) errors.slug = true
  if (!markdown) errors.markdown = true

  if (Object.keys(errors).length) {
    return json(errors)
  }

  invariant(typeof title === "string")
  invariant(typeof slug === "string")
  invariant(typeof markdown === "string")
  await createPost({title, slug, markdown})

  return redirect("/admin")
}

const EditPost = () => {

  const post = useLoaderData()
  const ref = useRef(post.markdown)

  useEffect(() => {
    ref.current.value = post.markdown
  }, [post])

  return (
    <Form method="post" key={post}>
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" defaultValue={post.title}/>
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" defaultValue={post.slug}/>
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        <br />
        <textarea ref={ref} rows={20} name="markdown" defaultValue={post.markdown}/>
      </p>
      <p>
        <button type="submit">Update
        </button>
      </p>
    </Form>
  )
}

export default EditPost