import Head from 'next/head'
import Link from 'next/link'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import Layout, { siteTitle } from '../components/layout'
import Header from '../components/Header'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData);
  return {
    props: {
      allPostsData
    }
  }
}

const Home = ({ allPostsData }) => {
  console.log('allPostsData', allPostsData);
  const AuthUser = useAuthUser()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <Link href="/posts/first-post">our Next.js tutorial</Link>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home)