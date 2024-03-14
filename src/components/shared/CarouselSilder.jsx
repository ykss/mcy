import Carousel from "react-material-ui-carousel";
import mainSlider1 from "../../assets/images/mainSlider1.webp";
import mainSlider2 from "../../assets/images/mainSlider2.webp";
import mainSlider3 from "../../assets/images/mainSlider3.webp";
import { Box, styled } from "@mui/material";

const CarouselSilder = () => {
  const McyImgs = [
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
      {McyImgs.map((content, index) => (
        <ImgBox key={index}>
          <img src={content.img} alt={`Slider ${index + 1}`} />
        </ImgBox>
      ))}
    </CarouselBox>
  );
};

export default CarouselSilder;

const CarouselBox = styled(Carousel)`
  width: 100%;
  height: 100%;

  .react-material-ui-carousel__container {
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  .react-material-ui-carousel__dot {
    bottom: 20px;
  }
`;

const ImgBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
