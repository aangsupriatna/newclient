import React from 'react';
import {
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  TablePagination,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQuery } from 'urql';
import { withRouter } from 'react-router';
import MenuActionsTable from '../../Components/MenuActionsTable';

const projectsQuery = `
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

const deleteProjectMutation = `
  mutation($id: ID){
    removeProject(id:$id){
          id
      }
  }
`
const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const ProjectTable = (props) => {
  const classes = useStyles();

  const [result] = useQuery({ query: projectsQuery });
  const [res, executeMutation] = useMutation(deleteProjectMutation);

  const { data, fetching, error } = result;
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (id, e) => {
    e.preventDefault();
    alert(id);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    executeMutation({ id }).then(result => {
      console.log(result);
    });
  };

  return (
    <React.Fragment>
      {fetching && <p>Loading...</p>}
      {error && <p>Oh no... {error.message}</p>}
      {data && (
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={true} />
                </TableCell>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Lokasi</TableCell>
                <TableCell align="center">Institusi</TableCell>
                <TableCell align="center">Nilai</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Progress</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.projects.slice(page * limit, page * limit + limit).map(project => (
                <TableRow key={project.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={false} />
                  </TableCell>
                  <TableCell>{project.namaProyek}</TableCell>
                  <TableCell align="center">{project.lokasi}</TableCell>
                  <TableCell align="center">
                    <div className={classes.avatar}>
                      <Avatar >{data.projects.length}</Avatar>
                    </div>
                  </TableCell>
                  <TableCell align="center">{project.nilaiKontrak}</TableCell>
                  <TableCell align="center">{project.tanggalKontrak}</TableCell>
                  <TableCell align="center">
                    <LinearProgress variant="determinate" value={45} />
                  </TableCell>
                  <TableCell align="center">
                    <MenuActionsTable handleEdit={handleEdit} handleDelete={handleDelete} row={project} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data.projects.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      )}

    </React.Fragment>
  )
}

export default withRouter(ProjectTable);