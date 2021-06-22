import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
// import SanityBlockRenderer from "../components/sanityBlockRenderer";

const Profile = () => {
  return (
    <Layout
      header={<HeaderContent />}
      body={<BodyContent />}
      sidebar={<SidebarContent />}
    >
      <BodyContent />
    </Layout>
  )
}

const HeaderContent = () => {
  return (
    <div>
      <h1 className="text-5xl text-white">Name</h1>
    </div>
  )
}

const SidebarContent = () => {
  return (
    <div className="flex flex-col lg:p-8 text-4xl">
      <ul>
        {[1, 2, 3].map(link => (
          <li className="mb-10">
            <Link to="/">Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const BodyContent = () => {
  return (
    <div className="px-8 py-8 lg:p-16">
      <h2 className="mb-2">Name</h2>
      <h2>Country</h2>
      <div className="font-slab mt-16">
        <span>Bio:</span>
        <p className="mt-8">
          One advanced diverted domestic sex repeated bringing you old. Possible
          procured her trifling laughter thoughts property she met way.
          Companions shy had solicitude favourable own. Which could saw guest
          man now heard but. Lasted my coming uneasy marked so should. Gravity
          letters it amongst herself dearest an windows by. Wooded ladies she
          basket season age her uneasy saw. Discourse unwilling am no described
          dejection incommode no listening of. Before nature his parish boy.
        </p>
      </div>
    </div>
  )
}

export default Profile
