import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  z-index: 2;
`;

interface ISlider {
  title: string;
}

function Slider({
  title
}: ISlider) {
  return (
    <Wrapper>
      <h2>{title}</h2>
    </Wrapper>
  );
}

export default Slider;