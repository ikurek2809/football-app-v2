import React, {FC, memo} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Form, Formik, useFormik} from "formik";
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {RegistrationData} from "../../domain/model/RegistrationData";
import {sendRegistrationData} from "../../domain/service/registrationService";
import {useTranslation} from "react-i18next";

type Props = Record<string, never>;

type RegistrationForm = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatedPassword: string,
}

const RegistrationPage: FC<Props> = memo(function RegistrationPage() {
    const {
        t,
        initialValues,
        handleSubmit,
        onSubmit,
        values,
        handleChange,
        touched,
        errors,
        validationSchema
    } = useRegistrationPage();

    return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form onSubmit={handleSubmit} noValidate>
                <Grid className="registration-page__registration-area" container>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {t("registrationPage.registration")}
                        </Typography>
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input"
                                   error={touched.firstName && Boolean(errors.firstName)}
                                   value={values.firstName} onChange={handleChange} name="firstName"
                                   label={t("registrationPage.firstName")}
                                   helperText={touched.firstName && errors.firstName}
                        />
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input"
                                   error={touched.lastName && Boolean(errors.lastName)} value={values.lastName}
                                   onChange={handleChange} name="lastName" label={t("registrationPage.lastName")}
                                   helperText={touched.lastName && errors.lastName}
                        />
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input" error={touched.email && Boolean(errors.email)}
                                   value={values.email}
                                   onChange={handleChange} name="email" label={t("registrationPage.email")}
                                   helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input"
                                   error={touched.password && Boolean(errors.password)} value={values.password}
                                   onChange={handleChange} name="password" label={t("registrationPage.password")}
                                   type="password"
                                   helperText={touched.password && errors.password}
                        />
                    </Grid>
                    <Grid className="registration-page__input-area" item xs={12}>
                        <TextField className="registration-page__input"
                                   error={touched.repeatedPassword && Boolean(errors.repeatedPassword)}
                                   value={values.repeatedPassword}
                                   onChange={handleChange} name="repeatedPassword"
                                   label={t("registrationPage.repeatPassword")}
                                   type="password"
                                   helperText={touched.repeatedPassword && errors.repeatedPassword}
                        />
                    </Grid>
                    <Grid className="registration-page__button-area" item xs={12}>
                        <Button type="submit">{t("registrationPage.submit")}</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
});

function useRegistrationPage() {
    const {t} = useTranslation();
    const initialValues: RegistrationForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(`${t("registrationPage.firstNameRequired")}`),
        lastName: Yup.string().required(`${t("registrationPage.lastNameRequired")}`),
        email: Yup.string().required(`${t("registrationPage.emailRequired")}`).email(`${t("registrationPage.emailNotValid")}`),
        password: Yup.string().required(`${t("registrationPage.passwordRequired")}`),
        repeatedPassword: Yup.string().oneOf([Yup.ref('password'), ""], `${t("registrationPage.passwordsMustMatch")}`),
    });

    const {mutateAsync: submitRegistrationData} = useMutation(
        (registrationData: RegistrationData) => sendRegistrationData(registrationData),
        {
            onSuccess: () => {
                alert("registration");
            },
            onError: (error) => {
                alert(error);
            }
        }
    );

    const onSubmit = async (values: RegistrationForm) => {
        await submitRegistrationData(values)
    }

    const {values, handleChange, touched, errors, handleSubmit} = useFormik<RegistrationForm>({
        initialValues,
        onSubmit,
        validationSchema
    })

    return {t, initialValues, handleSubmit, onSubmit, values, handleChange, errors, touched, validationSchema};
}

export default RegistrationPage;
