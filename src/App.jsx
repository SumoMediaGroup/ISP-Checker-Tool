import { useState, useEffect } from 'react'
import { MapPin, Share2, Shield, AlertTriangle } from 'lucide-react'

export default function App() {
  const [ispInfo, setIspInfo] = useState({
    isp: '',
    ipv4: '',
    ipv6: '',
    city: '',
    region: '',
    country: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const ipv4Response = await fetch('https://api.ipify.org?format=json')
        const ipv4Data = await ipv4Response.json()

        let ipv6Data = { ip: 'Not available' }
        try {
          const ipv6Response = await fetch('https://api64.ipify.org?format=json')
          ipv6Data = await ipv6Response.json()
        } catch (ipv6Error) {
          console.error('Error fetching IPv6:', ipv6Error)
        }

        const geoResponse = await fetch(`https://ipapi.co/${ipv4Data.ip}/json/`)
        const geoData = await geoResponse.json()

        if (geoData.error) {
          throw new Error(geoData.reason || 'Error fetching location data')
        }

        setIspInfo({
          isp: geoData.org || 'Unknown',
          ipv4: ipv4Data.ip,
          ipv6: ipv6Data.ip,
          city: geoData.city || 'Unknown',
          region: geoData.region || 'Unknown',
          country: geoData.country_name || 'Unknown'
        })
      } catch (error) {
        console.error('Error fetching IP information:', error)
        setError('Unable to fetch IP information. Please try again later.')
      }
    }

    fetchIpInfo()
  }, [])

  const shareDetails = () => {
    const shareText = `My ISP: ${ispInfo.isp}\nIPv4: ${ispInfo.ipv4}\nIPv6: ${ispInfo.ipv6}\nLocation: ${ispInfo.city}, ${ispInfo.region}, ${ispInfo.country}`
    if (navigator.share) {
      navigator.share({
        title: 'My ISP Details',
        text: shareText,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Details copied to clipboard!')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#0066cc] hover:bg-[#004c99] text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-black">ISP Checker</h1>
        
        <div className="mb-8 border-t-4 border-[#0066cc] bg-white rounded-lg shadow-lg">
          <div className="bg-gradient-to-r from-[#e6f3fa] to-white p-6">
            <h2 className="text-2xl font-bold text-black">Your ISP Information</h2>
            <p className="text-gray-700">Here's what we know about your internet connection</p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">Your ISP is</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#e6f3fa] rounded-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#0066cc" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-8 h-8"
                    >
                      <path d="M6.343 15.657a8 8 0 1 0 0-11.314" />
                      <path d="M8.464 13.536a5 5 0 1 0 0-7.072" />
                      <path d="M13.415 12.414a2 2 0 1 0-2.83-2.828" />
                      <line x1="12" y1="20" x2="12" y2="22" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-black">{ispInfo.isp}</p>
                </div>
                <div className="mt-4">
                  <p className="text-black">
                    <strong>IPv4:</strong> {ispInfo.ipv4}
                  </p>
                  <p className="text-black">
                    <strong>IPv6:</strong> {ispInfo.ipv6}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center bg-[#e6f3fa] rounded-lg p-4">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-[#0066cc]" size={24} />
                  <h3 className="font-semibold text-black">Your location</h3>
                  <p className="text-black">
                    {ispInfo.city}, {ispInfo.region}
                  </p>
                  <p className="text-black">{ispInfo.country}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={shareDetails}
                className="bg-[#0066cc] hover:bg-[#004c99] text-white px-4 py-2 rounded inline-flex items-center"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share these details
              </button>
              <a
                href="https://comparebroadbandpackages.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0066cc] hover:bg-[#004c99] text-white px-4 py-2 rounded inline-flex items-center"
              >
                Change Broadband Providers
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#e6f3fa] to-white p-6">
              <h2 className="text-xl font-bold text-black">
                What do these details mean?
              </h2>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-5 space-y-2 text-black">
                <li>
                  <strong>ISP (Internet Service Provider):</strong> The company
                  providing your internet connection.
                </li>
                <li>
                  <strong>IPv4 Address:</strong> The 32-bit version of your IP
                  address.
                </li>
                <li>
                  <strong>IPv6 Address:</strong> The 128-bit version of your IP
                  address, designed to replace IPv4.
                </li>
                <li>
                  <strong>Location:</strong> The approximate geographical location
                  associated with your IP address.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#e6f3fa] to-white p-6">
              <h2 className="text-xl font-bold text-black">
                Is my connection safe?
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-[#e6f3fa] border-l-4 border-[#0066cc] p-4">
                <div className="flex">
                  <Shield className="h-5 w-5 text-[#0066cc]" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-black">
                      Your connection might not be secure
                    </p>
                    <p className="text-sm text-gray-700">
                      Using a VPN can help protect your online privacy and
                      security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-black">
                  Recommended VPN Provider
                </h3>
                <div className="bg-[#e6f3fa] p-4 rounded-lg">
                  <p className="font-bold text-black">ExpressVPN</p>
                  <p className="text-sm mt-1 text-gray-700">
                    High-speed, secure, and easy to use.
                  </p>
                  <button className="mt-2 bg-[#0066cc] hover:bg-[#004c99] text-white px-4 py-2 rounded">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-black">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Understanding Your ISP and IP Addresses
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-black">
            Why might you need to know your ISP?
          </h3>
          <p>
            Knowing your Internet Service Provider (ISP) can be crucial for various
            reasons. It helps in troubleshooting connection issues, understanding
            your internet speed and service quality, and can be necessary when
            setting up certain online services or applications.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-black">
            How does this ISP checker tool work?
          </h3>
          <p>
            Our ISP checker tool uses your IP addresses (both IPv4 and IPv6) to
            determine your Internet Service Provider and approximate location. When
            you visit this page, we perform a lookup to gather information about
            your internet connection.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-black">
            Privacy and security considerations
          </h3>
          <p>
            While knowing your IP address can be useful, it's important to remember
            that this information can be sensitive. Your IP addresses can reveal
            your approximate location and internet provider. Always be cautious
            about sharing this information and consider using a VPN if you want to
            protect your online privacy.
          </p>
        </div>
      </main>
    </div>
  )
}
