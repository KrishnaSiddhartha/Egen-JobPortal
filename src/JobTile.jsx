import React from "react";
import './JobTile.css';
import { useHistory } from "react-router"
import {days_between} from "./JobPage";
export const JobTile = ({jobResult}) => {
    let history = useHistory()
    const onClickPage = ()=>{
        history.push(`/job/${jobResult.id}`)
    }
    return(
        <div className="JobTile" onClick={onClickPage}>
            <img src={jobResult.company_logo} className="JobTile-logo" alt="logo" />
            <p className="JobTile-type">{`${days_between(jobResult?.created_at)} days ago`} . {jobResult.type}</p>
            <p className="JobTile-title">{jobResult.title}</p>
            <p className="JobTile-company">{jobResult.company}</p>
            <p className="JobTile-location">{jobResult.location}</p>
        </div>
    )
}