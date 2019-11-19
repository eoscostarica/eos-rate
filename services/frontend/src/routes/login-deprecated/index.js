import React from 'react'
import * as yup from 'yup'
import { Redux } from 'redux-render'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import TextField from 'components/textField'
import Button from 'components/button'

const validationSchema = t =>
  yup.object().shape({
    username: yup.string().required(t('loginValidationUsername')),
    password: yup.string().required(t('loginValidationPassword'))
  })

const Login = () => {
  const { t } = useTranslation('translations')
  return (
    <Redux selector={() => null}>
      {(_, dispatch) => (
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema(t)}
          onSubmit={async ({ username, password }, formActions) => {
            try {
              await dispatch.session.login({ username, password })
            } catch (error) {
              formActions.setSubmitting(false)
              formActions.setErrors({ username: error.message })
            }
          }}
        >
          {form => (
            <Form>
              <TextField
                autoFocus
                type='text'
                name='username'
                label={t('loginUsername')}
              />
              <TextField
                type='password'
                name='password'
                label={t('loginPassword')}
              />

              <Button
                fullWidth
                disabled={!form.isValid || form.isSubmitting}
                type='submit'
                variant='raised'
                color='primary'
              >
                {t('loginSignin')}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Redux>
  )
}

export default Login
