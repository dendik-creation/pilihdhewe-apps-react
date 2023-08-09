export const pie = (event) => {
  let groupByKelas = [];
  let filterKelas = [];
  event.partisipan.map((item) => {
    const kelasId = item.kelas.id;
    if (!groupByKelas[kelasId]) {
      groupByKelas[kelasId] = {
        total: 0,
        kelas: {
          id: null,
          name: null,
        },
      };
    }
    groupByKelas[kelasId].kelas = { id: item.kelas, name: item.kelas.name };
    groupByKelas[kelasId].total += 1;
  });

  filterKelas = groupByKelas.filter(
    (item) => item != null && item != undefined
  );
  let data = {
    labels: filterKelas.map((item) => item.kelas.name),
    datasets: [
      {
        label: "Total Partisipan ",
        data: filterKelas.map((item) => item.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        hoverOffset: 25,
        borderRadius: 4,
      },
    ],
  };

  let options = {
    maintainAspectRatio: true,
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Data Partisipan",
        font: {
          size: 16,
          family: "Quicksand",
        },
      },
      subtitle: {
        display: true,
        text: "Seluruh data partisipan yang di kelompokkan berdasarkan kelas",
        font: {
          family: "Quicksand",
        },
        padding: {
          bottom: 10,
        },
      },
    },
  };
  return {
    data,
    options,
  };
};
