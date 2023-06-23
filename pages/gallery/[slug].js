import React from "react";
import { fetchAPI } from "../../lib/api"
import { useRouter } from 'next/router'


const PerPage = 9;

const Gallery = ({ galleries, CurrentPage }) => {

    const ServerTotalPage = galleries.meta.pagination.total;

    let pages = 0;

    if (ServerTotalPage <= PerPage)
    {
        pages = 1; 

    }else if(ServerTotalPage % PerPage === 0){

        pages = ServerTotalPage/PerPage;

    }else{
        pages = (ServerTotalPage/PerPage) + 1;

    }

    pages = Math.trunc(pages); // Removing decimal points

    const PaginationData = index => {
        let content = [];

        if(pages > 1)
        {

            if(CurrentPage !== 1)
            {
                content.push(<li><Link href={`/about/gallery/${CurrentPage-1}/`}><a><i className="flaticon-left-arrow"></i></a></Link></li>)
            }

        for (let i = 1; i <= pages; i++) {

            if(CurrentPage === i)
            {
                content.push(<li><Link href={`/about/gallery/${i}/`}><a className="active">{i}</a></Link></li>);
            }else{
                content.push(<li><Link href={`/about/gallery/${i}/`}><a>{i}</a></Link></li>);
            }

        }
        if(CurrentPage < pages)
        {
            content.push(<li><Link href={`/about/gallery/${CurrentPage+1}/`}><a><i className="flaticon-right-arrow"></i></a></Link></li>)
        }
        }else{
            // Do nothing
        }

        return content;
    };

    return (
        <>
        <h3>Galley Pages</h3>
        </>
    )}
export async function getStaticPaths() {

    const ServerGallery = await fetchAPI("/galleries");

    const ServerTotalPage = ServerGallery.meta.pagination.total;

    let pages = 0;

    if (ServerTotalPage <= PerPage)
    {
        pages = 1;

    }else if(ServerTotalPage % PerPage === 0){

        pages = ServerTotalPage/PerPage;

    }else{
        pages = (ServerTotalPage/PerPage) + 1;

    }

    pages = Math.trunc(pages); // Removing decimal points

    const Pages = [];

    for (let i = 0; i < pages; i++) {

        Pages.push({id:i+1});

    }

    return {
        paths: [
            //{ params: {} },
            { params: { slug: "1" } },
            { params: { slug: "2" } },
            { params: { slug: "3" } }
        ],
        fallback: false
    }

}

export async function getStaticProps({ params }) {

    const slug = parseInt(params.slug);

    let StartPage = (slug-1)*PerPage;


    const galleriesRes = await fetchAPI("/galleries", {
        pagination: {
            start: StartPage,
            limit: PerPage,
            withCount: true
        },
        sort: ['id:desc'],
        populate: "*",
    })

    return {
        props: { galleries: galleriesRes, CurrentPage: slug },
        revalidate: 1,
    }
}

export default Gallery