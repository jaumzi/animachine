import React, { memo, useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import AdminLayout from 'layout/Admin/AdminLayout';
import { useParams, useLocation } from 'react-router-dom';
import { ROUTES } from 'config/RoutesConfig';
import { AppContext } from 'config/AppContext';
import ProgramCard from 'components/Card/ProgramCard';
import EpisodeCard from 'components/Card/EpisodeCard';

function ProgramEpisodesPage(props) {
  const ctx = useContext(AppContext);
  const {
    loadingMsg,
    api
  } = ctx;

  const location = useLocation();
  console.log(location.state);
  const [state, setState] = useState({
    fontId: location.state.fontId,
    url: location.state.url,
    dados: undefined
  });
  const { fontId, dados, url } = state;

  useEffect(() => {
    searchProgramEpisodes();
  }, [url, fontId]);

  async function searchProgramEpisodes() {
    loadingMsg(true, 'Buscando episódios ');
    api()
      .post('/font/search/episode/all', { url, fontId })
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
      link: '/',
    },
    {
      name: 'Episódios',
      link: '/',
    },
  ];


  return (
    <>
      <AdminLayout>
        <Box my={2}>
          <Box marginBottom={4} >
            <BreadCrumb
              data={breadcrumbs}
            />
          </Box>

          <Grid container spacing={2}>
            {dados?.items.map((episode, index) => (
              <Grid item xs={12} sm={6} md={4} key={`episode-list-${index}`}>
                <EpisodeCard episode={episode} fontId={dados.font.id} />
              </Grid>
            ))}
          </Grid>

        </Box>
      </AdminLayout>
    </>
  );
}

export default memo(ProgramEpisodesPage);
