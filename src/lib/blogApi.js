export async function getBlogs() {
  const res = await fetch("/api/blogs");
  return res.json();
}

export async function addBlog(title, content) {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function updateBlog(id, title, content) {
  const res = await fetch("/api/blogs", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, content }),
  });
  return res.json();
}

export async function deleteBlog(id) {
  const res = await fetch("/api/blogs", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}