import Carousel from "react-material-ui-carousel";
import mainSlider1 from "../../images/mainSlider1.png";
import mainSlider2 from "../../images/mainSlider2.png";
import mainSlider3 from "../../images/mainSlider3.png";
import { Box, styled } from "@mui/material";

const CarouselSilder = () => {
  const McyImges = [
    {
      img: mainSlider1,
    },
    {
      img: mainSlider2,
    },
    {
      img: mainSlider3,
    },
  ];

  const settings = {
    interval: 3000,
    indicators: true,
  };

  return (
    <CarouselBox {...settings}>
      {McyImges.map((content, index) => (
        <ImgBox key={index}>
          <img src={content.img} alt={`Slider ${index + 1}`} />
        </ImgBox>
      ))}
    </CarouselBox>
  );
};

export default CarouselSilder;

const CarouselBox = styled(Carousel)`
  @media (min-width: 375px) {
    width: 320px;
    height: 250px;

    .css-hn784z,
    .css-1abc02a {
      display: none;
    }
    .css-1m9128y {
      width: 100%;
      height: 0%;
      text-align: center;
      margin-top: 0;
      .MuiButtonBase-root {
        margin-top: -80px;
        z-index: 1;
      }
      .MuiButtonBase-root button {
        transition: transform 0.3s ease-in-out;
        &.button-active {
          transform: scale(1.2);
        }
      }
    }
  }
`;

const ImgBox = styled(Box)`
  width: 320px;
  height: 250px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`;
