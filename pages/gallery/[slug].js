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
            { params: { slug: "a" } },
            { params: { slug: "b" } },
            { params: { slug: "c" } }
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