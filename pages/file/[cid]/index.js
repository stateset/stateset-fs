import { useRouter } from 'next/router'
import { CID } from 'ipfs-http-client'

const File = () => {
  const router = useRouter()
  const { cid } = router.query

  return (
    <>

    
      <style jsx>{`

`}</style>
    </>
  )
}

export default File