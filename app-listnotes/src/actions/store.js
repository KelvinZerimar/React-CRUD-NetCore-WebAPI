import { CreateStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const store = CreateStore(
{},
compose(
    applyMiddleware(thunk)
)
)