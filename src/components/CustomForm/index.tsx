import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { AppDataContext } from "../../contexts/appDataContext";
import styles from "./index.module.css";
import { Button, Col, Row, Card } from "react-bootstrap";
import { TasksType } from "../TaskList/types";

interface FormData {
  formData: Partial<TasksType>;
  onSubmit: (formData: Partial<TasksType>) => void;
  onClose: () => void;
  header: string;
  type: "Create" | "Update";
  validationSchema: any;
}

const CustomForm: React.FC<FormData> = ({
  formData,
  onSubmit,
  onClose,
  header,
  type,
  validationSchema,
}) => {
  const appData = useContext(AppDataContext);
  const initialValues: Partial<TasksType> = {
    id: formData.id,
    title: formData.title,
    description: formData.description,
    status: formData.status,
  };

  const handleSubmit = (formData: Partial<TasksType>) => {
    onSubmit(formData);
  };

  return (
    <Card className={`${styles.customCard} mx-auto`}>
      <Card.Header>{header}</Card.Header>
      <Card.Body className="d-flex justify-content-center">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className={styles.formContainer}>
              <Row className={styles.formRow}>
                <Col className={styles.formColumn}>
                  <div className={styles.inputFieldContainer}>
                    <label className={styles.label} htmlFor="title">
                      Title
                    </label>
                    <Field
                      className={styles.inputField}
                      type="text"
                      id="title"
                      name="title"
                    />
                    <ErrorMessage
                      name="title"
                      className="errorMessage"
                      component="div"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles.formColumn}>
                  <div className={styles.inputFieldContainer}>
                    <label className={styles.label} htmlFor="description">
                      Description
                    </label>
                    <Field
                      className={styles.inputField}
                      as="textarea"
                      id="description"
                      name="description"
                    />
                    <ErrorMessage
                      name="description"
                      className="errorMessage"
                      component="div"
                    />
                  </div>
                </Col>
              </Row>

              {type === "Update" && (
                <Row className={styles.formRow}>
                  <Col className={styles.formColumn}>
                    <div>
                      <label htmlFor="status">Status</label>
                      <Field name="status">
                        {({ field }: { field: any }) => (
                          <Select
                            {...field}
                            options={appData?.allStatus}
                            onChange={(option: any) =>
                              setFieldValue("status", option)
                            }
                            onBlur={field.onBlur}
                            placeholder="Select a status"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="status"
                        className="errorMessage"
                        component="div"
                      />
                    </div>
                  </Col>
                </Row>
              )}

              <Row className={`${styles.footer} ${styles.formRow}`}>
                <Col md={2} className={styles.formColumn}>
                  <Button
                    className={styles.customButton}
                    variant="info"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Col>
                <Col md={2} className={styles.formColumn}>
                  <Button
                    className={styles.customButton}
                    variant="info"
                    onClick={onClose}
                  >
                    Cancel
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

export default CustomForm;
