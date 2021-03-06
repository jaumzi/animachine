import React, { memo, useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { Button, Box, Grid } from '@material-ui/core';
import AccountLayout from 'layout/Account/AccountLayout';
import DefaultCard from 'components/Card/DefaultCard';
import { Input } from 'components/Form/Inputs';
import * as yup from 'yup';
import { AppContext } from 'config/AppContext';
import { NAMEAPP } from 'config/ConstantsConfig';
import { Link as LinkRoute } from 'react-router-dom';
import { ROUTES } from 'config/RoutesConfig';

function AccountRecoveryPage() {
  const formRef = useRef(null);
  const ctx = useContext(AppContext);
  const {
    loadingMsg,
    // api
  } = ctx;

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        password: yup
          .string()
          .min(6)
          .required(),
        confirmPassword: yup
          .string()
          .min(6)
          .required()
          .equals(data.password, 'As senhas devem ser iguais!'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // se chegar ate aqui é válido
      loadingMsg(true, 'Alterando dados da conta');
      setTimeout(() => {
        loadingMsg();
      }, 4000);
      // api()
      //   .post('/usuario/create-account', data)
      //   .then(data => {
      //     loadingMsg();
      //     login(data?.data);
      //     history.push('/'); // redireciona
      //   });
    }
    catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <AccountLayout title={`${NAMEAPP} - Recuperação de conta`} size="sm">
        <DefaultCard title="Recuperação de conta">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Box my={4}>
              <Input name="password" label="Senha" type="password" autoComplete="new-password" />
              <Input name="confirmPassword" label="Confirmar senha" type="password" autoComplete="new-password" />
            </Box>
            <Grid container direction="row" justify="space-between" alignItems="center" >
              <Button
                component={LinkRoute}
                to={ROUTES.LOGIN.src()}
                variant="outlined"
                disableElevation
              >
                Voltar para login
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{ float: 'right', marginBottom: 12 }}
                onClick={() => formRef.current.submitForm()}
                disableElevation
              >
                Alterar
              </Button>
            </Grid>
          </Form>
        </DefaultCard>
      </AccountLayout>
    </>
  );
}

export default memo(AccountRecoveryPage);
