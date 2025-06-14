"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogs, addBlog, updateBlog } from "@/lib/blogApi";

export default function Home() {
	const { status } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const [editId, setEditId] = useState(null);
	const [editTitle, setEditTitle] = useState("");
	const [editContent, setEditContent] = useState("");
	const [showNew, setShowNew] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	useEffect(() => {
		getBlogs().then(setPosts);
	}, []);

	const startEdit = (post) => {
		setEditId(post.id);
		setEditTitle(post.title);
		setEditContent(post.content);
	};

	const saveEdit = async (id) => {
		await updateBlog(id, editTitle, editContent);
		setEditId(null);
		setEditTitle("");
		setEditContent("");
		getBlogs().then(setPosts); // Listeyi güncelle
	};

	const cancelEdit = () => {
		setEditId(null);
		setEditTitle("");
		setEditContent("");
	};

	const addNewBlog = async (e) => {
		e.preventDefault();
		await addBlog(newTitle, newContent);
		setShowNew(false);
		setNewTitle("");
		setNewContent("");
		getBlogs().then(setPosts); // Listeyi güncelle
	};

	if (status === "loading")
		return (
			<div className="flex justify-center items-center h-screen">Yükleniyor...</div>
		);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
			<div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-12">
				<header className="flex justify-between items-center mb-10">
					<h1 className="text-3xl font-bold text-gray-800">📝 Blog Sitesi</h1>
					<button
						onClick={() => signOut({ callbackUrl: "/login" })}
						className="text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition"
					>
						Çıkış Yap
					</button>
				</header>

				{/* Yeni Blog Ekle Butonu */}
				<div className="mb-8 flex justify-end">
					<button
						onClick={() => setShowNew((v) => !v)}
						className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow transition"
					>
						{showNew ? "Vazgeç" : "Yeni Blog Ekle"}
					</button>
				</div>

				{/* Yeni Blog Formu */}
				{showNew && (
					<form
						onSubmit={addNewBlog}
						className="bg-gray-50 rounded-lg p-8 shadow flex flex-col gap-4 mb-10"
					>
						<input
							className="text-blackborder border-gray-300 rounded px-4 py-2 text-lg"
							placeholder="Başlık"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							required
						/>
						<textarea
							className="text-black border border-gray-300 rounded px-4 py-2 text-base"
							placeholder="İçerik"
							value={newContent}
							onChange={(e) => setNewContent(e.target.value)}
							rows={4}
							required
						/>
						<button
							type="submit"
							className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
						>
							Kaydet
						</button>
					</form>
				)}

				<div className="space-y-10">
					{posts.map((post) =>
						editId === post.id ? (
							<div
								key={post.id}
								className="bg-gray-50 rounded-lg p-8 shadow flex flex-col gap-4"
							>
								<input
									className="text-black border border-gray-300 rounded px-4 py-2 text-lg"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<textarea
									className="text-black border border-gray-300 rounded px-4 py-2 text-base"
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
									rows={4}
								/>
								<div className="flex gap-4 mt-2">
									<button
										onClick={() => saveEdit(post.id)}
										className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
									>
										Kaydet
									</button>
									<button
										onClick={cancelEdit}
										className="px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
									>
										Vazgeç
									</button>
								</div>
							</div>
						) : (
							<div
								key={post.id}
								className="bg-gray-50 rounded-lg p-8 shadow flex flex-col gap-3"
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
