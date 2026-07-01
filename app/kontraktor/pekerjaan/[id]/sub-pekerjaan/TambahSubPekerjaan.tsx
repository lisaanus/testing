'use client';

export default function TambahSubPekerjaanModal({
  idPekerjaan,
  onClose,
  onSuccess,
}: {
  idPekerjaan: number;
  onClose: () => void;
  onSuccess: () => void;
}) {

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;

    const subBaru = {
      id: Date.now(),
      id_pekerjaan: idPekerjaan,
      nama_sub: form.nama_sub.value,
      tgl_mulai: form.tgl_mulai.value || null,
    };

    let data = JSON.parse(localStorage.getItem("sub_pekerjaan") || "[]");

    data.push(subBaru);

    localStorage.setItem("sub_pekerjaan", JSON.stringify(data));

    alert("Sub pekerjaan berhasil ditambahkan!");

    onSuccess();
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Tambah Sub Pekerjaan</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Sub Pekerjaan</label>
            <input name="nama_sub" required />
          </div>

          <div className="form-group">
            <label>Tanggal Mulai</label>
            <input name="tgl_mulai" type="date" />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose}>
              Batal
            </button>
            <button type="submit">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}