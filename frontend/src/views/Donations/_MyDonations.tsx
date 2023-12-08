import * as React from "react";
import styled from "styled-components";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import moment from "moment";
import { IDonation } from "../../models/donation";
import { donationCategories } from "./Constants";

interface IMyDonations{
    donations?: IDonation[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const MyDonations = (props: IMyDonations) => {
    const { donations, onEdit, onDelete } = props;
    
    return(
        <Table>
        <thead>
            <th>Name</th>
            <th>Category</th>
            <th>Receiver Name</th>
            <th>Receiver Age</th>
            <th>Posted On</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {donations?.map((donation) => 
           <tr key={donation._id}>
                <td>{donation.donationName}</td>
                <td>{donationCategories?.find((i) => i.id === donation.category)?.label}</td>
                <td>{donation.receiver.name}</td>
                <td>{donation.receiver.age}</td>
                <td>{moment(donation.postedOn).format("MM/DD/YYYY")}</td>
                {!!donation._id &&
                <td>
                    <img src={EditIcon} width={25} height={25} onClick={() => onEdit(donation._id || "")} />
                    <img src={DeleteIcon} width={25} height={25} onClick={() => onDelete(donation._id || "")} />
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

export default MyDonations;