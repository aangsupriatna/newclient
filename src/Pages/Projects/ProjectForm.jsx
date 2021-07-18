import { Box, Button, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import { useFormik } from 'formik';
import BaseToolbar from '../../Components/BaseToolbar';
import { useMutation } from 'urql';
import { addProjectMutation } from '../../Query/Projects';
import { validationSchema } from './Validation';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    // marginTop: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
}));

const ProjectForm = (props) => {
  const classes = useStyles();

  const [res, executeMutation] = useMutation(addProjectMutation);
  const formik = useFormik({
    initialValues: {
      namaProyek: "Pengadaan Jasa Konsultan Manajemen Konstruksi Pembangunan Gedung Layanan Pendidikan Polteknik Kesehatan",
      bidang: "Jasa | Konsultan Pengawas Konstruksi",
      lokasi: "Jakarta",
      namaPemberiTugas: "Politeknik Kesehatan Kemenkes RI Jakarta II",
      alamatPemberiTugas: "Jl. Hang Jebat III/F3, Kebayoran Baru, Jakarta Selatan",
      tanggalKontrak: "2016-04-25",
      nomorKontrak: "PL.00.01/II/3042/2016",
      nilaiKontrak: "360516200",
      jv: "60",
      jvWith: "PT. Virama Karya",
      tanggalBast: "2016-04-25",
      nomorBast: "BAST.00.01/II/3043/2016",
    },
    validationSchema: validationSchema,
    onSubmit: (value, { setSubmitting, setErrors, setStatus, resetForm }) => {
      executeMutation({
        namaProyek: value.namaProyek,
        bidang: value.bidang,
        lokasi: value.lokasi,
        namaPemberiTugas: value.namaPemberiTugas,
        alamatPemberiTugas: value.alamatPemberiTugas,
        tanggalKontrak: value.tanggalKontrak,
        nomorKontrak: value.nomorKontrak,
        nilaiKontrak: value.nilaiKontrak,
        jv: Number(value.jv),
        jvWith: value.jvWith,
        tanggalBast: value.tanggalBast,
        nomorBast: value.nomorBast,
      }).then(result => {
        console.log(result)
      })
    }
  })
  const handleClick = () => {
    props.history.goBack();
  }
  return (
    <React.Fragment>
      <BaseToolbar navigation='Application / Projects / Forms' >
        <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
          <Grid item>
            <Button onClick={handleClick}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={formik.handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </BaseToolbar>
      <Paper>
        <Box px={3}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="namaProyek"
                  name="namaProyek"
                  label="Nama Proyek"
                  value={formik.values.namaProyek}
                  onChange={formik.handleChange}
                  error={formik.touched.namaProyek && Boolean(formik.errors.namaProyek)}
                  helperText={formik.touched.namaProyek && formik.errors.namaProyek}
                  variant="outlined"
                  margin="normal"
                  autoComplete="namaProyek"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="bidang"
                  name="bidang"
                  label="Bidang"
                  value={formik.values.bidang}
                  onChange={formik.handleChange}
                  error={formik.touched.bidang && Boolean(formik.errors.bidang)}
                  helperText={formik.touched.bidang && formik.errors.bidang}
                  variant="outlined"
                  margin="normal"
                  autoComplete="bidang"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="lokasi"
                  name="lokasi"
                  label="Lokasi Proyek"
                  value={formik.values.lokasi}
                  onChange={formik.handleChange}
                  error={formik.touched.lokasi && Boolean(formik.errors.lokasi)}
                  helperText={formik.touched.lokasi && formik.errors.lokasi}
                  variant="outlined"
                  margin="normal"
                  autoComplete="lokasi"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="namaPemberiTugas"
                  name="namaPemberiTugas"
                  label="Nama Pemberi Tugas"
                  value={formik.values.namaPemberiTugas}
                  onChange={formik.handleChange}
                  error={formik.touched.namaPemberiTugas && Boolean(formik.errors.namaPemberiTugas)}
                  helperText={formik.touched.namaPemberiTugas && formik.errors.namaPemberiTugas}
                  variant="outlined"
                  margin="normal"
                  autoComplete="namaPemberiTugas"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="alamatPemberiTugas"
                  name="alamatPemberiTugas"
                  label="Alamat Pemberi Tugas"
                  value={formik.values.alamatPemberiTugas}
                  onChange={formik.handleChange}
                  error={formik.touched.alamatPemberiTugas && Boolean(formik.errors.alamatPemberiTugas)}
                  helperText={formik.touched.alamatPemberiTugas && formik.errors.alamatPemberiTugas}
                  variant="outlined"
                  margin="normal"
                  autoComplete="alamatPemberiTugas"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="tanggalKontrak"
                  name="tanggalKontrak"
                  label="Tanggal Kontrak"
                  type="date"
                  value={formik.values.tanggalKontrak}
                  onChange={formik.handleChange}
                  error={formik.touched.tanggalKontrak && Boolean(formik.errors.tanggalKontrak)}
                  helperText={formik.touched.tanggalKontrak && formik.errors.tanggalKontrak}
                  variant="outlined"
                  margin="normal"
                  autoComplete="tanggalKontrak"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="nomorKontrak"
                  name="nomorKontrak"
                  label="Nomor Kontrak"
                  value={formik.values.nomorKontrak}
                  onChange={formik.handleChange}
                  error={formik.touched.nomorKontrak && Boolean(formik.errors.nomorKontrak)}
                  helperText={formik.touched.nomorKontrak && formik.errors.nomorKontrak}
                  variant="outlined"
                  margin="normal"
                  autoComplete="nomorKontrak"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="nilaiKontrak"
                  name="nilaiKontrak"
                  label="Nilai Kontrak"
                  value={formik.values.nilaiKontrak}
                  onChange={formik.handleChange}
                  error={formik.touched.nilaiKontrak && Boolean(formik.errors.nilaiKontrak)}
                  helperText={formik.touched.nilaiKontrak && formik.errors.nilaiKontrak}
                  variant="outlined"
                  margin="normal"
                  autoComplete="nilaiKontrak"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="jv"
                  name="jv"
                  label="Join Venture"
                  value={formik.values.jv}
                  onChange={formik.handleChange}
                  error={formik.touched.jv && Boolean(formik.errors.jv)}
                  helperText={formik.touched.jv && formik.errors.jv}
                  variant="outlined"
                  margin="normal"
                  autoComplete="jv"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="jvWith"
                  name="jvWith"
                  label="Join Venture Dengan?"
                  value={formik.values.jvWith}
                  onChange={formik.handleChange}
                  error={formik.touched.jvWith && Boolean(formik.errors.jvWith)}
                  helperText={formik.touched.jvWith && formik.errors.jvWith}
                  variant="outlined"
                  margin="normal"
                  autoComplete="jvWith"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="tanggalBast"
                  name="tanggalBast"
                  label="Tanggal BAST"
                  type="date"
                  value={formik.values.tanggalBast}
                  onChange={formik.handleChange}
                  error={formik.touched.tanggalBast && Boolean(formik.errors.tanggalBast)}
                  helperText={formik.touched.tanggalBast && formik.errors.tanggalBast}
                  variant="outlined"
                  margin="normal"
                  autoComplete="tanggalBast"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="nomorBast"
                  name="nomorBast"
                  label="Nomor BAST"
                  value={formik.values.nomorBast}
                  onChange={formik.handleChange}
                  error={formik.touched.nomorBast && Boolean(formik.errors.nomorBast)}
                  helperText={formik.touched.nomorBast && formik.errors.nomorBast}
                  variant="outlined"
                  margin="normal"
                  autoComplete="nomorBast"
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </React.Fragment>
  )
};

export default withRouter(ProjectForm);