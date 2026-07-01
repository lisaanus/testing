'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    no_telepon: '',
    password: '',
    foto_profil: '',
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setForm({
      nama_lengkap: user.nama_lengkap || '',
      email: user.email || '',
      no_telepon: user.no_telepon || '',
      password: '',
      foto_profil: user.foto_profil || '',
    });

    setPreview(user.foto_profil || null);
  }, [router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setForm({ ...form, foto_profil: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const updatedUser = {
      ...form,
      password: undefined, // tidak disimpan
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profil berhasil diperbarui!");
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  const handleDelete = () => {
    if (!confirm('Yakin ingin menghapus akun?')) return;

    localStorage.clear();
    router.push('/auth/login');
  };

  return (
    <main className="main-content">
      <h1>Profil</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <img
            src={preview || '/images/default-avatar.png'}
            width={100}
          />
          <input type="file" onChange={handleFile} />
        </div>

        <input
          name="nama_lengkap"
          value={form.nama_lengkap}
          onChange={handleChange}
          placeholder="Nama"
        />

        <input
          name="email"
          value={form.email}
          readOnly
        />

        <input
          name="no_telepon"
          value={form.no_telepon}
          onChange={handleChange}
          placeholder="No HP"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password baru"
        />

        <button>Simpan</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Hapus Akun</button>
    </main>
  );
}