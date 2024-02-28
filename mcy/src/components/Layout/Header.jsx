/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Header = () => {
  return (
    <div
      css={css({
        color: "black",
        fontWeight: "bold",
        position: "fixed",
        top: "10px",
        right: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width:"100vw"

        
      })}
    >
      <div css={css({
        margin:"0 auto"
      })}>MCY</div>
      <div>
        <button css={css({
          margin:"0 50px 0 0"
        })}>햄버거 버튼</button>
      </div>
    </div>
  );
};

export default Header;
