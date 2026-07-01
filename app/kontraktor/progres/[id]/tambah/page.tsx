'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TambahProgresPage() {
  const { id } = useParams();
  const router = useRouter();

  const [persentaseTerakhir, setPersentaseTerakhir] = useState(0);
  const [tambahPersen, setTambahPersen] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);

  /* LOAD DATA */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("progres") || "[]");

    const filtered = data.filter((p: any) => p.id_proyek == id);

    if (filtered.length > 0) {
      const last = filtered[filtered.length - 1];
      setPersentaseTerakhir(last.total_persen || 0);
    }
  }, [id]);

  /* HANDLE FILE */
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* SUBMIT */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("progres") || "[]");

    const total = Number(persentaseTerakhir) + Number(tambahPersen);

    const newData = {
      id: Date.now(),
      id_proyek: id,
      judul_update: judul,
      deskripsi,
      tambah_persentase: Number(tambahPersen),
      total_persen: total,
      file: filePreview,
      tanggal: new Date().toISOString(),
    };

    data.push(newData);

    localStorage.setItem("progres", JSON.stringify(data));

    alert("Progres berhasil ditambahkan");
    router.push(`/kontraktor/progres/${id}`);
  };

  return (
    <main className="main-content">
      <h1>Tambah Progres</h1>

      <form onSubmit={handleSubmit}>
        <input value={`${persentaseTerakhir}%`} disabled />

        <input
          type="number"
          value={tambahPersen}
          onChange={e => setTambahPersen(e.target.value)}
          placeholder="Tambah %"
          required
        />

        <input
          value={judul}
          onChange={e => setJudul(e.target.value)}
          placeholder="Judul"
          required
        />

        <textarea
          value={deskripsi}
          onChange={e => setDeskripsi(e.target.value)}
          placeholder="Deskripsi"
        />

        <input type="file" onChange={handleFileChange} />

        {filePreview && (
          <img src={filePreview} width={100} />
        )}

        <button>Simpan</button>
      </form>
    </main>
  );
}