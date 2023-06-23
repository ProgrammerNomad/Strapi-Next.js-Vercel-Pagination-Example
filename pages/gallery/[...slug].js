const Gallery = ({ CurrentPage }) => {

    return (
        <>
        <h3>Galley Pages</h3>
        <p>Current page is: {CurrentPage}</p>
        </>
    )}
export async function getStaticPaths() {
 
    return {
        paths: [
            //{ params: {} },
            { params: { slug: ['a'] } },
            { params: { slug: ['d', 'b'] } },
            { params: { slug: ['b', 'b'] } },
            { params: { slug: ['c', 'b'] } }
        ],
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const slug = params.slug;

    return {
        props: { CurrentPage: slug },
        revalidate: 1,
    }
}

export default Gallery