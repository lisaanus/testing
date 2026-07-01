'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function MaterialPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [proyek, setProyek] = useState<any[]>([]);
  const [pekerjaan, setPekerjaan] = useState<any[]>([]);
  const [sub, setSub] = useState<any[]>([]);

  const [filter, setFilter] = useState({
    id_proyek: '',
    id_pekerjaan: '',
    id_sub: '',
  });

  useEffect(() => {
    // 🔐 PROTEKSI LOGIN
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // 📊 DUMMY DROPDOWN
    setProyek([
      { id_proyek: 1, nama_proyek: "Proyek A" },
      { id_proyek: 2, nama_proyek: "Proyek B" },
    ]);

    setPekerjaan([
      { id_pekerjaan: 1, nama_pekerjaan: "Pondasi", id_proyek: 1 },
      { id_pekerjaan: 2, nama_pekerjaan: "Atap", id_proyek: 2 },
    ]);

    setSub([
      { id_sub: 1, nama_sub: "Sub 1", id_pekerjaan: 1 },
      { id_sub: 2, nama_sub: "Sub 2", id_pekerjaan: 2 },
    ]);

    // 📊 DUMMY DATA MATERIAL
    setRows([
      {
        tgl_transaksi: "2024-01-01",
        nama_item: "Semen",
        spesifikasi: "Material",
        nama_proyek: "Proyek A",
        nama_pekerjaan: "Pondasi",
        nama_sub: "Sub 1",
        biaya_pakai: 5000000,
      },
      {
        tgl_transaksi: "2024-01-02",
        nama_item: "Tukang",
        spesifikasi: "Tenaga",
        nama_proyek: "Proyek A",
        nama_pekerjaan: "Pondasi",
        nama_sub: "Sub 1",
        biaya_pakai: 3000000,
      },
    ]);
  }, []);

  /* ======================
     FILTER FRONTEND
  ====================== */
  const filteredRows = rows.filter(r => {
    if (filter.id_proyek && r.nama_proyek !== "Proyek A") return false;
    return true;
  });

  /* ======================
     DATA GRAFIK
  ====================== */
  const chartData = useMemo(() => {
    const map: Record<string, any> = {};

    filteredRows.forEach(r => {
      const tanggal = r.tgl_transaksi;

      if (!map[tanggal]) {
        map[tanggal] = {
          tanggal,
          material: 0,
          tenaga: 0,
        };
      }

      if (r.spesifikasi === 'Material') {
        map[tanggal].material += r.biaya_pakai;
      }

      if (r.spesifikasi === 'Tenaga') {
        map[tanggal].tenaga += r.biaya_pakai;
      }
    });

    return Object.values(map);
  }, [filteredRows]);

  return (
    <main className="main-content">
      <h1 className="mb-6">Material & Tenaga</h1>

      {/* FILTER */}
      <div className="card" style={{ display: 'flex', gap: 10 }}>
        <select
          value={filter.id_proyek}
          onChange={e =>
            setFilter({ ...filter, id_proyek: e.target.value })
          }
        >
          <option value="">Proyek</option>
          {proyek.map(p => (
            <option key={p.id_proyek} value={p.id_proyek}>
              {p.nama_proyek}
            </option>
          ))}
        </select>

        <button className="btn btn-primary">
          Terapkan
        </button>
      </div>

      {/* GRAFIK */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Grafik</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="tanggal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="material" fill="#3b82f6" />
            <Bar dataKey="tenaga" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="card" style={{ marginTop: 20 }}>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Item</th>
              <th>Spesifikasi</th>
              <th>Biaya</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => (
              <tr key={i}>
                <td>{r.tgl_transaksi}</td>
                <td>{r.nama_item}</td>
                <td>{r.spesifikasi}</td>
                <td>Rp {r.biaya_pakai.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}