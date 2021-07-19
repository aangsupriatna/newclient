import { Box, Button, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Formik, useFormik } from 'formik';
import { TextField } from 'formik-material-ui';
import BaseToolbar from '../../Components/BaseToolbar';
import { Query, useMutation, useQuery } from 'urql';
import { addProjectMutation, projectQuery, projectsQuery, updateProjectMutation } from '../../Query/Projects';
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
  const { id } = props.match.params
  const isAddMode = !id;

  let projectId = isAddMode ? "" : id

  const [result] = useQuery({
    query: projectQuery,
    variables: { id: projectId },
  });

  const { data, fetching, error } = result

  const initialValues = {
    namaProyek: "",
    bidang: "",
    lokasi: "",
    namaPemberiTugas: "",
    alamatPemberiTugas: "",
    tanggalKontrak: "",
    nomorKontrak: "",
    nilaiKontrak: "",
    jv: "",
    jvWith: "",
    tanggalBast: "",
    nomorBast: "",
  }

  const [addProjectResult, addProject] = useMutation(addProjectMutation);
  const [updateProjectResult, updateProject] = useMutation(updateProjectMutation);

  const addProjectCallback = React.useCallback((values, setSubmitting) => {
    addProject(values).then(result => {
      if (!result.error) {
        props.history.push("/projects")
      }
    })
  }, [addProject]);

  const updateProjectCallback = React.useCallback((input, setSubmitting) => {
    updateProject(input).then(result => {
      if (!result.error) {
        props.history.push("/projects")
      }
    })
  }, [updateProject]);

  const onSubmit = (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    if (isAddMode) {
      addProjectCallback(values, setSubmitting);
    } else {
      const input = Object.assign({ id: projectId }, values)
      updateProjectCallback(input);
    }

  }

  // const formik = useFormik({
  //   initialValues: {
  //     namaProyek: "Pengadaan Jasa Konsultan Manajemen Konstruksi Pembangunan Gedung Layanan Pendidikan Polteknik Kesehatan",
  //     bidang: "Jasa | Konsultan Pengawas Konstruksi",
  //     lokasi: "Jakarta",
  //     namaPemberiTugas: "Politeknik Kesehatan Kemenkes RI Jakarta II",
  //     alamatPemberiTugas: "Jl. Hang Jebat III/F3, Kebayoran Baru, Jakarta Selatan",
  //     tanggalKontrak: "2016-04-25",
  //     nomorKontrak: "PL.00.01/II/3042/2016",
  //     nilaiKontrak: "360516200",
  //     jv: "60",
  //     jvWith: "PT. Virama Karya",
  //     tanggalBast: "2016-04-25",
  //     nomorBast: "BAST.00.01/II/3043/2016",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (value, { setSubmitting, setErrors, setStatus, resetForm }) => {
  //     addProject({
  //       namaProyek: value.namaProyek,
  //       bidang: value.bidang,
  //       lokasi: value.lokasi,
  //       namaPemberiTugas: value.namaPemberiTugas,
  //       alamatPemberiTugas: value.alamatPemberiTugas,
  //       tanggalKontrak: value.tanggalKontrak,
  //       nomorKontrak: value.nomorKontrak,
  //       nilaiKontrak: value.nilaiKontrak,
  //       jv: Number(value.jv),
  //       jvWith: value.jvWith,
  //       tanggalBast: value.tanggalBast,
  //       nomorBast: value.nomorBast,
  //     }).then(result => {
  //       // console.log(result)
  //     })
  //   }
  // })

  const handleClick = () => {
    props.history.push("/projects");
  }
  if (!isAddMode) {
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue, handleSubmit, handleChange }) => {
        React.useEffect(() => {
          if (!isAddMode) {
            if (data) {
              Object.entries(data.project).map(([key, value]) => {
                setFieldValue(key, value, false)
              })
            }
          }
        }, [!isAddMode, data]);

        return (
          <>
            <BaseToolbar navigation='Application / Projects / Forms' >
              <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
                <Grid item>
                  <Button onClick={handleClick}>Cancel</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </BaseToolbar>
            <Paper>
              <Box px={5} py={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="namaProyek"
                        name="namaProyek"
                        label="Nama Proyek"
                        onChange={handleChange}
                        error={touched.namaProyek && Boolean(errors.namaProyek)}
                        helperText={touched.namaProyek && errors.namaProyek}
                        variant="outlined"
                        margin="normal"
                        autoComplete="namaProyek"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="bidang"
                        name="bidang"
                        label="Bidang"
                        onChange={handleChange}
                        error={touched.bidang && Boolean(errors.bidang)}
                        helperText={touched.bidang && errors.bidang}
                        variant="outlined"
                        margin="normal"
                        autoComplete="bidang"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="lokasi"
                        name="lokasi"
                        label="Lokasi Proyek"
                        onChange={handleChange}
                        error={touched.lokasi && Boolean(errors.lokasi)}
                        helperText={touched.lokasi && errors.lokasi}
                        variant="outlined"
                        margin="normal"
                        autoComplete="lokasi"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="namaPemberiTugas"
                        name="namaPemberiTugas"
                        label="Nama Pemberi Tugas"
                        onChange={handleChange}
                        error={touched.namaPemberiTugas && Boolean(errors.namaPemberiTugas)}
                        helperText={touched.namaPemberiTugas && errors.namaPemberiTugas}
                        variant="outlined"
                        margin="normal"
                        autoComplete="namaPemberiTugas"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="alamatPemberiTugas"
                        name="alamatPemberiTugas"
                        label="Alamat Pemberi Tugas"
                        onChange={handleChange}
                        error={touched.alamatPemberiTugas && Boolean(errors.alamatPemberiTugas)}
                        helperText={touched.alamatPemberiTugas && errors.alamatPemberiTugas}
                        variant="outlined"
                        margin="normal"
                        autoComplete="alamatPemberiTugas"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="tanggalKontrak"
                        name="tanggalKontrak"
                        label="Tanggal Kontrak"
                        type="date"
                        onChange={handleChange}
                        error={touched.tanggalKontrak && Boolean(errors.tanggalKontrak)}
                        helperText={touched.tanggalKontrak && errors.tanggalKontrak}
                        variant="outlined"
                        margin="normal"
                        autoComplete="tanggalKontrak"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="nomorKontrak"
                        name="nomorKontrak"
                        label="Nomor Kontrak"
                        onChange={handleChange}
                        error={touched.nomorKontrak && Boolean(errors.nomorKontrak)}
                        helperText={touched.nomorKontrak && errors.nomorKontrak}
                        variant="outlined"
                        margin="normal"
                        autoComplete="nomorKontrak"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="nilaiKontrak"
                        name="nilaiKontrak"
                        label="Nilai Kontrak"
                        onChange={handleChange}
                        error={touched.nilaiKontrak && Boolean(errors.nilaiKontrak)}
                        helperText={touched.nilaiKontrak && errors.nilaiKontrak}
                        variant="outlined"
                        margin="normal"
                        autoComplete="nilaiKontrak"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="jv"
                        name="jv"
                        label="Join Venture"
                        onChange={handleChange}
                        error={touched.jv && Boolean(errors.jv)}
                        helperText={touched.jv && errors.jv}
                        variant="outlined"
                        margin="normal"
                        autoComplete="jv"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="jvWith"
                        name="jvWith"
                        label="Join Venture Dengan?"
                        onChange={handleChange}
                        error={touched.jvWith && Boolean(errors.jvWith)}
                        helperText={touched.jvWith && errors.jvWith}
                        variant="outlined"
                        margin="normal"
                        autoComplete="jvWith"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="tanggalBast"
                        name="tanggalBast"
                        label="Tanggal BAST"
                        type="date"
                        onChange={handleChange}
                        error={touched.tanggalBast && Boolean(errors.tanggalBast)}
                        helperText={touched.tanggalBast && errors.tanggalBast}
                        variant="outlined"
                        margin="normal"
                        autoComplete="tanggalBast"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        id="nomorBast"
                        name="nomorBast"
                        label="Nomor BAST"
                        onChange={handleChange}
                        error={touched.nomorBast && Boolean(errors.nomorBast)}
                        helperText={touched.nomorBast && errors.nomorBast}
                        variant="outlined"
                        margin="normal"
                        autoComplete="nomorBast"
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </>
        )
      }}
    </Formik >
  )
};

export default withRouter(ProjectForm);