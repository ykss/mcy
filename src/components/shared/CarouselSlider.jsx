import Carousel from "react-material-ui-carousel";
import { Stack, styled } from "@mui/material";

const CarouselSlider = ({ imageArray }) => {
  const settings = {
    interval: 3000,
    animation: "slide",
    indicatorContainerProps: {
      style: {
        width: "100%",
        marginTop: "-30px",
        textAlign: "center",
        zIndex: 1,
      },
    },
    indicatorIconButtonProps: {
      style: {
        color: "#000",
        opacity: "0.7",
        transition: "transform 0.3s ease-in-out",
      },
    },

    activeIndicatorIconButtonProps: {
      style: {
        color: "#fff",
        opacity: "1",
        transform: "scale(1.2)",
      },
    },
    navButtonsProps: {
      style: {
        display: "none",
      },
    },
  };

  return (
    <CarouselWrapper {...settings}>
      {imageArray.map((content, index) => (
        <Stack key={index}>
          <ImgWrapper src={content.img} alt={`Slider ${index + 1}`} />
        </Stack>
      ))}
    </CarouselWrapper>
  );
};

export default CarouselSlider;

const CarouselWrapper = styled(Carousel)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 100%;
  .MuiSvgIcon-root {
    font-size: 12px;
  }
`;

const ImgWrapper = styled("img")`
  display: flex;
  justify-content: center;
  height: 200px;
  border-radius: 20px;
  background-repeat: no-repeat;
`;
