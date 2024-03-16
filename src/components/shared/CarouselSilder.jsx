import Carousel from "react-material-ui-carousel";
import { Stack, styled } from "@mui/material";

const CarouselSilder = ({ imageArray }) => {
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
    <CarouselWapper {...settings}>
      {imageArray.map((content, index) => (
        <Stack key={index}>
          <ImgWapper src={content.img} alt={`Slider ${index + 1}`} />
        </Stack>
      ))}
    </CarouselWapper>
  );
};

export default CarouselSilder;

const CarouselWapper = styled(Carousel)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 100%;
`;

const ImgWapper = styled("img")`
  display: flex;
  justify-content: center;
  height: 200px;
  border-radius: 20px;
  background-repeat: no-repeat;
`;
