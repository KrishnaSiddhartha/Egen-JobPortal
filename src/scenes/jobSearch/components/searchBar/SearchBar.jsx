import React from "react"
import {isEmpty} from "lodash"
import './SearchBar.css'
import {Checkbox} from "semantic-ui-react";
import {themeContext} from "../../JobSearch";

export const SearchBar = ({onChangeUrl, onSearch, className}) => {
    const [searchParam, setSearchParam] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [fullTimeBoolean, setFullTimeBoolean] = React.useState(false)

    const theme = React.useContext(themeContext)

    const onClickFulltime = () => {
        if (fullTimeBoolean) {
            setFullTimeBoolean(false)
        } else {
            setFullTimeBoolean(true)
        }
        onChangeUrl(formUrl())
    }

    const onValueChange = (textElement, setFn) => {
        setFn(textElement.target.value)
        onChangeUrl(formUrl())
    }

    const parse = (s) => {
        return s.toLowerCase().replace(" ", "+")
    }

    const formUrl = () => {
        var queryString = ''
        if (!isEmpty(location))
            queryString = `${queryString}location=${parse(location)}`
        if (!isEmpty(searchParam)) {
            queryString = isEmpty(queryString) ? queryString : `${queryString}&`
            queryString = `&${queryString}description=${parse(searchParam)}`
        }
        if (fullTimeBoolean) {
            queryString = isEmpty(queryString) ? queryString : `${queryString}&`
            queryString = `&${queryString}fullTime=true`
        }
        return `${queryString}`
    }

    return (
        <div className={`SearchBar ${theme}`}>
            <input className="SearchBar-searchParam" placeholder="Filter by title, company" value={searchParam}
                   type='text' onChange={(textElement) => onValueChange(textElement, setSearchParam)}/>
            <input className="SearchBar-location" placeholder="Filter by location, default current location"
                   value={location} type='text' onChange={(textElement) => onValueChange(textElement, setLocation)}/>
            <Checkbox className="Search-fulltime" label="Full time" onClick={onClickFulltime}/>
            <button className="SearchBar-button" onClick={onSearch} children="Search"/>
        </div>
    )
};