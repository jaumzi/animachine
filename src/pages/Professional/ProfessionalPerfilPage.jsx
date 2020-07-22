import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import DefaultLayout from 'layout/Default/DefaultLayout';
import BreadCrumb from 'pages/Program/node_modules/components/BreadCrumb/BreadCrumb';

function ProfessionalPerfilPage() {
  const breadcrumbs = [
    {
      name: 'Início',
      link: '/',
    },
  ];


  return (
    <>
      <DefaultLayout
        title="Início"
      >
        <Box my={2}>
          <Box marginBottom={4} >
            <BreadCrumb
              data={breadcrumbs}
            />
          </Box>


        </Box>
      </DefaultLayout>
    </>
  );
}

export default memo(ProfessionalPerfilPage);
