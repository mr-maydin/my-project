"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogs, updateBlog } from "@/lib/blogApi";

export default function Home() {
	const { status } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const [editId, setEditId] = useState(null);
	const [editTitle, setEditTitle] = useState("");
	const [editContent, setEditContent] = useState("");

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	useEffect(() => {
		getBlogs().then(setPosts);
		setPosts([]);
	}, []);

	const startEdit = (post) => {
		setEditId(post.id);
		setEditTitle(post.title);
		setEditContent(post.content);
	};

	const saveEdit = async (id) => {
		await updateBlog(id, editTitle, editContent);
		setPosts(
			posts.map((p) =>
				p.id === id ? { ...p, title: editTitle, content: editContent } : p
			)
		);
		setEditId(null);
		setEditTitle("");
		setEditContent("");
	};

	const cancelEdit = () => {
		setEditId(null);
		setEditTitle("");
		setEditContent("");
	};

	if (status === "loading")
		return (
			<div className="flex justify-center items-center h-screen">Yükleniyor...</div>
		);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
			<div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">
				<header className="flex justify-between items-center mb-10">
					<h1 className="text-3xl font-bold text-gray-800">📝 Blog Sitesi</h1>
					<button
						onClick={() => signOut({ callbackUrl: "/login" })}
						className="text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition"
					>
						Çıkış Yap
					</button>
				</header>
				<div className="space-y-8">
					{posts.map((post) =>
						editId === post.id ? (
							<div
								key={post.id}
								className="bg-gray-50 rounded-lg p-6 shadow flex flex-col gap-3"
							>
								<input
									className="text-black border border-gray-300 rounded px-3 py-2 text-lg"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<textarea
									className="text-black border border-gray-300 rounded px-3 py-2 text-base"
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
									rows={4}
								/>
								<div className="flex gap-3 mt-2">
									<button
										onClick={() => saveEdit(post.id)}
										className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
									>
										Kaydet
									</button>
									<button
										onClick={cancelEdit}
										className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
									>
										Vazgeç
									</button>
								</div>
							</div>
						) : (
							<div
								key={post.id}
								className="bg-gray-50 rounded-lg p-6 shadow flex flex-col gap-2"
							>
								<div className="flex justify-between items-center">
									<h2 className="text-2xl font-semibold text-gray-700">
										{post.title}
									</h2>
									<button
										onClick={() => startEdit(post)}
										className="text-sm text-blue-600 hover:underline"
									>
										Düzenle
									</button>
								</div>
								<p className="text-gray-700 text-base">{post.content}</p>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}
