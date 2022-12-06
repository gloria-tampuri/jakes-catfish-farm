import Head from "next/head"


export default function Home() {
  return (
    <div className='dark'>
  <Head>
        
  </Head>
  </div>
  )
}

export async function getServerSideProps(context) {
  
  return {
   redirect: {
    permanent:false,
    destination:'/batch'
  }, // will be passed to the page component as props
  props:{},
  }
}
