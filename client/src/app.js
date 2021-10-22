import {UserProvider} from "./state/user/user-context";
import {Route, Switch} from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Profile from "./pages/profile";
import Portfolio from "./pages/portfolio";
import Loans from "./pages/loans";

function App() {
    return (
        <UserProvider>
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Route exact path="/portfolio" component={Portfolio}/>
                <Route exact path="/loans" component={Loans}/>
                <Route exact path="/profile" component={Profile}/>
            </Switch>
        </UserProvider>
    );
}

export default App;
