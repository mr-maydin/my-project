"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/lib/blogApi";

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
        setEditId(post._id);
        setEditTitle(post.title);
        setEditContent(post.content);
    };

    const saveEdit = async (id) => {
        await updateBlog(id, editTitle, editContent);
        setEditId(null);
        setEditTitle("");
        setEditContent("");
        getBlogs().then(setPosts);
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
        getBlogs().then(setPosts);
    };

    if (status === "loading")
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-100">Yükleniyor...</div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-2">
            <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-12">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-100">📝 Blog Sitesi</h1>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="text-gray-300 border border-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Çıkış Yap
                    </button>
                </header>

                {/* Yeni Blog Ekle Butonu */}
                <div className="mb-8 flex justify-end">
                    <button
                        onClick={() => setShowNew((v) => !v)}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded font-semibold shadow transition"
                    >
                        {showNew ? "Vazgeç" : "Yeni Blog Ekle"}
                    </button>
                </div>

                {/* Yeni Blog Formu */}
                {showNew && (
                    <form
                        onSubmit={addNewBlog}
                        className="bg-gray-700 rounded-lg p-8 shadow flex flex-col gap-4 mb-10"
                    >
                        <input
                            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-4 py-2 text-lg placeholder-gray-400"
                            placeholder="Başlık"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                        <textarea
                            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-4 py-2 text-base placeholder-gray-400"
                            placeholder="İçerik"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            rows={4}
                            required
                        />
                        <button
                            type="submit"
                            className="px-5 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition"
                        >
                            Kaydet
                        </button>
                    </form>
                )}

                <div className="space-y-10">
                    {posts.map((post) =>
                        editId === post._id ? (
                            <div
                                key={post._id}
                                className="bg-gray-700 rounded-lg p-8 shadow flex flex-col gap-4"
                            >
                                <input
                                    className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-4 py-2 text-lg"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                    className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-4 py-2 text-base"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={4}
                                />
                                <div className="flex gap-4 mt-2">
                                    <button
                                        onClick={() => saveEdit(post._id)}
                                        className="px-5 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition"
                                    >
                                        Kaydet
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="px-5 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
                                    >
                                        Vazgeç
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div key={post._id} className="bg-gray-700 rounded-lg p-8 shadow flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold text-gray-100">{post.title}</h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(post)}
                                            className="text-sm text-blue-400 hover:underline"
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await deleteBlog(post._id);
                                                getBlogs().then(setPosts);
                                            }}
                                            className="text-sm text-red-400 hover:underline"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-200 text-base">{post.content}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
