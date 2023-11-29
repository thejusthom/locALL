import React from 'react';
import { Link } from "react-router-dom";
import './single-post.scss';

const SinglePost: React.FC = () =>{
  return (
   <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
        <h1 className="singlePostTitle">Lorem ipsum, dolor sit</h1>

        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author: <b>Shashikar</b></span>
          <span className="singlePostDate">1 hour ago</span>
        </div>

        <p className="singlePostDesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum qui mollitia numquam aperiam. Similique recusandae deserunt ut voluptas quos? In asperiores ducimus maiores rerum exercitationem iure eaque fugiat ea alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex explicabo itaque sunt quo reprehenderit ad a impedit, culpa sit veniam dicta. Rerum pariatur harum quasi perferendis. Cupiditate quo excepturi, blanditiis dolorem deserunt incidunt aliquid, corrupti eum in obcaecati architecto libero dolores, doloribus iusto debitis? Ut, beatae consequuntur sapiente nemo blanditiis molestiae repellendus illum, velit, minus dolorem sit quae asperiores odit rem debitis eveniet eum commodi id corporis! Exercitationem alias impedit et cupiditate fuga culpa id omnis sed, qui consequuntur ipsum tempora necessitatibus cumque a. Quisquam omnis quis cupiditate recusandae dolore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium non nobis! Unde totam ipsam, corrupti amet aut iste expedita quidem ab numquam aspernatur nisi culpa laboriosam distinctio dignissimos pariatur, itaque voluptatem mollitia consequuntur! Quae tempora aliquam quod in. Repudiandae culpa fugit blanditiis consequuntur laudantium. Accusantium deleniti aliquid animi dolorem error vitae porro maiores, a cum tempore fugit rem dolor minus, quaerat voluptates magnam, corporis eaque dolores earum non odio. Impedit, soluta. Quasi libero iure eligendi soluta obcaecati amet, excepturi vitae voluptates modi iste dolor omnis labore assumenda sint ipsum tenetur animi tempore numquam corporis unde maxime ex vero laboriosam tempora? Ex ea, cupiditate voluptas alias aperiam sunt corrupti soluta reiciendis. Amet autem sunt, nesciunt doloremque voluptatibus maxime laborum at quis ducimus nostrum nam tenetur, quos cum! Et doloribus velit necessitatibus libero, atque minus itaque perspiciatis cumque officia laudantium beatae quia expedita, dicta consequatur magnam ducimus vel eveniet corporis nisi mollitia laborum! Deleniti quia voluptatum eligendi dolor dolores voluptas saepe, inventore eos ex excepturi voluptate placeat, qui nobis! Maxime laboriosam est enim iste, ipsa placeat exercitationem minima blanditiis temporibus quae id. Praesentium possimus illum molestiae aperiam, eveniet vitae laboriosam, facilis quis expedita porro, voluptate qui iure. Aliquid nostrum quos asperiores.</p>
      </div>
   </div>
  )
};

export default SinglePost;
