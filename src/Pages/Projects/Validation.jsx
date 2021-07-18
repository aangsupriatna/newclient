import React from 'react';
import * as yup from 'yup';

export const validationSchema = yup.object({
  namaProyek: yup
    .string("Tulis nama proyek")
    .required("Nama proyek wajib diisi"),
  bidang: yup
    .string("Tulis nama bidang")
    .required("Nama bidang wajib diisi"),
  lokasi: yup
    .string("Tulis lokasi proyek")
    .required("Nama lokasi wajib diisi"),
  namaPemberiTugas: yup
    .string("Tulis nama pemberi tugas")
    .required("Nama pemberi tugas wajib diisi"),
  alamatPemberiTugas: yup
    .string("Tulis alamat pemberi tugas")
    .required("Alamat pemberi tugas diisi"),
  tanggalKontrak: yup
    .string("Tulis tanggal kontrak")
    .required("Tanggal kontrak wajib diisi"),
  nomorKontrak: yup
    .string("Tulis nomor kontrak")
    .required("Nomor kontrak wajib diisi"),
  nilaiKontrak: yup
    .string("Tulis nilai kontrak")
    .required("Nilai kontrak wajib diisi"),
  jv: yup
    .string("Apakah join venture, tulis berapa persen")
    .required("Nilai JV wajib diisi"),
  jvWith: yup
    .string("Tuliskan nama perusahaan")
    .required("Nama perusahaan JV wajib diisi"),
  tanggalBast: yup
    .string("Tulis tanggal BAST")
    .required("Tanggal BAST wajib diisi"),
  nomorBast: yup
    .string("Tulis nomor BAST")
    .required("Nomor BAST wajib diisi"),
});