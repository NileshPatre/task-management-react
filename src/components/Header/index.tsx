import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./header.module.css";
const Header: React.FC = () => {
  return (
    <Container fluid className={styles.header}>
      <Row
        className={`${styles.justifyContentBetween} ${styles.alignItemsCenter}`}
      >
        <h1>Task Management</h1>
      </Row>
    </Container>
  );
};

export default Header;
