import { IComment, IPost } from "../../../data"
import Head from 'next/head'

type StaticProps = {
    params: { id: string }
}

type props = {
    post: IPost,
    comments: IComment[],
    date: string
}


export async function getStaticProps({ params }: StaticProps) {
    const res = await fetch(`http://localhost:3000/api/posts/${params?.id}`)
    const post = await res.json()
    const commentres = await fetch(`http://localhost:3000/api/posts/comments/${params?.id}`)
    const comments = await commentres.json()
    const date = new Date().toLocaleString()
    return {
        props: { post, comments, date }, revalidate: 100,
    }
}

export async function getStaticPaths() {
    const results = await fetch('http://localhost:3000/api/posts')
    const posts: IPost[] = await results.json()
    const paths = posts.map(post => ({
        params: {
            id: post.id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }
}


const PostPage = (props: props) => {


    async function revalidate() {
        const body = JSON.stringify({ path: `/posts/${props.post.id}` })
        await fetch(`http://localhost:3000/api/revalidate`, {
            method: 'POST',
            body,
        })
    }
    return (<>
        <Head>
            <title>{props.post.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main >
            <div className="text-base m-10 " ><h1 className="text-5xl md:text-[5rem] w-2/3 place-self-center leading-normal font-extrabold text-gray-700">
                {props.post.title}  </h1>
                <button onClick={revalidate} className="absolute top-20 right-10  bg-gray-500 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Revalidate</button>
            </div>
            <div className="text-base m-10">viewed at {props.date}</div>

            <p className="text-sm m-10">{props.post.body.repeat(30).substring(0, 1000)} </p>
            <section className="m-10 ">
                <div className="text-base md:text-[1rem] my-10 leading-normal font-bold ">Comments</div>
                {props.comments.map((comment) => {
                    return (<div className="text-base md:text-[1rem] my-10 leading-normal" key={comment.id}>{comment.body}<br /> <span className="font-bold ">{comment.email}</span></div>)
                })}</section>
        </main>
    </>
    )

}
export default PostPage