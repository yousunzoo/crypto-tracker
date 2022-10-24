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

# interface

`const [coins, setCoins] = useState<CoinInterface[]>([]);`
CoinInterface[] : 배열형식임을 알려줌

# Link로부터 state 받아오기

- Link를 통해서 state 등의 정보를 페이지로 보낼 수 있음
- `<Link to={{pathname=`/${coin.name}`, state: { name: coin.name },}}>`
- 세부 페이지에서 `import {useLocation} from "react-router-dom";`
- `const { state } = useLocation<RouteState>();`
- useLocation()으로 Link로부터 받은 데이터 불러오기

- `{state?.name || "Loading.."}` : state에 name이 존재한다면 보여주고 아닐 시 "Loading"을 띄워라.
