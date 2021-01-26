import { Route } from "react-router-dom";
import Detail from "./main/detail";
import Main from "./main/main";

const Index = (props) => {

    console.log(props);

    return(
        <div>
            <Route component={Main} exact path="/"></Route>
            <Route component={Detail} exact path="/:id"></Route>
        </div>
    )
}

export default Index;