import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function BlogList() {
  // generate your data client using the Schema from your backend
  const client = generateClient<Schema>();

  const [blogs, setBlogs] = useState<Schema["Blog"][]>([]);

  async function listBlogs() {
    // fetch all todos
    const { data } = await client.models.Blog.list();
    setBlogs(data);
  }

  useEffect(() => {
    listBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <button onClick={async () => {
        // create a new Todo with the following attributes
        const { errors, data: newBlog } = await client.models.Blog.create({
          // prompt the user to enter the title
          content: window.prompt("title"),
        })
        console.log(errors, newBlog);
      }}>Create</button>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.content}</li>
        ))}
      </ul>
    </div>
  );
}
