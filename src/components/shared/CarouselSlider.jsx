import Carousel from "react-material-ui-carousel"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"

const CarouselSlider = ({ imageArray }) => {
  const settings = {
    interval: 3000,
    animation: "slide",
    indicatorContainerProps: {
      style: {
        zIndex: 1,
        width: "100%",
        marginTop: "-30px",
        textAlign: "center",
      },
    },
    indicatorIconButtonProps: {
      style: {
        opacity: "0.7",
        color: "#000",
        transition: "transform 0.3s ease-in-out",
      },
    },
    activeIndicatorIconButtonProps: {
      style: {
        opacity: "1",
        color: "#fff",
        transform: "scale(1.2)",
      },
    },
    navButtonsProps: {
      style: {
        display: "none",
      },
    },
  }

  return (
    <CarouselWrapper {...settings}>
      {imageArray.map((content, index) => (
        <Stack key={index}>
          <ImgWrapper src={content.img} alt={`Slider ${index + 1}`} />
        </Stack>
      ))}
    </CarouselWrapper>
  )
}

const CarouselWrapper = styled(Carousel)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 100%;
  .MuiSvgIcon-root {
    font-size: 12px;
  }
`

const ImgWrapper = styled("img")`
  display: flex;
  justify-content: center;
  height: 223px;
  background-repeat: no-repeat;
  border-radius: 20px;
`

export default CarouselSlider
