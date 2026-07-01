'use client';

import { useEffect, useState } from 'react';

export default function TambahPekerjaan({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // ambil proyek dari localStorage
    const proyekData = JSON.parse(localStorage.getItem("proyek") || "[]");
    setProjects(proyekData);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as any;

    const pekerjaanBaru = {
      id: Date.now(), // ID unik sederhana
      id_proyek: Number(form.id_proyek.value),
      nama_proyek:
        projects.find(p => p.id_proyek == form.id_proyek.value)?.nama_proyek || "",
      nama_pekerjaan: form.nama_pekerjaan.value,
      keterangan: form.keterangan.value || "",
      progress: 0,
      sub_pekerjaan: 0,
    };

    let data = JSON.parse(localStorage.getItem("pekerjaan") || "[]");

    data.push(pekerjaanBaru);

    localStorage.setItem("pekerjaan", JSON.stringify(data));

    setLoading(false);
    onSuccess(); // refresh parent
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
        <h2>Tambah Pekerjaan</h2>

        <form onSubmit={handleSubmit}>
          <input name="nama_pekerjaan" placeholder="Nama pekerjaan" required />

          <select name="id_proyek" required>
            <option value="">-- Pilih Proyek --</option>
            {projects.map(p => (
              <option key={p.id_proyek} value={p.id_proyek}>
                {p.nama_proyek}
              </option>
            ))}
          </select>

          <textarea name="keterangan" placeholder="Keterangan" />

          <div style={{ marginTop: 16 }}>
            <button type="button" onClick={onClose}>
              Batal
            </button>

            <button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}