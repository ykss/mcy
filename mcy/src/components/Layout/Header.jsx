/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Header = () => {
  return (
    <div
      css={css({
        color: "black",
        fontWeight: "bold",
        position: "fixed",
        borderBottom: "solid #FEEDCD",
        top: "10px",
        right: "0",
        width: "100vw",
      })}
    >
      <div
        css={css({
          margin: "0 auto",
        })}
      >
        MCY
      </div>
    </div>
  );
};

export default Header;
