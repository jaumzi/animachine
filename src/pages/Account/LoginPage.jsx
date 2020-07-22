import React, { memo, useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { Button, Box, Grid, Typography, Link } from '@material-ui/core';
import AccountLayout from 'layout/Account/AccountLayout';
import DefaultCard from 'components/Card/DefaultCard';
import { Input, CheckBox } from 'components/Form/Inputs';
import * as yup from 'yup';
import { AppContext } from 'config/AppContext';
import { EnumPermissions } from 'config/ConstantsConfig';
import { Link as LinkRoute } from 'react-router-dom';
import { ROUTES } from 'config/RoutesConfig';


function LoginPage(props) {
  const { history } = props;
  const formRef = useRef(null);
  const ctx = useContext(AppContext);
  const {
    loadingMsg,
    login,
    //  api
  } = ctx;

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
        password: yup
          .string()
          .min(6)
          .required(),
        keepConected: yup.boolean().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // se chegar ate aqui é válido
      loadingMsg(true, 'Verificando usuário');
      setTimeout(() => {
        loadingMsg();
        login({
          id: 1,
          name: 'Usuário teste',
          email: 'teste@mail.com',
          permission: EnumPermissions.ADMIN,
        });
        history.push(ROUTES.HOME.src()); // redireciona
      }, 2000);
      // api()
      //   .post('/usuario/login', data)
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
      <AccountLayout title="Entrar" size="sm">
        <DefaultCard title="Entrar">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Box my={4}>
              <Input name="email" label="Email" autoComplete="email" autoFocus />
              <Input name="password" label="Senha" type="password" autoComplete="current-password" />
              <CheckBox name="keepConected" label="Manter conectado" />

              <Link href={ROUTES.FORGOT_PASSWORD.src()} >
                <Typography variant="subtitle1">
                  <strong>Esqueceu sua senha? Clique aqui!</strong>
                </Typography>
              </Link>
            </Box>
            <Grid container direction="row" justify="space-between" alignItems="center" >
              <Button
                component={LinkRoute}
                to={ROUTES.CREATE_ACCOUNT.src()}
                variant="outlined"
                disableElevation
              >
                Criar conta
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{ float: 'right', marginBottom: 12 }}
                onClick={() => formRef.current.submitForm()}
                disableElevation
              >
                Entrar
              </Button>
            </Grid>
          </Form>
        </DefaultCard>
      </AccountLayout>
    </>
  );
}

export default memo(LoginPage);
