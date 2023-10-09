import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='bottom-0'>
    <footer className='mt-auto  bottom-0'> 
      <div>
      <Link href="/">
        <div className=" flex items-center cursor-pointer  text-red-400">
          <Image
            src="/logo.png"
            height={50}
            width={100}
            alt="Blog Logo image"
          />
          
        </div>
      </Link>
      </div>
    </footer>
    </div>
  )
}

export default Footer