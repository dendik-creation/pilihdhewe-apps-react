export const bar = (event) => {
  let data = {
    labels: event.candidates.map((item) => item.user.name),
    datasets: [
      {
        label: "Total Vote ",
        data: event.candidates.map((item) => item.total_vote),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  let options = {
    indexAxis: "x",
    animation: true,
    scales: {
      y: {
        max: event.total_partisipan,
        ticks: {
          beginAtZero: true,
          stepSize: 2,
        },
      },
    },
    maintainAspectRatio: false,
    // responsive: true,
    plugins: {
      title: {
        display: true,
        text:
          event.status == "Inactive"
            ? "Menunggu"
            : event.status == "Active"
            ? "Perolehan Sementara"
            : event.status == "Selesai"
            ? "Hasil Akhir"
            : "",
        font: {
          size: 16,
          family: "Quicksand",
        },
      },
      subtitle: {
        display: true,
        text:
          event.status == "Inactive"
            ? "Perolehan voting akan di tampilkan ketika event sudah dimulai"
            : event.status == "Active"
            ? "Perolehan voting bersifat sementara dan dapat berubah-ubah"
            : event.status == "Selesai"
            ? "Perolehan voting akhir, dimana menandakan event telah selesai"
            : "",
        padding: {
          bottom: 10,
        },
        font: {
          family: "Quicksand",
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return {
    data,
    options,
  };
};
