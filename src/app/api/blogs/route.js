import { dbConnect } from "@/utils/dbConnect";
import Blog from "@/models/Blog";

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find();
  return Response.json(blogs);
}

export async function POST(req) {
  await dbConnect();
  const { title, content } = await req.json();
  const blog = await Blog.create({ title, content });
  return Response.json(blog);
}

export async function PUT(req) {
  await dbConnect();
  const { id, title, content } = await req.json();
  const blog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
  return Response.json(blog);
}