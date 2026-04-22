import Link from "next/link";

async function getMascotas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mascotas`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error carregant les mascotas");
  return res.json();
}

export default async function HomePage() {
  const varietats = await getMascotas();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Catàleg de Mascotas
            </h1>
            <p className="text-sm text-gray-400">Tipos de perritos</p>
          </div>
          <Link
            href="/nou"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Meter perrito nuevo
          </Link>
        </div>
      </header>

      {/* Contingut */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-sm text-gray-400 mb-6">
          {varietats.length} varietats trobades
        </p>
        <ul className="flex flex-col gap-3">
          {varietats.map((b) => (
            <li key={b._id}>
              <Link
                href={`/mascotas/${b._id}`}
                className="group flex items-center justify-between bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl px-6 py-4 transition"
              >
                <div>
                  <h2 className="text-gray-900 font-semibold group-hover:text-blue-600 transition">
                    {b.nombre}
                  </h2>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {b.tipo}
                    </span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {b.raza}
                    </span>
                    <img src={b.imagen} alt={b.imagen}></img>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 text-lg transition">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
