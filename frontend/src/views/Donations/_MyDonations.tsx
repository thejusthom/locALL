import * as React from "react";
import styled from "styled-components";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import moment from "moment";
import { IDonation } from "../../models/donation";
import { donationCategories } from "./Constants";
import { useTranslation } from "react-i18next";

// my donations props
interface IMyDonations{
    donations?: IDonation[];
    onEdit: (id: string) => void;
    onDelete: (id: string, event: any) => void;
}

// my donations comp
const MyDonations = (props: IMyDonations) => {
    const { t } = useTranslation('common');
    const { donations, onEdit, onDelete } = props;
    
    return(
        <Table>
            {/* columns */}
        <thead>
            <th>{t("name")}</th>
            <th>{t("category")}</th>
            <th>{t("receiver_name")}</th>
            <th>{t("receiver_age")}</th>
            <th>{t("posted_on")}</th>
            <th>{t("actions")}</th>
        </thead>
        {/* rows */}
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
                    <img src={DeleteIcon} width={25} height={25} onClick={(event: any) => onDelete(donation._id || "", event)} />
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