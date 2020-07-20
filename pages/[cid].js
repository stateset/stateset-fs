import Link from 'next/link';
import Error from 'next/error';
import { useRouter } from 'next/router';

const CID = /^[0-9]+$/;

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { cid } = params;

  if (cid.length < 10  || !CID.test(cid)) {
    return { props: {} };
  }

  try {
    const ast = await fetchCidAst(cid);
    return { props: ast ? { ast } : {} };
  } catch (error) {
    // where is IPFS?
    console.error(error);
    return { props: {} };
  }
}

export default function Cid({ date, ast }) {
  const { isFallback } = useRouter();

  if (!isFallback && !ast) {
    return <Error statusCode={404} title="This CID could not be found" />;
  }

  return (
    <div className={`page-wrapper ${styles.theme}`}>

      <main>

        <footer>
          <p>
            {isFallback
              ? '🤯 This file is statically generating.'
              : '🤯 This file was statically generated.'}{' '}
            <Link href="/" passHref>
              <A blank={false}>See how</A>
            </Link>
          </p>
        </footer>
      </main>

      <style jsx>{`
        .page-wrapper {
          color: var(--tweet-font-color);
          background: var(--bg-color);
          height: 100vh;
          overflow: scroll;
          padding: 2rem 1rem;
        }
        main {
          width: 500px;
          max-width: 100%;
          margin: 0 auto;
        }
        footer {
          font-size: 0.875rem;
          text-align: center;
          margin-top: -0.5rem;
        }
      `}</style>
    </div>
  );
}
