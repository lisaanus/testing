'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProgresPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push('/auth/login');
      return;
    }

    const proyek = JSON.parse(localStorage.getItem("proyek") || "[]");
    const progres = JSON.parse(localStorage.getItem("progres") || "[]");

    const result = proyek.map((p: any) => {
      const list = progres.filter((x: any) => x.id_proyek == p.id_proyek);

      let persen = 0;
      if (list.length > 0) {
        const last = list[list.length - 1];
        persen = last.total_persen || 0;
      }

      return {
        ...p,
        progres: persen
      };
    });

    setData(result);
  }, [router]);

  return (
    <main className="main-content">
      <h1 className="mb-6">Progres Proyek</h1>

      <table>
        <thead>
          <tr>
            <th>Nama Proyek</th>
            <th>Progress</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3}>Belum ada proyek</td>
            </tr>
          ) : (
            data.map(item => {
              const value = item.progres || 0;

              return (
                <tr key={item.id_proyek}>
                  <td>{item.nama_proyek}</td>

                  <td>
                    <div style={{ background: '#eee', height: 10 }}>
                      <div
                        style={{
                          width: `${value}%`,
                          height: '100%',
                          background: '#3b82f6'
                        }}
                      />
                    </div>
                    {value}%
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        router.push(`/kontraktor/progres/${item.id_proyek}`)
                      }
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </main>
  );
}