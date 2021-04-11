import React from 'react'
import Layout from '../components/layout'

const Index = () => {
    return (
        <Layout
            header={<HeaderContent />}
            sidebar={<SidebarContent />}
            body={<BodyContent />}
        />
    )
}

const HeaderContent = () => {
    return (
        <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">State Of Matter</h1>
        </>
    )
}

const SidebarContent = () => {
    return (
        <div className="text-2xl flex flex-col">
            <a href="#about-us" className="py-3 hover:text-custom-red">About Us</a>
            <a href="#guidelines" className="py-3 hover:text-custom-red">Submission Guidelines</a>
        </div>
    )
}

const BodyContent = () => {
    return (
        <div className="border-t border-gray-300 px-10 lg:p-10 text-lg">
            <div id="about-us" class="flex flex-col pt-10">
                <h2 class="text-3xl font-bold">About Us</h2>
                <p class="mt-5">
                    State of Matter was formed with the idea to uplift and
                    promote, primarily, the wide diversity of Indian and
                    South-East Asian voices. We believe that speculative fiction
                    holds the power to develop the future or analyze the past in
                    the most creative ways possible. So if your story/poetry
                    contains elements that are imaginative or unreal for the
                    current world, or presents an entirely different view of it,
                    share it with us.
                </p>
            </div>

            <div class="pt-10" id="guidelines">
                <h2 class="text-3xl font-bold mb-5">Submission Guidelines</h2>
                <h3 class="text-2xl mb-2">General Guidelines</h3>
                <ul class="list-disc list-inside">
                    <li>All submissions must be made through our <a href="https://airtable.com/shrD3nwn5f844l16j">Submission Form</a></li>
                    <li>We allow simultaneous submissions; No multiple submissions or re-submissions.</li>
                    <li>We are looking for <a href="http://neil-clarke.com/first-rights/">First World</a> publishing rights, so please do not send us works already published on the web or elsewhere.</li>
                </ul>
                <h3 class="text-2xl mt-5 mb-2">Submission Genre</h3>
                <p>
                    We are looking for Speculative Fiction stories and poetry, which is a broadly defined category and includes Science Fiction, Fantasy, Horror, Obscure and other slipstream genres.
                    While sexual themes are not frowned upon, kindly refrain from sending us hard erotica or gore.
                    Apart from book reviews or interviews, we are quite liberal in the form of non-fiction entries we receive.
                </p>
                <h3 class="text-2xl mt-5 mb-2">Submission Length</h3>
                <ul class="list-inside list-disc">
                    <li>Fiction / Non-Fiction : up to 10000 words
                        <ul class="list-disc list-inside ml-8">
                            <li>Times New Roman, 12 pt</li>
                            <li>Double spaced</li>
                        </ul>
                    </li>
                    <li>
                        Poetry: up to 3 pages
                        <ul class="list-disc list-inside ml-8">
                            <li>Times New Roman, 12 pt</li>
                            <li>Single spaced</li>
                        </ul>
                    </li>
                </ul>
                <h3 class="text-2xl mt-5">Response Time</h3>
                <p class="mt-5">We usually respond within 4 weeks. Please follow up with us at editor@stateofmatter.in in case you haven’t heard back from us.</p>
                <p class="mt-2">In case of withdrawals, please send us an email to the above address stating the reason.</p>
            </div>
        </div>
    )
}

const Post = () => {
    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between px-10 xl:px-16 py-5 border-b border-gray-400">
            <div className="flex flex-col">
                <h2 className="text-4xl">A Spaceship named Becky</h2>
                <div className="flex items-center py-1 font-sub">
                    <span className="border-gray-700 border-r pr-3">
                        Fiction
                    </span>
                    <span className="px-3">Suchitra Sukumar</span>
                    <span className="border-gray-700 border-l pl-3">India</span>
                </div>
            </div>
            <div className="flex flex-col xl:pl-20">
                <div className="flex items-center py-1 font-sub">
                    <span className="border-gray-700 border-r pr-3">
                        Science Fiction
                    </span>
                    <span className="px-3">Adventure</span>
                    <span className="border-gray-700 border-l pl-3">
                        Aliens
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Index
