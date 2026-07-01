'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function LaporanKeuanganPage() {

  const [proyek, setProyek] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  const [filter, setFilter] = useState({
    id_proyek: '',
    start: '',
    end: ''
  });

  useEffect(() => {
    // 🔐 PROTEKSI LOGIN
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // 📊 DUMMY PROYEK
    setProyek([
      { id_proyek: 1, nama_proyek: "Proyek A" },
      { id_proyek: 2, nama_proyek: "Proyek B" },
    ]);
  }, []);

  const fetchData = () => {
    if (!filter.id_proyek) return;

    // 📊 DUMMY LAPORAN
    setData({
      proyek: { biaya_kesepakatan: 100000000 },
      total_pengeluaran: 60000000,
      sisa_anggaran: 40000000,
      total_material: 35000000,
      total_tenaga: 25000000,
      chart: [
        { tgl_transaksi: "2024-01-01", total: 5000000 },
        { tgl_transaksi: "2024-01-05", total: 15000000 },
        { tgl_transaksi: "2024-01-10", total: 30000000 },
        { tgl_transaksi: "2024-01-15", total: 45000000 },
        { tgl_transaksi: "2024-01-20", total: 60000000 },
      ]
    });
  };

  const breakdownPercent = (value: number) => {
    if (!data || data.total_pengeluaran === 0) return '0.00';
    return ((value / data.total_pengeluaran) * 100).toFixed(2);
  };

  return (
    <main className="main-content">

      <h1 className="mb-6">Laporan Keuangan</h1>

      {/* FILTER */}
      <div className="card" style={{ marginBottom: 20 }}>
        <select
          value={filter.id_proyek}
          onChange={e =>
            setFilter({ id_proyek: e.target.value, start: '', end: '' })
          }
        >
          <option value="">-- Pilih Proyek --</option>
          {proyek.map(p => (
            <option key={p.id_proyek} value={p.id_proyek}>
              {p.nama_proyek}
            </option>
          ))}
        </select>

        <button onClick={fetchData}>
          Tampilkan Laporan
        </button>
      </div>

      {/* DATA */}
      {data && (
        <>
          <div className="grid grid-3">
            <Summary title="Total Anggaran" value={data.proyek.biaya_kesepakatan} />
            <Summary title="Total Pengeluaran" value={data.total_pengeluaran} />
            <Summary title="Sisa Anggaran" value={data.sisa_anggaran} />
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tgl_transaksi" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#395A7F" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </main>
  );
}

const Summary = ({ title, value }: any) => (
  <div className="card">
    <h4>{title}</h4>
    <strong>Rp {Number(value).toLocaleString('id-ID')}</strong>
  </div>
);