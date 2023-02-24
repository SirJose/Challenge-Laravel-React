import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    searchQuery: null,
    date: [],
    filterCategory: null,
    filterSource: null,
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [searchQuery, _setSearchQuery] = useState("");
    const [date, _setDate] = useState(['','']);
    const [filterCategory, _setFilterCategory] = useState("");
    const [filterSource, _setFilterSource] = useState("");

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setSearchQuery = (query) => _setSearchQuery(query);
    const setDate = (date) => _setDate(date);
    const setFilterCategory = (category) => _setFilterCategory(category);
    const setFilterSource = (source) => _setFilterSource(source);

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                searchQuery,
                date,
                filterCategory,
                filterSource,
                setUser,
                setToken,
                setSearchQuery,
                setDate,
                setFilterCategory,
                setFilterSource
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
