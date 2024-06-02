import React from "react";
import styles from "./index.module.css";
import { Col, Row, Card } from "react-bootstrap";

interface FormData {
  details: { label: string; value: string }[];
  header: string;
}

const DetailsCard: React.FC<FormData> = ({ details, header }) => {
  return (
    <Card className={`${styles.customCard} mx-auto`}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Row className={styles.formRow}>
          {details.map((detail) => {
            return (
              <Col className={styles.formColumn} key={detail.label}>
                {detail.label} : {detail.value}
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetailsCard;
