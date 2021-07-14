import React from 'react';
import {
  LinearProgress,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Typography,
  TablePagination,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'urql';
import { PROJECTS_QUERY } from '../../Query/Projects';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

const ProjectTable = () => {
  const classes = useStyles();

  const [result] = useQuery({ query: PROJECTS_QUERY });
  const { data, fetching, error } = result;
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  console.log(page);
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
                <TableRow key={project.id}>
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
                    <IconButton aria-label="edit" onClick={() => { alert(`edit project ${project.id}`) }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
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

export default ProjectTable