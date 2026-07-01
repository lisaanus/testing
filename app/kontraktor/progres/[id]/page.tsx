'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DetailProgresPage() {
  const { id } = useParams();
  const router = useRouter();

  const [progressList, setProgressList] = useState<any[]>([]);
  const [persentaseTerakhir, setPersentaseTerakhir] = useState(0);
  const [namaProyek, setNamaProyek] = useState('');

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push('/auth/login');
      return;
    }

    const proyek = JSON.parse(localStorage.getItem("proyek") || "[]");
    const progres = JSON.parse(localStorage.getItem("progres") || "[]");

    const currentProject = proyek.find((p: any) => p.id_proyek == id);
    setNamaProyek(currentProject?.nama_proyek || "Proyek");

    const filtered = progres.filter((p: any) => p.id_proyek == id);

    setProgressList(filtered);

    if (filtered.length > 0) {
      const last = filtered[filtered.length - 1];
      setPersentaseTerakhir(last.total_persen || 0);
    }

  }, [id, router]);

  return (
    <main className="main-content">
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Detail Progres</h1>
          <p>Proyek: <strong>{namaProyek}</strong></p>
        </div>

        <button onClick={() => router.push(`/kontraktor/progres/${id}/tambah`)}>
          + Upload Progres
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ marginTop: 20 }}>
        <div style={{ background: '#eee', height: 20 }}>
          <div
            style={{
              width: `${persentaseTerakhir}%`,
              height: '100%',
              background: '#3b82f6'
            }}
          />
        </div>
        <p>{persentaseTerakhir}% selesai</p>
      </div>

      {/* LIST */}
      {progressList.length === 0 ? (
        <p>Belum ada progres</p>
      ) : (
        progressList.map((item, i) => (
          <div key={i} style={{ marginTop: 20, borderBottom: '1px solid #eee' }}>
            
            <strong>{item.judul_update}</strong>
            <p>+{item.tambah_persentase}%</p>

            <small>
              {new Date(item.tanggal).toLocaleDateString('id-ID')}
            </small>

            <p>{item.deskripsi}</p>

            {item.file && (
              item.file.includes("video") ? (
                <video src={item.file} controls width={200} />
              ) : (
                <img src={item.file} width={200} />
              )
            )}
          </div>
        ))
      )}
    </main>
  );
}