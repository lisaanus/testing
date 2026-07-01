'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DetailPengeluaranPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [pengeluaran, setPengeluaran] = useState<any>(null);
  const [details, setDetails] = useState<any[]>([]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    const data = JSON.parse(localStorage.getItem("pengeluaran") || "[]");

    const item = data.find((p: any) => String(p.id) === String(id));

    if (!item) {
      alert("Data tidak ditemukan");
      router.back();
      return;
    }

    setPengeluaran(item);
    setDetails(item.details || []);
    setLoading(false);
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!pengeluaran) return null;

  return (
    <main className="main-content">
      {/* HEADER */}
      <div className="flex-between mb-4">
        <div>
          <h1>Detail Pengeluaran</h1>
          <p style={{ color: '#6b7280' }}>
            No Nota: {pengeluaran.no_nota || '-'}
          </p>
        </div>

        <button onClick={() => router.back()}>
          ← Kembali
        </button>
      </div>

      {/* INFO */}
      <div className="card">
        <p><strong>Proyek:</strong> {pengeluaran.nama_proyek}</p>
        <p><strong>Tanggal:</strong> {pengeluaran.tgl_transaksi}</p>
        <p><strong>Spesifikasi:</strong> {pengeluaran.spesifikasi}</p>
      </div>

      {/* ITEM */}
      <table>
        <thead>
          <tr>
            <th>Nama Item</th>
            <th>Banyak</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {details.map((d, i) => (
            <tr key={i}>
              <td>{d.nama_item}</td>
              <td>{d.banyak}</td>
              <td>Rp {Number(d.harga_satuan).toLocaleString('id-ID')}</td>
              <td>
                Rp {(d.banyak * d.harga_satuan).toLocaleString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}