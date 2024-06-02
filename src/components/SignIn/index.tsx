import React from "react";
import { saveData } from "../../services/apis";
import { toast } from "react-toastify";
import styles from "./index.module.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const SignIn = () => {
  const navigate = useNavigate();
  const initialValues: Record<string, string> = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  async function submit(formData: Record<string, string>) {
    try {
      const response: any = await saveData<Record<string, string>>(
        {
          method: "POST",
          url: "/auth/signIn",
        },
        formData
      );
      if (response?.access_token) {
        localStorage.setItem("jwtToken", response.access_token);
        navigate("/tasks/list");
      } else {
        // Handle error
        throw new Error();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message.toString());
      } else {
        toast.error("An error occurred during signIn");
      }
    }
  }
  const handleSubmit = (formData: Record<string, string>) => {
    submit(formData);
  };
  return (
    <Card className={`${styles.customCard} mx-auto`}>
      <Card.Header>Sign in</Card.Header>
      <Card.Body className="d-flex justify-content-center">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ resetForm }) => (
            <Form className={styles.formContainer}>
              <Row className={styles.formRow}>
                <Col className={styles.formColumn}>
                  <div className={styles.inputFieldContainer}>
                    <label className={styles.label} htmlFor="username">
                      User name
                    </label>
                    <Field
                      className={styles.inputField}
                      type="text"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      className="errorMessage"
                      component="div"
                    />
                  </div>
                </Col>
                <Col className={styles.formColumn}>
                  <div className={styles.inputFieldContainer}>
                    <label className={styles.label} htmlFor="password">
                      Password
                    </label>
                    <Field
                      className={styles.inputField}
                      type="password"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      className="errorMessage"
                      component="div"
                    />
                  </div>
                </Col>
              </Row>

              <Row className={`${styles.footer} ${styles.formRow}`}>
                <Col md={2} className={styles.formColumn}>
                  <Button
                    className={styles.customButton}
                    variant="info"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Col>
                <Col md={2} className={styles.formColumn}>
                  <Button
                    className={styles.customButton}
                    variant="info"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={2} className={styles.formColumn}>
                  <Button
                    className={styles.customButton}
                    variant="success"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
