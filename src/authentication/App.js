import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Profile from './Profile';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgetPassword from './ForgetPassword';
import UpdateProfile from './UpdateProfile';
import CenterContainer from './CenterContainer';
import Dashboard from "../drive/Dashboard";

function App() {
  return (
              
                    <Router>
                      <AuthProvider>
                        <Switch>
                          {/* Drive */}
                          <PrivateRoute exact  path="/" component={Dashboard} />
                          <PrivateRoute exact  path="/folder/:folderId" component={Dashboard} />

                          {/* Profile */}
                          <PrivateRoute  path="/user" component={Profile} />
                          <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                          
                          {/* Auth */}
                          <Route path="/signup" component={Signup} />
                          <Route path="/forgetpassword" component={ForgetPassword} />
                          <Route path="/login" component={Login} />
                        </Switch>
                      </AuthProvider> 
                    </Router>
              
           
  );
}

export default App;
