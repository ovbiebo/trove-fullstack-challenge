import {UserProvider} from "./state/user/user-context";
import {Route, Switch} from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Profile from "./pages/profile";
import Portfolio from "./pages/portfolio";
import Loans from "./pages/loans";
import {ToastContainer} from "react-toastify";
import PageNotFound from "./pages/page-not-found";

function App() {
    return (
        <UserProvider>
            <Switch>
                <Route exact path="/" component={Portfolio}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Route exact path="/sign-in" component={SignIn}/>
                <Route exact path="/loans" component={Loans}/>
                <Route exact path="/profile" component={Profile}/>
                <Route component={PageNotFound}/>
            </Switch>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                position="top-right"
                newestOnTop
                closeOnClick={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </UserProvider>
    );
}

export default App;
