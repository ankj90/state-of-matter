import React from 'react';

import Layout from '../components/layout';
import Body from '../components/body';

const Post = () => {
  return <Layout header={<HeaderContent />} sidebar={<SidebarContent />} body={<PostBody />}></Layout>;
};

const HeaderContent = () => {
  return <h1 className="text-4xl lg:text-6xl">A Spaceship named Becky</h1>;
};

const SidebarContent = () => {
  return (
    <>
      <h2 className="text-4xl lg:text-5xl">Suchitra Sukumar</h2>
      <div className="flex flex-col text-2xl lg:text-3xl pt-3 lg:pt-5">
        <span>India</span>
        <span>March 2021</span>
      </div>
      <div className="flex flex-col text-lg lg:text-xl pt-3 lg:pt-5">
        <span>Science Fiction</span>
        <span>Horror</span>
        <span>Fantasy</span>
      </div>
      <span className="text-xl lg:text-2xl py-3">2074 Words</span>
      <span className="text-xl lg:text-2xl">Listen to this as a podcast</span>
    </>
  );
};

const PostBody = () => {
  return (
    <div className="text-xl paragraphs px-10 py-8 lg:p-16">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae vitae dolor eos accusamus voluptatibus nisi nostrum iure doloribus rerum ab impedit nam dolores, facere odit quam doloremque ipsum voluptatum quas in! Odit, consequatur eum error aspernatur aliquam incidunt. Dolorem blanditiis repudiandae veritatis dignissimos ad nam, provident a corporis eligendi voluptas.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolore alias magni ducimus tempore rerum aut natus error voluptatibus? A blanditiis magni consectetur mollitia molestias non perferendis consequatur, vel facilis vero aspernatur rerum, est eaque impedit obcaecati, voluptas harum qui quam veritatis. Soluta distinctio hic explicabo, consectetur esse ad repudiandae delectus enim assumenda vel optio provident aperiam atque deleniti dignissimos minus, excepturi maxime non pariatur unde. Voluptas, dolorum vero hic rerum qui officiis minima a, sed ipsam autem, error magni alias? Non iste mollitia eos molestias ipsam expedita dolorem quas similique consectetur aspernatur repellat, commodi nam aperiam veniam quod accusantium.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolore alias magni ducimus tempore rerum aut natus error voluptatibus? A blanditiis magni consectetur mollitia molestias non perferendis consequatur, vel facilis vero aspernatur rerum, est eaque impedit obcaecati, voluptas harum qui quam veritatis. Soluta distinctio hic explicabo, consectetur esse ad repudiandae delectus enim assumenda vel optio provident aperiam atque deleniti dignissimos minus, excepturi maxime non pariatur unde. Voluptas, dolorum vero hic rerum qui officiis minima a, sed ipsam autem, error magni alias? Non iste mollitia eos molestias ipsam expedita dolorem quas similique consectetur aspernatur repellat, commodi nam aperiam veniam quod accusantium.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolore alias magni ducimus tempore rerum aut natus error voluptatibus? A blanditiis magni consectetur mollitia molestias non perferendis consequatur, vel facilis vero aspernatur rerum, est eaque impedit obcaecati, voluptas harum qui quam veritatis. Soluta distinctio hic explicabo, consectetur esse ad repudiandae delectus enim assumenda vel optio provident aperiam atque deleniti dignissimos minus, excepturi maxime non pariatur unde. Voluptas, dolorum vero hic rerum qui officiis minima a, sed ipsam autem, error magni alias? Non iste mollitia eos molestias ipsam expedita dolorem quas similique consectetur aspernatur repellat, commodi nam aperiam veniam quod accusantium.</p>
    </div>
  );
};

export default Post;
