import { json, LoaderFunction, useLoaderData } from "remix"

export const loader: LoaderFunction = async ({params}) => {
  return json(params.slug)
}

export default () => {
  
  const slug = useLoaderData()
  
  return (
    <main>
      <h1>
        Some post: {slug}
      </h1>
    </main>
  )
}