import React from 'react';
import { IconButton, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { useQuery } from 'urql';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PROJECTS_QUERY } from '../../Query/Projects';

const ProjectTable = () => {
  const [result] = useQuery({ query: PROJECTS_QUERY });
  const { data, fetching, error } = result;

  return (
    <React.Fragment>
      {fetching && <p>Loading...</p>}
      {error && <p>Oh no... {error.message}</p>}
      {data && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nama Proyek</TableCell>
              <TableCell>Bidang</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Pemberi Tugas</TableCell>
              <TableCell>Nilai Kontrak</TableCell>
              <TableCell align="right">Tanggal</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.projects.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.namaProyek}</TableCell>
                <TableCell>{project.bidang}</TableCell>
                <TableCell>{project.lokasi}</TableCell>
                <TableCell>{project.namaPemberiTugas}</TableCell>
                <TableCell>{project.nilaiKontrak}</TableCell>
                <TableCell align="right">{project.tanggalKontrak}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary" onClick={() => { alert(`edit project ${project.id}`) }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete" color="secondary" onClick={() => { alert(`delete project ${project.id}`) }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      )}

    </React.Fragment>
  )
}

export default ProjectTable