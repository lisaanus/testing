'use client';

import { useEffect, useState } from 'react';

export default function EditPekerjaanModal({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const [form, setForm] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // ambil proyek dari localStorage
    const proyekData = JSON.parse(localStorage.getItem("proyek") || "[]");
    setProjects(proyekData);

    // ambil pekerjaan dari localStorage
    const pekerjaanData = JSON.parse(localStorage.getItem("pekerjaan") || "[]");

    const item = pekerjaanData.find((p: any) => p.id === id);

    if (!item) {
      alert("Data tidak ditemukan");
      onClose();
      return;
    }

    setForm(item);
    setLoading(false);
  }, [id, onClose]);

  if (loading || !form) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let pekerjaanData = JSON.parse(localStorage.getItem("pekerjaan") || "[]");

    pekerjaanData = pekerjaanData.map((p: any) =>
      p.id === id ? { ...p, ...form } : p
    );

    localStorage.setItem("pekerjaan", JSON.stringify(pekerjaanData));

    alert("Berhasil update pekerjaan!");
    onClose();

    window.location.reload();
  };

  return (
    <div className="modal active" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        padding: 24,
        borderRadius: 8,
        width: '100%',
        maxWidth: 500
      }}>
        <h2>Edit Pekerjaan</h2>

        <form onSubmit={handleSubmit}>
          {/* PROYEK */}
          <select
            value={form.id_proyek}
            onChange={e => setForm({ ...form, id_proyek: e.target.value })}
          >
            <option value="">-- Pilih Proyek --</option>
            {projects.map((p) => (
              <option key={p.id_proyek} value={p.id_proyek}>
                {p.nama_proyek}
              </option>
            ))}
          </select>

          {/* NAMA */}
          <input
            value={form.nama_pekerjaan}
            onChange={e =>
              setForm({ ...form, nama_pekerjaan: e.target.value })
            }
          />

          {/* KETERANGAN */}
          <textarea
            value={form.keterangan}
            onChange={e =>
              setForm({ ...form, keterangan: e.target.value })
            }
          />

          <div style={{ marginTop: 16 }}>
            <button type="button" onClick={onClose}>
              Batal
            </button>
            <button type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}