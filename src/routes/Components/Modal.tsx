import { motion, useScroll } from "framer-motion";
import styled from "styled-components";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { setImagePathSize } from "../../utils";
import { useQuery } from "react-query";
import { fetchDetails, IModal } from "../../api";


const FocusModal = styled(motion.div)`
  width:100%;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index:20;
  overflow: hidden;
  max-height: 100vh;
`;

const BackDropOverlay = styled(motion.div)`
  position: fixed;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.5);
  width:100%;
  height: 100%;
  z-index:30;
`;

const Wrapper = styled(motion.div)`
  width:80vw;
  background-color: #181818;
  align-self: center;
  z-index: 30;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  top: 3rem;
  z-index: 31;
  /* position:absolute;
  top:3rem;
  right:0;
  bottom:0;
  left:50%;
  transform: translateX(-50%); */
  overflow:hidden;
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
  font-size:10vw;
`;

const PreviewCover = styled.div`
  padding-bottom:45vw;
`;

const BackDropImage = styled.div`
  position: relative;

  img {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    filter: brightness(0.5);
  }
`;

const Title = styled.h2`
  font-size: 5vw;
  padding: 4vw 4vw 2vw;
  margin-top: -5vw;
  position: relative;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;

const GenreList = styled.ul`
  display: flex;
  padding:0 4vw;

  li {
    font-size:2vw;
    margin-right:1vw;
  }
`;

const OriginalTitle = styled.span`
  font-size:3vw;
  display: inline-block;
  margin-left:1.5vw;
  font-weight: 400;
  color:gray;
`;

const OverView = styled.div`
  font-size:2vw;
  padding:0 4vw;
  margin-top:2vw;
  line-height: 1.8;
  font-weight: 400;
  letter-spacing: -0.1vw;
  color:gray;
`;

const TagLine = styled.div`
  font-size:1.8vw;
  padding:0.5vw 4vw 2vw;
  color:#ff7979;
`;

const PosterImage = styled.img`
  width:25vw;
  position: absolute;
  top:3vw;
  left:3vw;
`;

function Modal({
  mediaId,
  mediaType

}: {
  mediaId: number;
  mediaType: string;

}) {
  const navigate = useNavigate();
  const modalMatch = useMatch(`/${mediaType}/:id`);

  const { data: detailD } = useQuery(
    "detail",
    () => fetchDetails(mediaType, mediaId) || null
  );

  const onClickModalClose = () => {
    if (mediaType === "movie") {
      navigate("/");
    } else if (mediaType === "tv" || "search") {
      navigate(`/${mediaType}`);
    }
  }

  //console.log(detailD)

  return (
    <FocusModal>
      <Wrapper layoutId={modalMatch?.params.id}>
        <HighlightOffRoundedIcon
          style={{ fontSize: 45, position: "absolute", top: "1vw", right: "1vw", cursor: "pointer", zIndex: 100 }}
          onClick={onClickModalClose}
        />
        <BackDropImage>
          <PreviewCover />
          <img src={setImagePathSize("original", detailD?.backdrop_path)} alt={detailD?.title} />
        </BackDropImage>

        <PosterImage src={setImagePathSize("original", detailD?.poster_path)} alt={detailD?.title} />

        <Title>
          {detailD?.title ? detailD?.title : detailD?.name}
          <OriginalTitle>{detailD?.original_title ? detailD?.original_title : detailD?.original_name}</OriginalTitle>
        </Title>

        <TagLine>
          {detailD?.tagline}
        </TagLine>

        <GenreList>
          {detailD?.genres.map((item: any, index: number) => <li key={index}>{item?.name}</li>)}
        </GenreList>

        <OverView>
          {detailD?.overview}
        </OverView>

      </Wrapper>
      <BackDropOverlay
        onClick={onClickModalClose}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </FocusModal>
  );
}

export default Modal;