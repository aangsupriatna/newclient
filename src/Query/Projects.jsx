import React from 'react';
import { useMutation } from 'urql';

const PROJECTS_QUERY = `
  query {
    projects {
      id
      namaProyek
      bidang
      lokasi
      namaPemberiTugas
      alamatPemberiTugas
      tanggalKontrak
      nomorKontrak
      nilaiKontrak
      jv
      jvWith
      tanggalBast
      nomorBast
    }
  }
`

const ADD_PROJECT_MUTATION = `
  mutation(
    $namaProyek: String!,
    $bidang: String!,
    $lokasi: String!,
    $namaPemberiTugas: String!,
    $alamatPemberiTugas: String!,
    $tanggalKontrak: String!,
    $nomorKontrak: String!,
    $nilaiKontrak: String!,
    $jv: String!,
    $jvWith: String!,
    $tanggalBast: String!,
    $nomorBast: String!,
  ) {
    addUser(input: {
      namaProyek: $namaProyek
      bidang: $bidang
      lokasi: $lokasi
      namaPemberiTugas: $namaPemberiTugas
      alamatPemberiTugas: $alamatPemberiTugas
      tanggalKontrak: $tanggalKontrak
      nomorKontrak: $nomorKontrak
      nilaiKontrak: $nilaiKontrak
      jv: $jv
      jvWith: $jvWith
      tanggalBast: $tanggalBast
      nomorBast: $nomorBast
    }){
      id
      namaProyek
      bidang
      lokasi
      namaPemberiTugas
      alamatPemberiTugas
      tanggalKontrak
      nomorKontrak
      nilaiKontrak
      jv
      jvWith
      tanggalBast
      nomorBast
    }
  }
`
export {
  PROJECTS_QUERY,
  ADD_PROJECT_MUTATION,
}