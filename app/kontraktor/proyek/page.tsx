'use client';

import { useEffect, useState, useRef } from 'react';
import TambahProyekModal from './TambahProyek';
import EditProyekModal from './EditProyek';
import { useRouter } from 'next/navigation';

export default function ProyekPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  /* =========================
     LOAD DATA
  ========================== */
  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("proyek") || "[]");
    setProjects(data);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push('/auth/login');
      return;
    }

    loadData();
  }, [router]);

  /* =========================
     COPY
  ========================== */
  const copyKode = async (kode: string) => {
    await navigator.clipboard.writeText(kode);
    alert(`Kode ${kode} disalin`);
  };

  /* =========================
     DELETE
  ========================== */
  const handleDelete = (id: number) => {
    if (!confirm('Yakin hapus proyek?')) return;

    let data = JSON.parse(localStorage.getItem("proyek") || "[]");

    data = data.filter((p: any) => p.id_proyek !== id);

    localStorage.setItem("proyek", JSON.stringify(data));

    setProjects(data);
    setOpenMenuId(null);
  };

  /* =========================
     MENU
  ========================== */
  const getMenuPosition = (rect: DOMRect) => {
    const WIDTH = 150;
    let x = rect.right + 8;

    if (x + WIDTH > window.innerWidth) {
      x = rect.left - WIDTH - 8;
    }

    return { x, y: rect.top };
  };

  return (
    <main className="main-content">
      <h1>Manajemen Proyek</h1>

      <button onClick={() => setShowModal(true)}>
        + Tambah Proyek
      </button>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kode</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={4}>Belum ada proyek</td>
            </tr>
          ) : (
            projects.map(p => (
              <tr key={p.id_proyek}>
                <td>{p.nama_proyek}</td>

                <td>
                  {p.kode_proyek}
                  <button onClick={() => copyKode(p.kode_proyek)}>
                    📋
                  </button>
                </td>

                <td>{p.status}</td>

                <td>
                  <button
                    onClick={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPos(getMenuPosition(rect));
                      setOpenMenuId(p.id_proyek);
                    }}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MENU */}
      {openMenuId && menuPos && (
        <div ref={menuRef} style={{ position: 'fixed', top: menuPos.y, left: menuPos.x }}>
          <button onClick={() => router.push(`/kontraktor/proyek/detail/${openMenuId}`)}>
            Detail
          </button>
          <button onClick={() => setEditId(openMenuId)}>Edit</button>
          <button onClick={() => handleDelete(openMenuId)}>
            Hapus
          </button>
        </div>
      )}

      {showModal && (
        <TambahProyekModal onClose={() => {
          setShowModal(false);
          loadData();
        }} />
      )}

      {editId && (
        <EditProyekModal
          id={editId}
          onClose={() => {
            setEditId(null);
            loadData();
          }}
        />
      )}
    </main>
  );
}