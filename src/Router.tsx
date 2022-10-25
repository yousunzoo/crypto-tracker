import { HashRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}
function Router({}: IRouterProps) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;

// gh-pages로 publish 했을 때 fetch 함수가 다 뒤에 /react-masterclass 붙은 채로 되어서 오류 생성됨
// 해결책: BrowserRouter에 basename="/프로젝트폴더명" 작성
