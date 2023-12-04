import * as React from "react";
import styled from "styled-components";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import moment from "moment";
import { IEvent } from "../../models/events";

interface IMyEvents{
    events?: IEvent[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const MyEvents = (props: IMyEvents) => {
    const { events, onEdit, onDelete } = props;
    
    return(
        <Table>
        <thead>
            <th>Name</th>
            <th>Category</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {events?.map((event) => 
           <tr key={event._id}>
                <td>{event.eventName}</td>
                <td>{event.category}</td>
                <td>{moment(event.startDate).format("MM/DD/YYYY")}</td>
                <td>{moment(event.endDate).format("MM/DD/YYYY")}</td>
                {!!event._id &&
                <td>
                    <img src={EditIcon} width={25} height={25} onClick={() => onEdit(event._id || "")} />
                    <img src={DeleteIcon} width={25} height={25} onClick={() => onDelete(event._id || "")} />
                </td>
                }
            </tr>
        )
    }
        </tbody>
    </Table>
    );
};

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: #3e3e3e;
    margin-top: 15px;
    th{
        text-align: left;
    }
    img{
        margin-right: 10px;
        cursor: pointer;
    }
    th, td{
        padding: 10px 0;
    }
    td{
        border-bottom: solid 1.5px #4a4a4a30;
    }
`;

export default MyEvents;