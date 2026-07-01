'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.replace('/auth/login');
      return;
    }

    const parsed = JSON.parse(userData);

    if (parsed.is_premium) {
      router.replace('/kontraktor/dashboard');
      return;
    }

    setUser(parsed);
  }, [router]);

  const handleUpgrade = () => {
    setLoading(true);

    setTimeout(() => {
      const updatedUser = {
        ...user,
        is_premium: 1,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Upgrade berhasil! 🎉');

      router.replace('/kontraktor/dashboard');
    }, 1500); // biar keliatan loading dikit 😄
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1>Upgrade ke Premium</h1>

      <p>Dapatkan fitur lengkap untuk mengelola proyek Anda.</p>

      <div style={{ border: '1px solid #ddd', padding: 20 }}>
        <h2>Paket Premium</h2>
        <p>Rp 99.000 / bulan</p>

        <ul>
          <li>✔ Proyek tanpa batas</li>
          <li>✔ Laporan lengkap</li>
          <li>✔ Statistik proyek</li>
        </ul>

        <button onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
}