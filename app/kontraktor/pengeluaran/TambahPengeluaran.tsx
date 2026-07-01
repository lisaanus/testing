'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahPengeluaran() {
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);

  const [form, setForm] = useState({
    no_nota: '',
    id_proyek: '',
    nama_proyek: '',
    tgl_transaksi: '',
    spesifikasi: 'Material',
  });

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    const proyek = JSON.parse(localStorage.getItem("proyek") || "[]");
    setProjects(proyek);
  }, []);

  const handleSubmit = () => {
    const data = JSON.parse(localStorage.getItem("pengeluaran") || "[]");

    const newData = {
      id: Date.now(),
      ...form,
      nama_proyek:
        projects.find(p => p.id_proyek == form.id_proyek)?.nama_proyek || "",
      details,
    };

    data.push(newData);

    localStorage.setItem("pengeluaran", JSON.stringify(data));

    alert("Pengeluaran berhasil ditambahkan");
    router.push("/kontraktor/pengeluaran");
  };

  return (
    <main className="main-content">
      <h1>Tambah Pengeluaran</h1>

      <input
        placeholder="No Nota"
        value={form.no_nota}
        onChange={e => setForm({ ...form, no_nota: e.target.value })}
      />

      <select
        value={form.id_proyek}
        onChange={e => setForm({ ...form, id_proyek: e.target.value })}
      >
        <option value="">Pilih Proyek</option>
        {projects.map(p => (
          <option key={p.id_proyek} value={p.id_proyek}>
            {p.nama_proyek}
          </option>
        ))}
      </select>

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
            placeholder="Nama Item"
            value={d.nama_item}
            onChange={e => {
              const copy = [...details];
              copy[i].nama_item = e.target.value;
              setDetails(copy);
            }}
          />

          <input
            type="number"
            placeholder="Banyak"
            value={d.banyak}
            onChange={e => {
              const copy = [...details];
              copy[i].banyak = Number(e.target.value);
              setDetails(copy);
            }}
          />

          <input
            type="number"
            placeholder="Harga"
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