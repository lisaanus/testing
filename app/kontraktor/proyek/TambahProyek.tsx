'use client';

import { useState } from 'react';

export default function TambahProyekModal({ onClose }: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data = JSON.parse(localStorage.getItem("proyek") || "[]");

    const newProyek = {
      id_proyek: Date.now(),
      kode_proyek: "PRJ-" + Math.floor(Math.random() * 1000),
      nama_proyek: form.nama.value,
      lokasi: form.lokasi.value,
      biaya_kesepakatan: form.biaya.value,
      tgl_mulai: form.tgl_mulai.value,
      tgl_selesai: form.tgl_selesai.value,
      status: "Berjalan",
      dokumen_mou: null,
    };

    data.push(newProyek);

    localStorage.setItem("proyek", JSON.stringify(data));

    alert("Proyek berhasil ditambahkan!");
    onClose();
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <h2>Tambah Proyek</h2>

        <form onSubmit={handleSubmit}>
          <input name="nama" placeholder="Nama Proyek" required />
          <input name="lokasi" placeholder="Lokasi" required />
          <input name="biaya" type="number" placeholder="Biaya" required />
          <input name="tgl_mulai" type="date" required />
          <input name="tgl_selesai" type="date" required />

          <button disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>

        <button onClick={onClose}>Batal</button>
      </div>
    </div>
  );
}