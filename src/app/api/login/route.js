export async function POST(request) {
  const { username, password } = await request.json();

  // Örnek: Sabit kullanıcı adı ve şifre
  if (username === "admin" && password === "123456") {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false }, { status: 401 });
  }
}