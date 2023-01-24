import React from "react";
import styled from "styled-components";
const Loader = () => {
  return (
    <Section>
      <div className="Loading">
        <div className="text-center">
          <button className="btn btn-dark" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Loader;

const Section = styled.div`
  position: relative;
  top: 300px;
  .btn {
    font-size: 30px;
  }
  .spinner-grow {
    width: 2rem;
    height: 2rem;
  }
`;
