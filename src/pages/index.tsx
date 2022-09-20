import type { NextPage } from "next";
import { IPost } from "../../data"
import Head from 'next/head'
import Link from 'next/link'



type props = {
  posts: IPost[]
}


export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/posts/`)
  const posts = await res.json()
  return {
    props: { posts },
  }
}



const PostsPage = (props: props) => {
  async function revalidate() {
    const body = JSON.stringify({ path: '/' })
    await fetch(`http://localhost:3000/api/revalidate`, {
      method: 'POST',
      body,
    })
  }
  return (<>
    <Head>
      <title>Posts Bro</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>


    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
        Posts
      </h1>
      <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3 ">
        <button onClick={revalidate} className="absolute top-10 right-10  bg-gray-500 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Revalidate</button>
        {props.posts.map((post) => {
          return (<div key={post.id}>
            <Card name={post.title} slug={'/posts/[id]'} url={`/posts/${post.id}`} />
          </div>)
        })}
      </div>
    </main>
  </>
  )

}
export default PostsPage



type CardProps = {
  name: string;
  slug: string;
  url: string;
};

const Card = ({
  name,
  slug,
  url,
}: CardProps) => {
  return (
    <Link href={slug} as={url}>
      <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 min-w-full min-h-full">
        <h2 className="text-lg text-gray-700 capitalize">{name}</h2>
      </section>
    </Link>
  );
};
