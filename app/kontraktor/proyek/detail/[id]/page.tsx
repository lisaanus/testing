'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DetailProyekPage() {
  const { id } = useParams();
  const router = useRouter();

  const [proyek, setProyek] = useState<any>(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push('/auth/login');
      return;
    }

    const data = JSON.parse(localStorage.getItem("proyek") || "[]");

    const item = data.find((p: any) => p.id_proyek == id);

    if (!item) {
      alert("Proyek tidak ditemukan");
      router.back();
      return;
    }

    setProyek(item);
  }, [id, router]);

  if (!proyek) return <p className="main-content">Loading...</p>;

  return (
    <main className="main-content" style={{ maxWidth: 900 }}>
      <h1>{proyek.nama_proyek}</h1>
      <p>Kode: {proyek.kode_proyek}</p>

      <p>Status: {proyek.status}</p>
      <p>Lokasi: {proyek.lokasi || '-'}</p>

      <p>
        Mulai: {proyek.tgl_mulai || '-'}
      </p>

      <p>
        Selesai: {proyek.tgl_selesai || '-'}
      </p>

      <p>
        Biaya: Rp {Number(proyek.biaya_kesepakatan || 0).toLocaleString('id-ID')}
      </p>

      {/* DOKUMEN */}
      {proyek.dokumen_mou ? (
        <a href={proyek.dokumen_mou} target="_blank">
          Lihat Dokumen
        </a>
      ) : (
        <p>Tidak ada dokumen</p>
      )}

      <br /><br />

      <button onClick={() => router.back()}>
        ← Kembali
      </button>
    </main>
  );
}