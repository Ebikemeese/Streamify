import { FaEnvelope } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className='bg-base-100 left-0 bottom-0 w-full flex justify-between mx-auto px-6 pb-6 border-gray-300 border-t border-b'>
        <div className="mt-6 max-md:justify-center text-base-800">Developed by Ebikeme Ese</div>
        
        
        <div className='flex items-center gap-6 mt-6 max-md:justify-center'>
            <a href="mailto:ebikemeese@gmail.com?subject=Streamify" target='_blank'>
                <FaEnvelope className="text-base-800"/>
            </a>

            <a href="https://wa.me/2348123208257" target="_blank" className="">
                <FaWhatsapp className='text-base-800'/>
            </a>
        </div>
    </footer>
  )
}

export default Footer