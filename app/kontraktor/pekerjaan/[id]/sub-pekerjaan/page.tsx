'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import TambahSubPekerjaanModal from './TambahSubPekerjaan';
import EditSubPekerjaanModal from './EditSubPekerjaan';
import React from 'react';

export default function SubPekerjaanPage() {
  const { id } = useParams();
  const idPekerjaan = Number(id);

  const [subs, setSubs] = useState<any[]>([]);
  const [namaPekerjaan, setNamaPekerjaan] = useState('');

  const [showTambah, setShowTambah] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     LOAD DATA LOCAL
  ========================== */
  const loadData = () => {
    const pekerjaan = JSON.parse(localStorage.getItem("pekerjaan") || "[]");
    const sub = JSON.parse(localStorage.getItem("sub_pekerjaan") || "[]");

    const job = pekerjaan.find((p: any) => p.id === idPekerjaan);
    setNamaPekerjaan(job?.nama_pekerjaan || "Pekerjaan");

    const filtered = sub.filter((s: any) => s.id_pekerjaan === idPekerjaan);
    setSubs(filtered);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    loadData();
  }, [idPekerjaan]);

  /* =========================
     DELETE
  ========================== */
  const handleDelete = (id: number) => {
    if (!confirm('Yakin ingin menghapus sub pekerjaan ini?')) return;

    let data = JSON.parse(localStorage.getItem("sub_pekerjaan") || "[]");

    data = data.filter((s: any) => s.id !== id);

    localStorage.setItem("sub_pekerjaan", JSON.stringify(data));

    loadData();
    setOpenMenuId(null);
  };

  /* =========================
     MENU
  ========================== */
  const getMenuPosition = (rect: DOMRect) => {
    const WIDTH = 160;
    const GAP = 8;
    let x = rect.right + GAP;
    if (x + WIDTH > window.innerWidth) {
      x = rect.left - WIDTH - GAP;
    }
    return { x, y: rect.top };
  };

  return (
    <main className="main-content">
      <h1>Sub Pekerjaan</h1>
      <p style={{ color: '#6b7280' }}>{namaPekerjaan}</p>

      <button onClick={() => setShowTambah(true)}>
        + Tambah Sub
      </button>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {subs.map(s => (
            <tr key={s.id}>
              <td>{s.nama_sub}</td>
              <td>{s.tgl_mulai || '-'}</td>
              <td>
                <button onClick={() => setEditId(s.id)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showTambah && (
        <TambahSubPekerjaanModal
          idPekerjaan={idPekerjaan}
          onClose={() => setShowTambah(false)}
          onSuccess={() => {
            setShowTambah(false);
            loadData();
          }}
        />
      )}

      {editId && (
        <EditSubPekerjaanModal
          idSub={editId}
          onClose={() => setEditId(null)}
          onSuccess={() => {
            setEditId(null);
            loadData();
          }}
        />
      )}
    </main>
  );
}