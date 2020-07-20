import { CID } from 'ipfs-http-client'
import useIpfs from '../components/hooks/use-ipfs'

export async function getStaticProps() {
    const CID = await useIpfs();
  
    return { props: { CID } };
  }

export default function Index({ CID }) {
    return (

        <>
        <h1>stateset-fs demo</h1>
        <h2>distributed hash table lookup for content addressed documents that are then shown as static generated html.</h2>
        </>
    );
}