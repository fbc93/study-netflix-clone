import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from 'framer-motion';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Wrapper = styled(motion.nav)`
  height: 7rem;
  position: fixed;
  z-index:1;
  top:0;
  left:0;
  width:100%;
  padding:0 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const HomeLink = styled(Link)``;

const Logo = styled.svg`
  width: 100px;
  margin-right:3rem;

  path{
    fill:${props => props.theme.brandColor}
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right:1.4rem;
  position: relative;

  &:last-child {
    margin-right:0;
  }

  a {
    font-size:1.4rem;
    margin-bottom:0.8rem;
    color:rgba(255,255,255,0.5);
  }

  .active{
    color:rgba(255,255,255,1);
    font-weight: 500;
  }
`;

const ActiveDot = styled(motion.div)`
  width:0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.brandColor};
  position: absolute;
  bottom: -1.5rem;
  left:50%;
  transform:translateX(-50%);
`;

const RightBox = styled.div``;
const SearchForm = styled(motion.form)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.7rem;
  &:hover{
    svg {
        scale:1.5;
        fill:${props => props.theme.brandColor}
      }
    }

  svg {
    cursor:pointer;
    transition: all ease-in-out 0.2s;
  }

  input {
    width:20rem;
    box-sizing: border-box;
    background-color: transparent;
    border-color: transparent;
    width: 100%;
    color:rgba(255,255,255,1);
    margin-right:1rem;
    outline: none;
    font-size:1.4rem;
    letter-spacing: -0.1rem;
    caret-color: ${props => props.theme.brandColor};
    &::placeholder {
      color:rgba(255,255,255,0.5);
    }
  }
`;

const Input = styled.input``;

const searchVariant = {
  hidden: {
    border: "1px solid transparent",
    width: 5 + "rem",
    backgroundColor: "transparent"
  },
  visible: {
    border: "1px solid rgba(255,255,255,1)",
    width: "25rem",
    backgroundColor: "black"
  }
}

const navVariants = {
  top: {
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,0.7) 10%,rgba(0,0,0,0))",
  },
  scroll: {
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,1) 10%,rgba(0,0,0,1))",
    transition: {
      duration: 0.5
    }
  }
}

interface IForm {
  keyword: string;
}

function Navbar() {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const searchAnimation = useAnimation();
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");

  const { register, resetField, handleSubmit } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      keyword: ""
    }
  });

  const onValid = (data: IForm) => {
    navigate(`search?keyword=${data.keyword}`);
    resetField("keyword");
  }

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 70) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    })
  }, [scrollY, navAnimation])

  return (
    <Wrapper variants={navVariants} initial="top" animate={navAnimation}>

      <LeftBox>
        <HomeLink to={"/"} onClick={() => searchAnimation.start("hidden")}>
          <Logo focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
            <motion.path
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            ></motion.path>
          </Logo>
        </HomeLink>
        <NavList>
          <NavItem>
            <Link to={"/"} className={homeMatch ? "active" : ""} onClick={() => searchAnimation.start("hidden")}>영화</Link>
            {homeMatch && <ActiveDot layoutId="active-dot" />}
          </NavItem>
          <NavItem>
            <Link to={"/tv"} className={tvMatch ? "active" : ""} onClick={() => searchAnimation.start("hidden")}>TV 시리즈</Link>
            {tvMatch && <ActiveDot layoutId="active-dot" />}
          </NavItem>
        </NavList>
      </LeftBox>

      <RightBox>
        <SearchForm
          variants={searchVariant}
          initial="hidden"
          animate={searchAnimation}
          transition={{ type: "linear", delay: 0.3, duration: 0.2 }}
          onSubmit={handleSubmit(onValid)}
        >
          <SearchRoundedIcon
            style={{ fontSize: 25, margin: "0.5rem 1rem" }}
            onClick={() => searchAnimation.start("visible")}
          />
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            type="text"
            placeholder="영화나 TV시리즈를 검색하세요 🕵️"
            autoFocus={true}
          />
        </SearchForm>
      </RightBox>

    </Wrapper>
  )
}

export default Navbar;