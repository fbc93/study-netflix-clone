import { Skeleton } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  position: relative;
  z-index: 1;
`;

const MainViewRow = styled.div`
  left: 0;
  position: relative;
  right: 0;
  top: 0;
  margin-bottom: 20px;
  padding-bottom: 40%;
  user-select: none;
`;

const Title = styled.h1`
  color:white;
  font-size:5vw;
  position: absolute;
  left: 50%;
  top:50%;
  transform:translate(-50%, -50%);
  width: 100%;
  text-align: center;
  opacity: 0.3;
  line-height: 1.5;
`;

function ErrorVisualBanner({
  dataName,
}: {
  dataName: string
}) {
  return (
    <Wrapper>
      <MainViewRow>
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={100 + "%"}
          height={56.25 + "vw"}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <Title>{dataName} <br /> API 연결이 끊어졌어요 :/</Title>
      </MainViewRow>
    </Wrapper>
  );
}

export default ErrorVisualBanner;