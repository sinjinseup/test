import { Route } from "react-router-dom";
import Main from "./main/main";

const Index = (props) => {

    console.log(props);

    return(
        <div>
            <Route component={Main} path="/"></Route>
        </div>
    )
}

export default Index;