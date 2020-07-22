import React, { memo, useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import AdminLayout from 'layout/Admin/AdminLayout';
import { useParams } from 'react-router-dom';
import { ROUTES } from 'config/RoutesConfig';
import { AppContext } from 'config/AppContext';
import ProgramCard from 'components/Card/ProgramCard';

function ProgramSearchPage(props) {
  const ctx = useContext(AppContext);
  const {
    loadingMsg,
    api
  } = ctx;

  const params = useParams();
  console.log(params.search);
  const [state, setState] = useState({
    searchText: params.search,
    dados: undefined
  });
  const { searchText, dados } = state;

  useEffect(() => {
    searchProgram();
  }, [searchText]);

  async function searchProgram() {
    loadingMsg(true, 'Buscando: ' + searchText);
    api()
      .post('/font/search', { search: searchText, fontId: 0 })
      .then(data => {
        loadingMsg();
        console.log(data.data);
        setState(prev => ({
          ...prev,
          dados: data.data
        }));
      });
  }

  const breadcrumbs = [
    {
      name: 'Início',
      link: ROUTES.HOME.src(),
    },
    {
      name: `Busca: ${searchText}`,
      link: ROUTES.SEARCH.src(searchText),
    },
  ];


  return (
    <>
      <AdminLayout title={`Busca: ${searchText}`} >
        <Box my={2}>
          <Box marginBottom={4} >
            <BreadCrumb
              data={breadcrumbs}
            />
          </Box>

          <Grid container spacing={2}>
            {dados?.items.map((program, index) => (
              <Grid item xs={12} sm={6} md={4} key={`program-list-${index}`}>
                <ProgramCard program={program} fontId={dados.font.id} />
              </Grid>
            ))}
          </Grid>

        </Box>
      </AdminLayout>
    </>
  );
}

export default memo(ProgramSearchPage);
