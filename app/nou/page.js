'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NouBacallaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nom: '', origen: '', tipus: '', descripcio: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bacalla`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error en crear el bacallà');
      }
      const nouBacalla = await res.json();
      router.push(`/bacalla/${nouBacalla._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition">← Tornar al llistat</Link>
        </div>
      </header>

      {/* Contingut */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8">

          <h1 className="text-2xl font-bold text-gray-900 mb-7">Afegir nova varietat</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Ex: Bacallà salat tradicional" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Origen</label>
              <input type="text" name="origen" value={formData.origen} onChange={handleChange} required placeholder="Ex: Noruega" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tipus</label>
              <input type="text" name="tipus" value={formData.tipus} onChange={handleChange} required placeholder="Ex: Salat, Fresc, Fumat..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Descripció</label>
              <textarea name="descripcio" value={formData.descripcio} onChange={handleChange} required rows={4} placeholder="Descriu la varietat..." className={inputClass} />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-6 py-2.5 rounded-lg transition"
              >
                {loading ? 'Enviant...' : 'Afegir bacallà'}
              </button>
            </div>
          </form>

        </div>
      </div>

    </main>
  );
}
