import React from 'react';

export const projectsQuery = `
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
export const projectQuery = `
  query($id: ID!) {
    project(id: $id) {
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

export const addProjectMutation = `
  mutation(
    $namaProyek: String, 
    $bidang: String, 
    $lokasi: String, 
    $namaPemberiTugas: String, 
    $alamatPemberiTugas: String, 
    $tanggalKontrak: String,
    $nomorKontrak: String,
    $nilaiKontrak: String,
    $jv: String,
    $jvWith: String,
    $tanggalBast: String,
    $nomorBast: String,
    ){
      addProject(input: {
        namaProyek: $namaProyek,
        bidang: $bidang,
        lokasi: $lokasi,
        namaPemberiTugas: $namaPemberiTugas,
        alamatPemberiTugas: $alamatPemberiTugas,
        tanggalKontrak: $tanggalKontrak,
        nomorKontrak: $nomorKontrak,
        nilaiKontrak: $nilaiKontrak,
        jv: $jv,
        jvWith: $jvWith,
        tanggalBast: $tanggalBast,
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

export const updateProjectMutation = `
  mutation(
    $id: ID,
    $namaProyek: String, 
    $bidang: String, 
    $lokasi: String, 
    $namaPemberiTugas: String, 
    $alamatPemberiTugas: String, 
    $tanggalKontrak: String,
    $nomorKontrak: String,
    $nilaiKontrak: String,
    $jv: String,
    $jvWith: String,
    $tanggalBast: String,
    $nomorBast: String,
    ){
      updateProject(input: {
        id: $id,
        namaProyek: $namaProyek,
        bidang: $bidang,
        lokasi: $lokasi,
        namaPemberiTugas: $namaPemberiTugas,
        alamatPemberiTugas: $alamatPemberiTugas,
        tanggalKontrak: $tanggalKontrak,
        nomorKontrak: $nomorKontrak,
        nilaiKontrak: $nilaiKontrak,
        jv: $jv,
        jvWith: $jvWith,
        tanggalBast: $tanggalBast,
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

export const deleteProjectMutation = `
  mutation removeProject($id: ID){
    removeProject(id:$id){
          id
      }
  }
`