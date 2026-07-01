'use client';

import { useEffect, useState } from 'react';

export default function EditProyekModal({ id, onClose }: any) {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("proyek") || "[]");
    const item = data.find((p: any) => p.id_proyek == id);

    if (!item) {
      alert("Proyek tidak ditemukan");
      onClose();
      return;
    }

    setForm(item);
  }, [id, onClose]);

  if (!form) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("proyek") || "[]");

    data = data.map((p: any) =>
      p.id_proyek == id ? { ...form } : p
    );

    localStorage.setItem("proyek", JSON.stringify(data));

    alert("Proyek berhasil diupdate!");
    onClose();
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <h2>Edit Proyek</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={form.nama_proyek}
            onChange={e => setForm({ ...form, nama_proyek: e.target.value })}
            placeholder="Nama Proyek"
          />

          <input
            value={form.lokasi || ''}
            onChange={e => setForm({ ...form, lokasi: e.target.value })}
            placeholder="Lokasi"
          />

          <input
            type="number"
            value={form.biaya_kesepakatan || ''}
            onChange={e => setForm({ ...form, biaya_kesepakatan: e.target.value })}
            placeholder="Biaya"
          />

          <input
            type="date"
            value={form.tgl_mulai || ''}
            onChange={e => setForm({ ...form, tgl_mulai: e.target.value })}
          />

          <input
            type="date"
            value={form.tgl_selesai || ''}
            onChange={e => setForm({ ...form, tgl_selesai: e.target.value })}
          />

          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="Berjalan">Berjalan</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditunda">Ditunda</option>
          </select>

          <button type="submit">Update</button>
        </form>

        <button onClick={onClose}>Batal</button>
      </div>
    </div>
  );
}