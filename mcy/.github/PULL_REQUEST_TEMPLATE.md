## 작업내용

- Feat : 헤더에서 슬라이드 연결 및 클릭 시 페이지 이동

## 고민하거나 궁금한 부분

- icon을 mui에서 지원하는 것 말고 Platicon에서 사용했는데 저작권 표시를 어떤 식으로 표기를 해야할지 궁금합니다.
- 슬라이드 메뉴에서 switch-case문과 삼항 연산자를 이용했는데 어떤 코드가 효율이 좋을까요? 일단 주석 처리 해놨습니다!

  - `switch-case문`
    ```js
    switch (index) {
      case 0:
        Navigate("/news");
        break;
      case 1:
        Navigate("/attendance");
        break;
      case 2:
        Navigate("/birthDay");
        break;
    }
    ```
  - `삼항 연산자`

  ```js
  index % 3 === 0
    ? Navigate("/news")
    : index % 2 === 1
    ? Navigate("/attendance")
    : Navigate("/birthDay");
  ```

## 캡처 또는 영상 (optional)

- [영상 다운로드](../../../Desktop/화면 기록 2024-03-05 오전 12.54.54.mov)
