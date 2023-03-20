import styled from "styled-components";
import { fetchMovieVideos, fetchTvVideos, IGenreList, IVisualBanner } from "../../api";
import { convertGenreIdToNm, getRandomVideoData, setImagePathSize } from "../../utils";
import { Skeleton } from "@mui/material";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 56.25vw;
  position: absolute;
  width: 100%;
  z-index: 0;
`;

const BackDropMask = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const BackDropLayer = styled.div`
  z-index: 1;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ImageWrap = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  img {
    background-position: 50%;
    background-size: cover;
    bottom: 0;
    left: 0;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .4s cubic-bezier(.665,.235,.265,.8) 0s;
    width: 100%;
    z-index: 2;
  }
`;

const VideoWrap = styled.div``;

const ContentWrap = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

const LeftSideShadow = styled.div`
  background: linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);
  bottom: 0;
  left: 0;
  opacity: 1;
  position: absolute;
  right: 26.09%;
  top: 0;
  transition: opacity .5s;
  z-index: 3;
`;

const BottonShadow = styled.div`
  background-color: transparent;
  background-image: linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414);
  background-position: 0 top;
  background-repeat: repeat-x;
  background-size: 100% 100%;
  bottom: -1px;
  height: 14.7vw;
  opacity: 1;
  top: auto;
  width: 100%;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 4;
`;

const InfoLayer = styled.div`
  bottom: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 4%;
  position: absolute;
  top: 0;
  width: 36%;
  z-index: 10;
`;
const TitleBox = styled.div`
  transition: transform 1.5s cubic-bezier(.165,.84,.44,1);
  width: 100%;
`;
const Title = styled(motion.h2)`
  font-size:3vw;
  letter-spacing: -0.1vw;
  margin-bottom:2vw;
  font-weight: bold;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;
const OriginalTitle = styled(motion.span)`
  color:rgba(255, 255, 255, 0.7);
  font-size: 1vw;
  margin-bottom: 1vw;
  text-indent: 0.4vw;
  letter-spacing: -0.1vw;
  display: inline-block;
`;
const GenreTagList = styled(motion.ul)`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:2vw;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;
const GenreTag = styled.li`
  font-size:1.2vw;
  color: white;
  position: relative;
  letter-spacing: -0.1rem;
  
  &:after{
    width:2rem;
    content:'/';
    display: inline-block;
    height: 100%;
    text-align: center;
  }
  &:last-child{
    &:after{
      display: none;
    }
  }
`;

const Overview = styled(motion.p)`
  color: rgb(255, 255, 255);
  font-size: 1.2vw;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 0.1vw;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
  width: 100%;
  height: 5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const BtnList = styled(motion.ul)`
  display: flex;
  line-height: 88%;
  margin-top: 1.5vw;
  white-space: nowrap;
  position: relative;
  z-index: 10;
`;

const DefaultBtn = styled.button`
  width:8vw;
  height: 3vw;
  align-items: center;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  display: flex;
  font-size: 1.2vw;
  font-weight: 500;
  line-height: 2;
  padding-left: 2rem;
  padding-right: 2.4rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  border:none;
  cursor:pointer; 
`;
const TrailerPlayBtn = styled(DefaultBtn)`
  &:hover{
    background-color: rgba(255, 255, 255, 0.75);
  }
`;
const InfoBtn = styled(DefaultBtn)`
  width:10vw;
  height: 3vw;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  &:hover{
    background-color: rgba(109, 109, 110, 0.4);
  }
`;

function VisualBanner({
  data,
  isLoading,
  MGenre,
  TGenre,
  media_type,
  videoType


}: {
  media_type: string;
  data: IVisualBanner;
  isLoading: boolean;
  MGenre: IGenreList[];
  TGenre: IGenreList[];
  videoType: string;

}) {
  const firstData = data.results[0];
  const [isPlay, setIsPlay] = useState(true);
  const togglePlay = () => setIsPlay(prev => !prev);
  const clickToPlay = () => togglePlay();
  const [url, setUrl] = useState(videoType);

  const { data: movieVideoD } = useQuery(
    "movie_video",
    () => fetchMovieVideos(firstData.id)
  );

  const { data: tvVideoD } = useQuery(
    "tv_video",
    () => fetchTvVideos(firstData.id)
  );

  useEffect(() => {
    switch (videoType) {
      case "movie":
        setUrl(`https://youtu.be/${getRandomVideoData(movieVideoD)}`);
        break

      case "tv":
        setUrl(`https://youtu.be/${getRandomVideoData(tvVideoD)}`);
        break
    }
  }, [videoType, movieVideoD, tvVideoD]);

  return (
    <Wrapper>
      <MainViewRow>
        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={100 + "%"}
            height={56.25 + "vw"}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        ) : (
          <Banner>
            <BackDropMask>
              <BackDropLayer>
                {isPlay && (
                  <VideoWrap>
                    <ReactPlayer
                      url={url}
                      width="100%"
                      height="56.25vw"
                      style={{ position: "relative", zIndex: 3, pointerEvents: "none" }}
                      loop={true}
                      playing={isPlay}
                      muted={true}
                      controls={false}
                    />
                    <LeftSideShadow />
                    <BottonShadow />
                  </VideoWrap>
                )}
                <ImageWrap>
                  <img src={setImagePathSize("original", firstData.backdrop_path)} alt={firstData.title ? firstData.title : firstData.original_title} />
                  <LeftSideShadow />
                  <BottonShadow />
                </ImageWrap>
              </BackDropLayer>
            </BackDropMask>

            <ContentWrap>
              <InfoLayer>
                <TitleBox>
                  <OriginalTitle
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4,
                      duration: 1
                    }}>
                    {firstData.original_title ? firstData.original_title : firstData.original_name}
                  </OriginalTitle>
                  <Title
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4,
                      duration: 1
                    }}>
                    {firstData.title ? firstData.title : firstData.name}
                  </Title>
                  <GenreTagList
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8,
                      duration: 1
                    }}
                  >
                    {
                      convertGenreIdToNm(firstData.genre_ids, media_type, TGenre, MGenre).map((item: any) =>
                        <GenreTag key={item}>{item}</GenreTag>
                      )
                    }
                  </GenreTagList>

                  <Overview
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2,
                      duration: 1
                    }}
                  >{firstData.overview}</Overview>


                  <BtnList
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.6,
                      duration: 1
                    }}
                  >
                    <TrailerPlayBtn onClick={clickToPlay}>
                      {isPlay ? (
                        <>
                          <StopCircleOutlinedIcon fontSize="large" style={{ marginRight: 7 }} />
                          <span>정지</span>
                        </>
                      ) : (
                        <>
                          <PlayCircleOutlineIcon fontSize="large" style={{ marginRight: 7 }} />
                          <span>재생</span>
                        </>
                      )}

                    </TrailerPlayBtn>
                    <InfoBtn>
                      <InfoOutlinedIcon fontSize="large" style={{ marginRight: 7 }} />
                      <span>상세정보</span>
                    </InfoBtn>
                  </BtnList>
                </TitleBox>
              </InfoLayer>
            </ContentWrap>
          </Banner>
        )}

      </MainViewRow>
    </Wrapper>
  );
}
export default VisualBanner;