## 메인페이지

/ -> All coins (Home screen)

## 서브페이지

/:id -> ex) /btc -> Coin Detail (detail screen)

## nesting : 한 라우터 안에 스크린 중첩

/btc/information
/btc/chart

---

# style setting

: styled-component로부터 createGlobalStyle 기능 사용 가능

createGlobalStyle : 전역에 적용할 수 있는 스타일

- 사용 방법 : const GlobalStyle = createGlobalStyle`적용할 스타일 내용`
- return 부분에서 전체를 <></> (React.Fragment)로 감싸준뒤 <GlobalStyle /><Router /> 순으로 작성

- 폰트 적용하려면 createGlobalStyle``내부에 @import url('') 작성, body 부분에`font-family : 폰트 이름` 작성

# react-router

- Link : 해당 링크로 연결해주는 컴포넌트
- react router link들은 anchor로 바뀐다.
- handle event도 있음
  `<Link to={`/링크주소(보통 id)`}>링크 내용</Link>`
