export async function getBlogs() {
  const res = await fetch("/api/blogs");
  return res.json();
}

export async function updateBlog(id, title, content) {
  const res = await fetch("/api/blogs", {
    method: "PUT",
    body: JSON.stringify({ id, title, content }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}