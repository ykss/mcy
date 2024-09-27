export const shareKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao
    if (!kakao.isInitialized()) {
      kakao.init("d7e8815fe0e60b90c1d10cbeaad8c7e4") // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }

    kakao.Link.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: "청년부 출석 현황",
        description: "",
        imageUrl: "",
        link: {
          mobileWebUrl: "https://mokchun-youth.netlify.app",
          webUrl: "https://mokchun-youth.netlify.app",
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: "https://mokchun-youth.netlify.app",
            webUrl: "https://mokchun-youth.netlify.app",
          },
        },
      ],
    })
  }
}
