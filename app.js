// Mengambil elemen form dan tabel dari HTML
const feedbackForm = document.getElementById("feedbackForm");
const feedbackInput = document.getElementById("feedback");
const feedbackTable = document.getElementById("feedbackTable").getElementsByTagName("tbody")[0];

// Daftar untuk menyimpan feedback
let feedbackList = [];
let editingIndex = -1;  // Menyimpan index yang sedang diedit

// Fungsi untuk menambah atau memperbarui kesan
function handleFeedbackSubmit(event) {
  event.preventDefault();

  const feedback = feedbackInput.value.trim();
  if (feedback === "") return;

  if (editingIndex >= 0) {
    Swal.fire({
      title: "Apakah Anda ingin menyimpan perubahan?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      denyButtonText: "Jangan Simpan",
    }).then((result) => {
      if (result.isConfirmed) {
        feedbackList[editingIndex] = feedback;
        renderFeedback();
        editingIndex = -1;
        feedbackInput.value = ""; // Reset input
        Swal.fire("Tersimpan!", "Kesan telah diperbarui.", "success");
      } else {
        Swal.fire("Perubahan tidak disimpan", "", "info");
      }
    });
  } else {
    Swal.fire({
      title: "Apakah Anda ingin menambahkan kesan ini?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Tambah",
      denyButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        feedbackList.push(feedback);
        renderFeedback();
        feedbackInput.value = ""; // Reset input
        Swal.fire("Berhasil!", "Kesan telah ditambahkan.", "success");
      } else {
        Swal.fire("Tidak ada perubahan yang dilakukan", "", "info");
      }
    });
  }
}

// Fungsi untuk merender tabel feedback
function renderFeedback() {
  feedbackTable.innerHTML = ""; // Clear tabel
  feedbackList.forEach((feedback, index) => {
    const row = feedbackTable.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${feedback}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="handleEdit(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="handleDelete(${index})">Hapus</button>
      </td>
    `;
  });
}

// Fungsi untuk menghapus kesan
function handleDelete(index) {
  Swal.fire({
    title: "Apakah Anda yakin ingin menghapus kesan ini?",
    text: "Tindakan ini tidak dapat dibatalkan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      feedbackList.splice(index, 1);
      renderFeedback();
      Swal.fire("Terhapus!", "Kesan telah dihapus.", "success");
    }
  });
}

// Fungsi untuk mengedit kesan
function handleEdit(index) {
  editingIndex = index;
  feedbackInput.value = feedbackList[index];
}

// Fungsi untuk mendownload CV
function downloadCV() {
    const link = document.createElement("a");
    link.href = "cv/CV ATS NABILLA.pdf"; // Path file CV yang benar
    link.download = "CV NABILLA.PDF"; // Nama file saat diunduh
    link.click(); // Trigger unduhan
  }
  

// Menambahkan event listener pada form submit
feedbackForm.addEventListener("submit", handleFeedbackSubmit);
