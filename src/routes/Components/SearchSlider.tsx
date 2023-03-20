import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { ISearch } from "../../api";
import { setImagePathSize } from "./../../utils";
import { useNavigate } from "react-router-dom";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const Wrapper = styled.section`
  margin: 0 0 4vw 0;
  position: relative;
  z-index: 1;
`;

const TitleRow = styled(motion.div)`
  line-height: 1.3;
`;

const Title = styled.title`
  color: #e5e5e5;
  display: inline-block;
  font-size: 1.8vw;
  font-weight: 500;
  margin: 0 4% 2rem;
  min-width: 6em;
  position: relative;
  z-index: 1;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;

const SliderRow = styled.div`
  position: relative;
  width: 100%;
  height: 10vw;
  padding:0 4%;
  &:hover{
  span {
    opacity: 1;
  }
 }
`;

const Handle = styled.span`
  bottom: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  width: 4%;
  z-index: 20;
  background: hsla(0,0%,8%,.5);
  cursor:pointer;
`;

const HandlePrev = styled(Handle)`
  left:0;
  opacity:0;
`;

const HandleNext = styled(Handle)`
  right:0;
  opacity: 0;
`;

const SliderTrail = styled(motion.div)`
  position: relative;
`;

const SliderWrap = styled(motion.div) <{ gridcount: number }>`
  width:100%;
  position: absolute;
  display: grid;
  gap:10px;
  grid-template-columns: repeat(${(props) => props.gridcount},1fr);
`;

const SliderItem = styled(motion.div) <{ offset: number }>`
  cursor:pointer;
  height: 10vw;
  position: relative;
  z-index:10;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  
  &:first-child {
    transform-origin: center left!important;
  }
  &:last-child {
    transform-origin: center right!important;
  }
  &:hover{
    .info-box {
      opacity:1;
    }
  }
`;

const BackDropImage = styled(motion.div) <{ bgimg: string }>`
  width:100%;
  height: 100%;
  background: url(${(props) => props.bgimg}) no-repeat top center;
  background-size: cover;
  position: relative;
  z-index:2;
`;

const InfoBottomBox = styled.div`
  width: 100%;
  text-align: left;
  height: 6vw;
  background-color: rgb(51, 51, 51);
  padding: 0.3vw 1vw 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition-delay: 0.2s;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  p{
    font-size:1vw;
    letter-spacing: -0.1vw;
    font-weight: 700;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ul {
    display: flex;
    justify-content: space-between;
    margin-bottom:0.8vw;
    li {
      margin-right:0.3vw;
    }
  }
`;

function SearchSlider({
  media_type,
  title,
  count,
  data,
  isLoading,
}: {
  media_type: string;
  title: string;
  count: number;
  data: ISearch[];
  isLoading: boolean;
}) {
  const offset = 6;
  const [index, setIndex] = useState(0);
  const [isRight, setIsRight] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const toggleLeaving = (value: boolean) => setLeaving(value);

  const sliderButton = (right: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving(true);
      setIsRight(right);

      const totalLength = Number(Object.keys(data)) - 1;
      const maxIdx = Math.floor(totalLength / offset) - 1;

      switch (right) {
        case 1:
          setIndex((prev) => (prev >= maxIdx ? 0 : prev + 1))
          break

        case -1:
          setIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
          break
      }
    }
  }

  const onBoxClicked = (media_id: number) => {
    navigate(`/${media_type}/${media_id}`);
  };

  const SliderWrapVariant = {
    hidden: (right: number) => {
      return {
        x: right === 1 ? window.innerWidth : -window.innerWidth,
      };
    },
    visible: {
      x: 0
    },
    exit: (right: number) => {
      return {
        x: right === 1 ? -window.innerWidth : window.innerWidth,
      };
    },
  };

  const SliderItemVar = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.2,
      y: -50,
      zIndex: 30,
      transition: {
        delay: 0.2,
        duration: 0.2,
        type: "linear"
      }
    }
  }

  const BackBgVar = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  }

  return (
    <Wrapper>
      <TitleRow>
        <Title>{title} &#40;{count}&#41;</Title>
      </TitleRow>
      <SliderRow>
        <HandlePrev onClick={() => sliderButton(-1)}>
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 30 }} style={{ alignSelf: "center" }} />
        </HandlePrev>

        <SliderTrail>
          <AnimatePresence
            initial={false}
            custom={isRight}
            onExitComplete={() => toggleLeaving(false)}
          >
            <SliderWrap
              key={index}
              gridcount={offset}
              custom={isRight}
              variants={SliderWrapVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                type: "tween",
                duration: 1
              }}
            >
              {data.slice(offset * index, offset * index + offset).map((item: ISearch) => (

                <SliderItem
                  key={item.id}
                  layoutId={`${item.id}_${title}`}
                  variants={SliderItemVar}
                  initial="normal"
                  whileHover="hover"
                  offset={offset}
                  onClick={() => onBoxClicked(item.id)}
                >
                  <BackDropImage
                    key={`${item.id}_${title}_backdrop`}
                    variants={BackBgVar}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.6 }}
                    bgimg={setImagePathSize("w500", item.backdrop_path ? item.backdrop_path : item.profile_path)}
                  />
                  <InfoBottomBox className="info-box">
                    <IconWrapper>
                      <ul>
                        <li><StopCircleOutlinedIcon fontSize="large" /></li>
                        <li><ExpandCircleDownOutlinedIcon fontSize="large" /></li>
                        <li><ControlPointOutlinedIcon fontSize="large" /></li>
                      </ul>
                      <ExpandCircleDownOutlinedIcon fontSize="large" />
                    </IconWrapper>

                    <p>{item.title ? item.title : item.name}</p>
                  </InfoBottomBox>
                </SliderItem>

              ))}
            </SliderWrap>
          </AnimatePresence>
        </SliderTrail>
        <HandleNext onClick={() => sliderButton(1)} >
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 30 }} style={{ alignSelf: "center" }} />
        </HandleNext>
      </SliderRow>

    </Wrapper>
  );
}

export default SearchSlider;