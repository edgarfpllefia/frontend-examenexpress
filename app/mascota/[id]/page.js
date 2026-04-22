import Link from "next/link";
import { notFound } from "next/navigation";

async function getMascotaById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/mascotas/${id}`,
    {
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Error cargando la mascota");
  return res.json();
}

export default async function DetallPage({ params }) {
  const { id } = await params;
  const mascota = await getMascotaById(id);

  if (!mascota) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-600 transition"
          >
            ← Tornar al llistat
          </Link>
        </div>
      </header>

      {/* Contingut */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {mascota.nombre}
          </h1>
          <div className="flex gap-2 mb-6">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {mascota.tipo}
            </span>
            <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {mascota.raza}
            </span>
            <img src={mascota.foto} alt={mascota.foto}></img>
          </div>

          <hr className="border-gray-100 mb-6" />

          <div className="grid grid-cols-3 gap-4 text-sm mb-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Tipo
              </p>
              <p className="text-gray-800 font-medium">{mascota.tipo}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Raza
              </p>
              <p className="text-gray-800 font-medium">{mascota.raza}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
              Foto
            </p>
            <img src={mascota.foto} alt={mascota.foto}></img>
          </div>
        </div>
      </div>
    </main>
  );
}
