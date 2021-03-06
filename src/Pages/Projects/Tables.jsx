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
import { grey } from '@material-ui/core/colors';
import { deleteProjectMutation } from '../../Query/Projects';

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
  tableHover: {
    "&:hover": {
      backgroundColor: grey[5],
    }
  },
}));

const ProjectTable = (props) => {
  const classes = useStyles();

  const [{ data, fetching, error }, refetch] = useQuery({ query: projectsQuery });
  const [res, executeDeleteProject] = useMutation(deleteProjectMutation);

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
    props.history.push(`/projects/forms/${id}`)
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    executeDeleteProject({ id }).then(result => {
      console.log(result);
    });
  };

  const handleDetails = (id, e) => {
    e.preventDefault();
    alert(id)
  };

  return (
    <React.Fragment>
      {fetching && <p>Loading...</p>}
      {error && <p>Oh no... {error.message}</p>}
      {data && (
        <Box>
          <Table size="small" aria-label="projects table">
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
                <TableRow key={project.id} className={classes.tableHover} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={false} />
                  </TableCell>
                  <TableCell width={400}>{project.namaProyek}</TableCell>
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
                    <MenuActionsTable handleEdit={handleEdit} handleDelete={handleDelete} handleDetails={handleDetails} row={project} />
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