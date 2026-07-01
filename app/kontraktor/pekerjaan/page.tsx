'use client';

import { useEffect, useState, useRef } from 'react';
import TambahPekerjaanModal from './TambahPekerjaan';
import EditPekerjaanModal from './EditPekerjaan';
import { useRouter } from 'next/navigation';

export default function PekerjaanPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [showTambahModal, setShowTambahModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const router = useRouter();

  /* =========================
     LOAD DATA DARI LOCALSTORAGE
  ========================== */
  const loadData = () => {
    const pekerjaan = JSON.parse(localStorage.getItem("pekerjaan") || "[]");
    const proyek = JSON.parse(localStorage.getItem("proyek") || "[]");

    setJobs(pekerjaan);
    setProjects(proyek);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    loadData();
  }, []);

  /* =========================
     FILTER
  ========================== */
  const filteredJobs =
    selectedProject === 'all'
      ? jobs
      : jobs.filter(j =>
          String(j.id_proyek) === String(selectedProject)
        );

  /* =========================
     DELETE
  ========================== */
  const handleDelete = (id: number) => {
    if (!confirm('Yakin ingin menghapus pekerjaan ini?')) return;

    let data = JSON.parse(localStorage.getItem("pekerjaan") || "[]");

    data = data.filter((j: any) => j.id !== id);

    localStorage.setItem("pekerjaan", JSON.stringify(data));

    setJobs(data);
    setOpenMenuId(null);
  };

  /* =========================
     MENU
  ========================== */
  const getMenuPosition = (rect: DOMRect) => {
    const WIDTH = 150;
    const GAP = 8;
    let x = rect.right + GAP;
    if (x + WIDTH > window.innerWidth) {
      x = rect.left - WIDTH - GAP;
    }
    return { x, y: rect.top };
  };

  return (
    <main className="main-content">
      <h1 className="mb-6">Manajemen Pekerjaan</h1>

      {/* FILTER */}
      <select
        value={selectedProject}
        onChange={(e) =>
          setSelectedProject(
            e.target.value === 'all' ? 'all' : Number(e.target.value)
          )
        }
      >
        <option value="all">Semua Proyek</option>
        {projects.map(p => (
          <option key={p.id_proyek} value={p.id_proyek}>
            {p.nama_proyek}
          </option>
        ))}
      </select>

      <button onClick={() => setShowTambahModal(true)}>
        + Tambah
      </button>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Pekerjaan</th>
            <th>Proyek</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.map(j => (
            <tr key={j.id}>
              <td>{j.nama_pekerjaan}</td>
              <td>{j.nama_proyek}</td>
              <td>
                <button onClick={() => setEditId(j.id)}>Edit</button>
                <button onClick={() => handleDelete(j.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showTambahModal && (
        <TambahPekerjaanModal
          onClose={() => {
            setShowTambahModal(false);
            loadData();
          }}
        />
      )}

      {editId && (
        <EditPekerjaanModal
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