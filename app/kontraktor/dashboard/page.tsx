'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // 🔐 PROTEKSI LOGIN
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/auth/login";
      return;
    }

    // 📊 DUMMY DATA UNTUK SUS
    const dummyData = {
      nama: "User Kontraktor",
      total_proyek: 5,
      total_pekerjaan: 12,
      status_proyek: {
        berjalan: 3,
        selesai: 2,
      },
      pekerjaan_per_proyek: [
        { nama_proyek: "Proyek A", total_pekerjaan: 5 },
        { nama_proyek: "Proyek B", total_pekerjaan: 3 },
        { nama_proyek: "Proyek C", total_pekerjaan: 4 },
      ],
    };

    setData(dummyData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const statusProyek = data.status_proyek;
  const pekerjaanPerProyek = data.pekerjaan_per_proyek;

  const statusChart = {
    labels: ['Berjalan', 'Selesai'],
    datasets: [
      {
        label: 'Jumlah Proyek',
        data: [
          statusProyek.berjalan,
          statusProyek.selesai,
        ],
        backgroundColor: ['#1a73e8', '#34a853'],
        borderRadius: 6,
      },
    ],
  };

  const pekerjaanChart = {
    labels: pekerjaanPerProyek.map((p: any) => p.nama_proyek),
    datasets: [
      {
        label: 'Jumlah Pekerjaan',
        data: pekerjaanPerProyek.map((p: any) => p.total_pekerjaan),
        backgroundColor: '#fbbc04',
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="main-content">
      <h1>Dashboard</h1>
      <p style={{ color: '#ACACAC', marginBottom: '2rem' }}>
        Selamat datang kembali, {data.nama}
      </p>

      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        <div className="summary-card">
          <div className="summary-card-label">Total Proyek</div>
          <div className="summary-card-value">{data.total_proyek}</div>
        </div>

        <div className="summary-card">
          <div className="summary-card-label">Proyek Berjalan</div>
          <div className="summary-card-value">
            {statusProyek.berjalan}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-label">Proyek Selesai</div>
          <div className="summary-card-value">
            {statusProyek.selesai}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-label">Total Pekerjaan</div>
          <div className="summary-card-value">
            {data.total_pekerjaan}
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Status Proyek</div>
          </div>

          <Bar data={statusChart} />
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Jumlah Pekerjaan per Proyek</div>
          </div>

          <Bar data={pekerjaanChart} />
        </div>
      </div>
    </main>
  );
}