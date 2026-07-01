'use client';

import { useEffect, useState } from 'react';

type Props = {
  idSub: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditSubPekerjaanModal({
  idSub,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // ambil data dari localStorage
    const data = JSON.parse(localStorage.getItem("sub_pekerjaan") || "[]");

    const item = data.find((x: any) => x.id === idSub);

    if (!item) {
      alert("Data tidak ditemukan");
      onClose();
      return;
    }

    setForm(item);
    setLoading(false);
  }, [idSub, onClose]);

  if (loading || !form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("sub_pekerjaan") || "[]");

    data = data.map((x: any) =>
      x.id === idSub ? { ...x, ...form } : x
    );

    localStorage.setItem("sub_pekerjaan", JSON.stringify(data));

    alert("Sub pekerjaan berhasil diupdate!");
    onSuccess();
    onClose();
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
        <h2>Edit Sub Pekerjaan</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={form.nama_sub}
            onChange={e =>
              setForm({ ...form, nama_sub: e.target.value })
            }
            placeholder="Nama Sub"
            required
          />

          <input
            type="date"
            value={form.tgl_mulai || ""}
            onChange={e =>
              setForm({ ...form, tgl_mulai: e.target.value })
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