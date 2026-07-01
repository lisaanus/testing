'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPengeluaran() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
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

    setForm(item);
    setDetails(item.details || []);
  }, [id, router]);

  if (!form) return <p>Loading...</p>;

  const handleSubmit = () => {
    let data = JSON.parse(localStorage.getItem("pengeluaran") || "[]");

    data = data.map((p: any) =>
      String(p.id) === String(id)
        ? { ...form, details }
        : p
    );

    localStorage.setItem("pengeluaran", JSON.stringify(data));

    alert("Berhasil update pengeluaran");
    router.push("/kontraktor/pengeluaran");
  };

  return (
    <main className="main-content">
      <h1>Edit Pengeluaran</h1>

      <input
        placeholder="No Nota"
        value={form.no_nota}
        onChange={e => setForm({ ...form, no_nota: e.target.value })}
      />

      <input
        type="date"
        value={form.tgl_transaksi}
        onChange={e => setForm({ ...form, tgl_transaksi: e.target.value })}
      />

      <select
        value={form.spesifikasi}
        onChange={e => setForm({ ...form, spesifikasi: e.target.value })}
      >
        <option>Material</option>
        <option>Tenaga</option>
      </select>

      <h3>Item</h3>

      {details.map((d, i) => (
        <div key={i}>
          <input
            value={d.nama_item}
            onChange={e => {
              const copy = [...details];
              copy[i].nama_item = e.target.value;
              setDetails(copy);
            }}
          />

          <input
            type="number"
            value={d.banyak}
            onChange={e => {
              const copy = [...details];
              copy[i].banyak = Number(e.target.value);
              setDetails(copy);
            }}
          />

          <input
            type="number"
            value={d.harga_satuan}
            onChange={e => {
              const copy = [...details];
              copy[i].harga_satuan = Number(e.target.value);
              setDetails(copy);
            }}
          />
        </div>
      ))}

      <button
        onClick={() =>
          setDetails([
            ...details,
            { nama_item: '', banyak: 1, harga_satuan: 0 }
          ])
        }
      >
        + Tambah Item
      </button>

      <br /><br />

      <button onClick={() => router.back()}>
        Batal
      </button>

      <button onClick={handleSubmit}>
        Simpan
      </button>
    </main>
  );
}