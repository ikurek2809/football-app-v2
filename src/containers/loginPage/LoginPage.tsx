import React, {FC, memo} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Form, Formik, useFormik} from "formik";
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {LoginData} from "../../domain/model/LoginData";
import {sendLoginData} from "../../domain/service/loginService";
import {useNavigate} from "react-router-dom";
import {paths} from "../../utils/paths";
import {useTranslation} from "react-i18next";

type LoginForm = {
    email: string,
    password: string,
}

const LoginPage: FC = memo(function LoginPage() {
    const {
        initialValues,
        handleSubmit,
        onSubmit,
        values,
        handleChange,
        touched,
        errors,
        validationSchema,
        t
    } = useLoginPage();

    return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form onSubmit={handleSubmit} noValidate>
                <Grid className="registration-page__registration-area" container>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {t("loginPage.login")}
                        </Typography>
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input" error={touched.email && Boolean(errors.email)}
                                   value={values.email}
                                   onChange={handleChange} name="email" label={t("loginPage.email")}
                                   helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input"
                                   error={touched.password && Boolean(errors.password)} value={values.password}
                                   onChange={handleChange} name="password" label={t("loginPage.password")}
                                   type="password"
                                   helperText={touched.password && errors.password}
                        />
                    </Grid>
                    <Grid className="registration-page__button-area" item xs={12}>
                        <Button className="registration-page__button" type="submit">{t("loginPage.submit")}</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
});

function useLoginPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const initialValues: LoginForm = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(`${t("loginPage.emailRequired")}`).email(`${t("loginPage.emailNotValid")}`),
        password: Yup.string().required(`${t("loginPage.passwordRequired")}`),
    });

    const {mutateAsync: submitLoginData} = useMutation(
        (loginData: LoginData) => sendLoginData(loginData),
        {
            onSuccess: () => {
                alert("login");
            },
            onError: () => {
                navigate(paths.homePage())
            }
        }
    );

    const onSubmit = async (values: LoginForm) => {
        await submitLoginData(values)
    }

    const {values, handleChange, touched, errors, handleSubmit} = useFormik<LoginForm>({
        initialValues,
        onSubmit,
        validationSchema
    })

    return {initialValues, handleSubmit, onSubmit, values, handleChange, errors, touched, validationSchema, t};
}

export default LoginPage;
