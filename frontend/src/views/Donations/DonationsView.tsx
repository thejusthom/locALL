import * as React from "react";
import styled from "styled-components";

import Girl from "../../assets/images/girl1.jpg";

const DonationsView = () => {
    return(
        <>
        <Card>
            <img src={Girl} />
            <div>
            <Top>
                <Title>Donation for Ear Surgery</Title>
                <div>graph</div>
            </Top>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nisi fuga. Labore vitae obcaecati culpa, aspernatur earum distinctio maiores provident doloribus eum necessitatibus, omnis enim voluptatem eius fuga. Mollitia, aliquam sit magni vitae in maxime aliquid a debitis non neque amet unde quaerat, culpa quia laboriosam nobis modi dolorum. Minus saepe voluptates aperiam a obcaecati perferendis omnis aliquam, repellat voluptatem voluptatibus ad alias molestiae, quam optio libero, eius maxime architecto dolores odio! Pariatur odio animi velit laudantium recusandae id iste sit. Illum consectetur iusto vitae sapiente provident aliquam et consequuntur quasi dolore quam reprehenderit iure suscipit quae, alias, minima enim, modi expedita. Sunt quam ratione adipisci, explicabo, ea laboriosam nemo saepe porro quidem voluptate, accusantium sed corrupti in inventore odit accusamus ipsa! Eligendi adipisci quas iste consectetur, nemo est, nostrum debitis totam animi at corporis. Facere quae odio, iste ratione omnis voluptatibus eum culpa numquam corrupti in earum? Placeat libero nihil culpa incidunt doloribus atque animi adipisci nesciunt, saepe, tenetur doloremque ipsum voluptatem dolorem ut assumenda quisquam iure cupiditate recusandae quos fugit pariatur architecto! Laudantium explicabo non, eos nam saepe, beatae alias quae rerum ipsa, nostrum totam modi sint labore et! Dolores cumque molestiae harum dolorem nisi deserunt quisquam minima?</p>
            
            </div>
        </Card>

        </>
    );
}

const Card = styled.div`
display: flex;
background-color: #adaaaa;
width: 1000px;
    height: 300px;
    padding: 20px;
    place-items: center;
    border-radius: 20px;
    img{
        width: 30%;
    height: 80%;
    }
`;
const Title = styled.h2`

`;
const Top = styled.div`
display: flex;
`;

export default DonationsView;