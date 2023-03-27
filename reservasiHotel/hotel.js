// import readline
const readline = require("readline");

// buatlah daftar harga
const menu = [{
    type: "Superior",
    "1-2 hari": 100000,
    "3-4 hari": 90000,
    ">=5 hari": 80000,
  },
  {
    type: "Deluxe",
    "1-2 hari": 150000,
    "3-4 hari": 135000,
    ">=5 hari": 120000,
  },
  {
    type: "Premium",
    "1-2 hari": 200000,
    "3-4 hari": 180000,
    ">=5 hari": 160000,
  },
];

console.table(menu, ["type", "1-2 hari", "3-4 hari", ">=5 hari"], {
  showIndex: false,
});
console.log("Keterangan :");
console.log("1. Superior");
console.log("2. Deluxe");
console.log("3. Premium");

// tentukan harga
const hargaHotel = {
  1: [{
      hari: 1,
      harga: 100000
    },
    {
      hari: 2,
      harga: 100000
    },
    {
      hari: 3,
      harga: 90000
    },
    {
      hari: 4,
      harga: 90000
    },
    {
      hari: 5,
      harga: 80000
    },
    {
      hari: Infinity,
      harga: 80000
    },
  ],
  2: [{
      hari: 1,
      harga: 150000
    },
    {
      hari: 2,
      harga: 150000
    },
    {
      hari: 3,
      harga: 135000
    },
    {
      hari: 4,
      harga: 135000
    },
    {
      hari: 5,
      harga: 120000
    },
    {
      hari: Infinity,
      harga: 120000
    },
  ],
  3: [{
      hari: 1,
      harga: 200000
    },
    {
      hari: 2,
      harga: 200000
    },
    {
      hari: 3,
      harga: 180000
    },
    {
      hari: 4,
      harga: 180000
    },
    {
      hari: 5,
      harga: 160000
    },
    {
      hari: Infinity,
      harga: 160000
    },
  ],
};

// convert menjadi nama
const tipeKamarMapping = {
  1: "Superior",
  2: "Deluxe",
  3: "Premium",
};

// process input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let totalHarga = 0;
let pemesanan = [];


function tanyaKamar() {
  rl.question(
    "Masukkan tipe kamar (input dalam bentuk angka) : ",
    (tipeKamar) => {
      if (tipeKamar < 1 || tipeKamar > 3) { // mengecek apakah tipe kamar valid
        console.log("Input tidak valid!");
        console.log("--------------");
        tanyaKamar();
        return;
      }  

      rl.question(
        "Masukkan lama menginap (dalam hari) : ",
        (lamaMenginap) => {
          const convert = tipeKamarMapping[tipeKamar];
          const hargaTipeKamar = hargaHotel[tipeKamar];
          const hargaMalam = hargaTipeKamar.find(
            (data) => lamaMenginap <= data.hari
          );
          const subTotalHarga = hargaMalam.harga * lamaMenginap;
          totalHarga += subTotalHarga;

          // tambahkan pemesanan ke array
          const pesanan = {
            tipeKamar: convert,
            lamaMenginap: lamaMenginap,
            subTotalHarga: subTotalHarga,
          };
          pemesanan.push(pesanan);

          console.log(`Tipe Kamar: ${convert}`);
          console.log(`Lama Menginap: ${lamaMenginap} hari`);
          console.log(`Subtotal Harga: Rp ${subTotalHarga}`);

          tanyaLanjut();
        }
      );
    }
  );
}

function tanyaLanjut() {
  rl.question("Ingin melanjutkan transaksi? (y/n) ", (jawaban) => {
    if (jawaban === "y") {
      console.log("--------------");
      tanyaKamar();
    } else if (jawaban === "n") {
      console.log(``);

      // tampilkan rincian pemesanan
      if (pemesanan.length > 0) {
        console.log("Rincian Pemesanan:");
        for (let i = 0; i < pemesanan.length; i++) {
          const pesanan = pemesanan[i];
          console.log(`- Tipe Kamar: ${pesanan.tipeKamar}`);
          console.log(`- Lama Menginap: ${pesanan.lamaMenginap} hari`);
          console.log(`- Subtotal Harga: Rp ${pesanan.subTotalHarga}`);
          console.log("--------------");
        }
        
      }
      console.log(`Total Harga: Rp ${totalHarga}`);

      console.log("Terima kasih telah menggunakan layanan kami!");
      rl.close();
    } else {
      console.log("Pilihan tidak valid!");
      rl.close();
    }
  });
}

tanyaKamar() 